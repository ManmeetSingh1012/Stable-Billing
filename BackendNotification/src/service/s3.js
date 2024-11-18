import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3client = new S3Client({
  region: "ap-south-1",
  credentials: {},
});

const putobject = async (Key, ContentType) => {
  const command = new PutObjectCommand({
    Bucket: "tempbucketawss3",
    Key: Key,
    ContentType: ContentType,
  });

  return await getSignedUrl(s3client, command, { expiresIn: 3600 });
};

const getobject = async (Key) => {
  const command = new GetObjectCommand({
    Bucket: "tempbucketawss3",
    Key: Key,
    ResponseContentDisposition: "inline", // Ensure inline viewing
    ResponseContentType: "application/pdf", // Inform browser it's a PDF
  });

  return await getSignedUrl(s3client, command, { expiresIn: 3600 });
};

const puturl = async (key) => {
  return await putobject(key, "application/pdf");
};

const geturl = async (key) => {
  return await getobject(key);
};

export { puturl, geturl };
