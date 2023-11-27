// import type { SubscribePayload } from "graphql-ws";
// import { createClient } from "graphql-ws";
// import { getSession } from "next-auth/react";
// import { Observable } from "rxjs";
// import { w3cwebsocket } from "websocket";

// const URL = "wss://dewan-prod.hasura.app/v1/graphql";

// const client = createClient({
//   url: URL,
//   webSocketImpl: w3cwebsocket,
//   connectionParams: async () => {
//     // get session token from next auth
//     const session = await getSession();
//     return {
//       headers: {
//         Authorization: `Bearer ${session.token as string}`,
//       },
//     };
//   },
// });

// export function fromWsClientSubscription<TData = Record<string, unknown>>(payload: SubscribePayload) {
//   return new Observable<TData>((observer) =>
//     client.subscribe(payload, {
//       next: (data) => observer.next(data.data.payload as TData),
//       error: (err) => observer.error(err),
//       complete: () => observer.complete(),
//     })
//   );
// }

// zod's subscription implemented from here

import { TypedDocumentNode, VariablesOf } from "@graphql-typed-document-node/core";
import { useQueryClient } from "@tanstack/react-query";
import { getZodSchemaForDocument } from "@utils/axiosInterceptors";
import { print } from "graphql";
import { Client, createClient } from "graphql-ws";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function defaultOnError(error: unknown) {
  console.error("An error occurred in GraphQL subscription", error);
}

const URL = process.env.NEXT_PUBLIC_HASURA_URL?.replace("https:", "wss:");

let client: Client | undefined;

export function useCustomSubscription<Document extends TypedDocumentNode<any, Record<string, never>>>(args: {
  // client: Client;
  query: Document;
  queryToInvalidate: (string | unknown[])[] | null;
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): any;

export function useCustomSubscription<Document extends TypedDocumentNode<any, any>>(args: {
  // client: Client;
  query: Document;
  variables: VariablesOf<Document>;
  queryToInvalidate: (string | unknown[])[] | null;
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): any;

export function useCustomSubscription<Document extends TypedDocumentNode<any, any>>({
  // client,
  query,
  variables,
  queryToInvalidate,
  onComplete,
  onError = defaultOnError,
}: {
  // client: Client;
  query: Document;
  variables?: VariablesOf<Document>;
  queryToInvalidate: (string | unknown[])[] | null;
  onComplete?: () => void;
  onError?: (error: unknown) => void;
}): any {
  const [queryValue, setQueryValue] = useState<unknown>();
  const queryClient = useQueryClient();

  // console.log("outside URL ", URL);
  // console.log("typeof window !== undefined && client === undefined && URL", typeof window !== "undefined" && client === undefined);

  if (typeof window !== "undefined" && client === undefined && !!URL) {
    // console.log("URL", URL);
    client = createClient({
      url: URL,
      // webSocketImpl: w3cwebsocket,
      connectionParams: async () => {
        // get session token from next auth
        const session = await getSession();
        // console.log("session", session);
        return {
          headers: {
            Authorization: `Bearer ${session.token as string}`,
          },
        };
      },
    });
  }

  useEffect(() => {
    const zodSchema = getZodSchemaForDocument(query);

    const unsubscribe =
      client &&
      client.subscribe(
        {
          query: print(query),
          variables,
        },
        {
          next(value) {
            // Ensure gotten data are correct, or throw.
            zodSchema.parse(value.data);

            setQueryValue(value.data.payload);

            // queryClient.invalidateQueries(queryToInvalidate);
            queryToInvalidate !== null && queryToInvalidate.forEach((item) => queryClient.invalidateQueries(item));
          },
          complete() {
            onComplete?.();
          },
          error(error) {
            console.error(error);

            onError(error);
          },
        }
      );

    return () => {
      client && unsubscribe();
      // unsubscribe();
    };
  }, [client, onComplete, onError, query, queryClient, queryToInvalidate, variables /*, URL*/]);

  return queryValue;
}
