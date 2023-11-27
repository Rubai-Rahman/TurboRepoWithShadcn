import { account_agents } from "@api-lib/gql/graphql";
import { GET_TOKENS_BY_USER_ID, GET_USER_BY_EMAIL, UPDATE_USER_TOKEN } from "@api-lib/graphql";
import { HasuraAdminApi, unsetHeadersAttachedToAxiosDefaults } from "@utils/axiosInterceptors";
import { removeKeysFromObj } from "@utils/removeKeysFromObj";
import axios from "axios";
import { AES, enc } from "crypto-js";
import jwt from "jsonwebtoken";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const secret = process.env.NEXTAUTH_SECRET;

interface UserData {
  id: number;
  name: string;
  display_name: string | null;
  email: string;
  phone_number: string;
  avatar_url: string | null;
  availability: number;
  role: string;
  tokens: object;
  last_active_at: string | null;
  joined_as_agent_at: string;
  user_created_at: string;
  account_id: number;
}

const errorPath = "/auth/error";

export const authOptions = (req: NextApiRequest): NextAuthOptions => {
  return {
    secret: secret,
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: { params: { access_type: "offline", prompt: "consent" } },
      }),
      Credentials({
        credentials: undefined,
        async authorize(credentials) {
          try {
            let userValid = false;

            // Get user data based on the credentials
            const userData = await HasuraAdminApi(GET_USER_BY_EMAIL(credentials.email, +req.query?.organization_id));
            // Throw error if no data is found
            if (userData.length <= 0) {
              throw new Error("No user exists for this email");
            }
            if (userData.length > 0) {
              // Decrypt
              const decryptedPassword = AES.decrypt(userData[0].password, secret).toString(enc.Utf8);
              if (decryptedPassword === credentials.password) {
                userValid = true;
              }
            }
            if (userValid) {
              const filtered_user = removeKeysFromObj(userData[0], ["password"]);
              const user = { userData: filtered_user };
              return user;
            }
            throw new Error("Invalid Credentials");
          } catch (e) {
            // Redirecting to the login page with error message in the URL
            throw new Error(e.message as string);
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ account, profile, user }) {
        // Check if the account provider is Google
        if (account.provider === "google") {
          try {
            // Fetch user data from the database for the authorized Gmail
            const userData = await HasuraAdminApi(GET_USER_BY_EMAIL(profile.email, +req.query?.organization_id));

            // Return true if user is found in the database
            if (userData.length > 0) {
              const { id } = userData[0];
              const googleTokens = {
                google: {
                  access_token: account.access_token,
                  expires_at: Math.floor(Date.now() / 1000 + account.expires_at),
                  refresh_token: account.refresh_token,
                  id_token: account.id_token,
                },
              };
              // Update user tokens in the database
              await HasuraAdminApi(UPDATE_USER_TOKEN(id, googleTokens));
              // Set additional user data fetched from the database
              user.userData = userData[0];
              return true;
            }
            // Return error message if user is not found in the database
            return `${errorPath}?error=user_not_found`;
          } catch (error) {
            // Return error message if an error occurs
            return `${errorPath}?error=${error}`;
          }
        } else if (account.provider === "credentials") {
          return true;
        } else {
          // Return error message if the account provider is not used
          return `${errorPath}?error=invalid_provider`;
        }
      },
      async jwt({ token, user }) {
        // Check whether this is a sign in flow or not
        const isSignIn = user ? true : false;
        if (isSignIn) {
          const { id, role, account_id } = user.userData as UserData;
          // Pass user information to the session from JWT token
          token.id = id;
          token.role = role;
          token.account_id = account_id;
          token.user = user.userData;

          // Generate a Hasura token with user claims
          const jwtClaims = {
            "https://hasura.io/jwt/claims": {
              "x-hasura-allowed-roles": ["administrator", "supervisor", "agent", "public"],
              "x-hasura-default-role": token.role,
              "x-hasura-role": token.role,
              "x-hasura-user-id": String(token.id),
              "x-hasura-account-id": String(token.account_id),
            },
          };
          // Encode the token with the secret and HS256 algorithm
          const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
          token.token = encodedToken;
        }
        // Return a Promise that resolves to the encoded token with Hasura claims
        return Promise.resolve(token);
      },
      async session({ session, token }) {
        try {
          // Retrieve user tokens from the database
          const getUserTokens = await HasuraAdminApi(GET_TOKENS_BY_USER_ID(token.id));
          // Handle database query errors
          if (getUserTokens.errors) throw { type: "DbQUeryError", message: "Couldn't get token from DB", details: getUserTokens.errors };

          const { google } = getUserTokens;
          // Get the expiration times of the access and JWT tokens
          const decodedToken = jwt.decode(google?.id_token, { complete: true }) as { payload: { exp: number } };
          const accessTokenExpirationTime = moment.unix(google?.expires_at);
          const jwtExpirationTime = moment.unix(decodedToken.payload.exp);
          const currentTime = moment();

          // Check if tokens are expired and refresh them if necessary
          if (accessTokenExpirationTime.isBefore(currentTime) || jwtExpirationTime.isBefore(currentTime)) {
            const tokens = await axios({
              method: "POST",
              url: "https://oauth2.googleapis.com/token",
              params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: google?.refresh_token,
              },
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
              .then((res) => res.data)
              .catch((err) => {
                throw err;
              });

            const googleTokens = {
              google: {
                access_token: tokens.access_token,
                expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                refresh_token: tokens.refresh_token ?? google.refresh_token,
                id_token: tokens.id_token,
              },
            };
            // Update the new tokens in the database
            await HasuraAdminApi(UPDATE_USER_TOKEN(token.id, googleTokens));
          }
          // Update session data with user information
          session.id = token.id;
          session.token = token.token;
          session.role = token.role;
          session.user = token.user as account_agents;
        } catch (error) {
          // Handle errors and update session with error message
          session.error = "TokenError";
        }

        // Return the updated session object
        return Promise.resolve(session);
      },
    },
    pages: {
      signIn: "/auth/login",
      error: errorPath,
      signOut: "/auth/login",
    },
    events: {
      async signOut() {
        unsetHeadersAttachedToAxiosDefaults();
      },
    },
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions(req));
