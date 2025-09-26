import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_PLANS_TABLE || "TravelPlans";

async function createTable() {
  try {
    // Check if table already exists
    try {
      await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
      console.log(`Table ${TABLE_NAME} already exists`);
      return;
    } catch (error: any) {
      if (error.name !== "ResourceNotFoundException") {
        throw error;
      }
    }

    // Create table
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: "planId", KeyType: "HASH" }, // Partition key
        { AttributeName: "agencyId", KeyType: "RANGE" }, // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "planId", AttributeType: "S" },
        { AttributeName: "agencyId", AttributeType: "S" },
      ],
      BillingMode: "PAY_PER_REQUEST", // On-demand billing
    });

    await client.send(command);
    console.log(`Table ${TABLE_NAME} created successfully`);

    // Wait for table to be active
    let tableActive = false;
    while (!tableActive) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const describeCommand = new DescribeTableCommand({ TableName: TABLE_NAME });
      const response = await client.send(describeCommand);
      tableActive = response.Table?.TableStatus === "ACTIVE";
    }
    console.log(`Table ${TABLE_NAME} is now active`);
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

async function seedData() {
  try {
    const samplePlans = [
      {
        planId: randomUUID(),
        agencyId: "default-agency",
        name: "Golden Triangle Tour",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500",
        route: ["Delhi", "Agra", "Jaipur", "Delhi"],
        description: "Experience India's most iconic destinations - Delhi's historic monuments, Agra's Taj Mahal, and Jaipur's royal palaces",
        price: 45000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
      {
        planId: randomUUID(),
        agencyId: "default-agency",
        name: "Kerala Backwaters Journey",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
        route: ["Kochi", "Munnar", "Thekkady", "Alleppey", "Kochi"],
        description: "Cruise through Kerala's serene backwaters, explore tea plantations, and enjoy houseboat stays",
        price: 38000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
      {
        planId: randomUUID(),
        agencyId: "default-agency",
        name: "Himalayan Adventure",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500",
        route: ["Manali", "Rohtang Pass", "Leh", "Nubra Valley", "Pangong Lake"],
        description: "Trek through breathtaking mountain landscapes and experience the beauty of Ladakh",
        price: 65000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      },
    ];

    for (const plan of samplePlans) {
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: plan,
      });
      await docClient.send(command);
      console.log(`Added plan: ${plan.name}`);
    }

    console.log("Sample data added successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}

async function main() {
  try {
    console.log("Initializing DynamoDB table...");
    await createTable();
    console.log("Adding sample data...");
    await seedData();
    console.log("DynamoDB initialization complete!");
  } catch (error) {
    console.error("Failed to initialize DynamoDB:", error);
    process.exit(1);
  }
}

main();
