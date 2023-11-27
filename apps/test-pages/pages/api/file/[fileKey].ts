import { S3 } from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  // env variables
  const { S3_REGION, S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_ACCESS_KEY_SECRET, S3_BUCKET_NAME } = process.env;

  const s3 = new S3({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_ACCESS_KEY_SECRET,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  });

  const redirectUrl = s3.getSignedUrl("getObject", {
    Bucket: S3_BUCKET_NAME,
    Key: query.fileKey as string,
  });

  res.redirect(redirectUrl);
}

// AWS s3
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { query } = req;
//   // env variables
//   const { APP_AWS_ACCESS_KEY_ID, APP_AWS_SECRET_ACCESS_KEY, APP_AWS_BUCKET_NAME, APP_AWS_DEFAULT_REGION } = process.env;

//   const host = `${APP_AWS_BUCKET_NAME}.s3.${APP_AWS_DEFAULT_REGION}.amazonaws.com`;
//   // aws4 will sign an options object as you'd pass to http.request, with an AWS service and region
//   const options: Request = {
//     host: host,
//     path: query.fileKey as string,
//     service: "s3",
//     region: APP_AWS_DEFAULT_REGION,
//     signQuery: true,
//   };

//   // aws4.sign() will sign and modify these options, ready to pass to http.request
//   await aws4.sign(options, {
//     accessKeyId: `${APP_AWS_ACCESS_KEY_ID}`.trim(),
//     secretAccessKey: `${APP_AWS_SECRET_ACCESS_KEY}`.trim(),
//   });

//   // redirect to temporary accessed url of the file
//   const redirectUrl = `https://${host}/${options.path as string}`;

//   res.redirect(redirectUrl);
// }
