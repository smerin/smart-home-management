import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidDeviceType, isValidDeviceStatus } from "@/lib/deviceTypes";
import { validateProperties, getDefaultProperties } from "@/lib/deviceSchemas";
import { getErrorMessage } from "@/utils";

// GET /api/devices - List all devices
export async function GET() {
  try {
    console.log("GET /api/devices - Listing all devices");

    const devices = await prisma.device.findMany({
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    // Parse JSON properties for each device before sending
    const devicesWithParsedProperties = devices.map((device) => ({
      ...device,
      properties: JSON.parse(device.properties),
    }));

    console.log(`✅ Found ${devices.length} devices`);
    return NextResponse.json(devicesWithParsedProperties);
  } catch (e) {
    console.error("💥 Database error:", getErrorMessage(e));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/devices - Create new device
export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/devices - Creating new device");

    const body = await request.json();
    console.log("Request body:", body);

    const {
      name,
      type,
      location,
      properties,
      status = "OFFLINE",
      isActive = false,
    } = body;

    // Basic validation
    if (!name || !type) {
      console.log("❌ Validation failed: missing name or type");
      return NextResponse.json(
        { error: "Name and type are required fields" },
        { status: 400 }
      );
    }

    // Validate enum values
    if (!isValidDeviceType(type)) {
      console.log("❌ Validation failed: invalid device type:", type);
      return NextResponse.json(
        { error: "Invalid device type" },
        { status: 400 }
      );
    }

    if (status && !isValidDeviceStatus(status)) {
      console.log("❌ Validation failed: invalid device status:", status);
      return NextResponse.json(
        { error: "Invalid device status" },
        { status: 400 }
      );
    }

    // Merge provided properties with defaults and validate
    const defaultProperties = getDefaultProperties(type);
    const mergedProperties = { ...defaultProperties, ...properties };

    const validation = validateProperties(mergedProperties);
    if (!validation.isValid) {
      console.log(
        "❌ Validation failed: invalid properties:",
        validation.error
      );
      return NextResponse.json(
        { error: validation.error || "Invalid device properties" },
        { status: 400 }
      );
    }

    // Create the device
    const device = await prisma.device.create({
      data: {
        name,
        type,
        location,
        status,
        isActive,
        properties: JSON.stringify(mergedProperties),
      },
    });

    console.log("✅ Device created:", device.id);

    return NextResponse.json(
      {
        ...device,
        properties: JSON.parse(device.properties),
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("💥 Database error:", getErrorMessage(e));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
