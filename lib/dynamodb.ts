import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Configure the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Create a document client for easier operations
export const dynamoDb = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

// Table name for travel plans
export const PLANS_TABLE = process.env.DYNAMODB_PLANS_TABLE || "TravelPlans";

// Type definition for a Plan item in DynamoDB
export interface DynamoDBPlan {
  planId: string;
  agencyId: string;
  name: string;
  image: string;
  route: string[];
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
