const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// create S3 client
const s3client = new S3Client({
  region: "ap-south-1",
});
// you can add expiry time as well
// const url = await getSignedUrl(s3client, command, { expiresIn: 3600 });

const putobject = async (Key) => {
  const command = new PutObjectCommand({
    Bucket: "tempbucketawss3",
    Key: Key,
  });

  const url = await getSignedUrl(s3client, command);
  return url;
};

const getUrl = async (Key) => {
  console.log(Key);
  const command = new GetObjectCommand({
    Bucket: "tempbucketawss3",
    Key: Key, // key should be capital
  });
  const url = await getSignedUrl(s3client, command, { expiresIn: 300 });

  return url;
};

const getinit = async () => {
  //console.log("url", await getUrl("Screenshot (264).png")); // file name
  console.log(
    "url put wali",
    await putobject(`image-${Date.now()}.jpg`, "image/jpg")
  ); // file name
};

getinit();
