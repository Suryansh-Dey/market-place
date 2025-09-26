import { NextRequest, NextResponse } from "next/server";
import { dynamoDb, PLANS_TABLE } from "@/lib/dynamodb";
import { GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

// GET - Fetch a single plan by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const agencyId = searchParams.get("agencyId") || "default-agency";

    const command = new GetCommand({
      TableName: PLANS_TABLE,
      Key: {
        planId,
        agencyId,
      },
    });

    const response = await dynamoDb.send(command);

    if (!response.Item) {
      return NextResponse.json(
        { error: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ plan: response.Item });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      { error: "Failed to fetch plan" },
      { status: 500 }
    );
  }
}

// PUT - Update a plan
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planId = params.id;
    const body = await request.json();
    const { agencyId = "default-agency", ...updates } = body;

    // Build update expression
    const updateExpressions: string[] = ["updatedAt = :updatedAt"];
    const expressionAttributeValues: Record<string, any> = {
      ":updatedAt": new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {};

    // Add fields to update
    Object.entries(updates).forEach(([key, value]) => {
      if (key !== "planId" && key !== "agencyId" && value !== undefined) {
        const attrName = `#${key}`;
        const attrValue = `:${key}`;
        updateExpressions.push(`${attrName} = ${attrValue}`);
        expressionAttributeNames[attrName] = key;
        expressionAttributeValues[attrValue] = value;
      }
    });

    const command = new UpdateCommand({
      TableName: PLANS_TABLE,
      Key: {
        planId,
        agencyId,
      },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDb.send(command);

    return NextResponse.json({
      plan: response.Attributes,
      message: "Plan updated successfully",
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json(
      { error: "Failed to update plan" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a plan (soft delete by setting isActive to false)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const agencyId = searchParams.get("agencyId") || "default-agency";

    // Soft delete by setting isActive to false
    const command = new UpdateCommand({
      TableName: PLANS_TABLE,
      Key: {
        planId,
        agencyId,
      },
      UpdateExpression: "SET isActive = :isActive, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":isActive": false,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDb.send(command);

    return NextResponse.json({
      message: "Plan deleted successfully",
      plan: response.Attributes,
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      { error: "Failed to delete plan" },
      { status: 500 }
    );
  }
}
