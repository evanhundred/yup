import { fileURLToPath } from "url";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import { dirnameFromMetaUrl } from "libs/utils/util-fs.js";
import { promptForText, promptToContinue } from "libs/utils/util-io.js";
import { wrapText } from "libs/utils/util-string.js";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const bareBonesS3 = new S3Client({...});
// await bareBonesS3.send(new)

// prev2

// const s3Client = new S3Client({});
// export const uploadFilesToBucket = async ({ bucketName, folderPath }) => {
//   console.log(`Uploading files from ${folderPath}\n`);
//   const keys = readdirSync(folderPath);
//   const files = keys.map((key) => {
//     const filePath = `${folderPath}/${key}`;
//     const fileContent = readFileSync(filePath);
//     return {
//       Key: key,
//       Body: fileContent
//     };
//   });

//   for (let file of files) {
//     await s3Client.sent(
//       new PutObjectCommand({
//         Bucket: bucketName,
//         Body: file.Body,
//         Key: file.Key
//       })
//     );
//     console.log(`${file.Key} uploaded successfully.`);
//   }
// };

// export const uploadFilesToBucket

// prev

// import { useState } from "react";
// import AWS from "aws-sdk";

// const S3_BUCKET = "yup-dev";
// const REGION = "us-east-1";

// AWS.config.update({
//   accessKeyId: "",
//   secretAccessKey: ""
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION
// });
