import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import process from "process";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const body = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title: body.title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;

