require('dotenv').config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const dynamoClient = new DynamoDBClient({
  region: process.env.SERVICE_REGION,
  credentials: {
    accessKeyId: process.env.SERVICE_ACCESS_KEY_ID,
    secretAccessKey: process.env.SERVICE_SECRET_ACCESS_KEY,
  },
});

const dynamoDB = DynamoDBDocumentClient.from(dynamoClient);

module.exports = dynamoDB;
