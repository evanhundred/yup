import { fileURLToPath } from "url";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import { dirnameFromMetaUrl } from "libs/utils/util-fs.js";
import { promptForText, promptToContinue } from "libs/utils/util-io.js";
import { wrapText } from "libs/utils/util-string.js";

import { S3Client, PutObjectCommand } from "@aws-sdk/client/s3";

const s3Client = new S3Client({});

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
