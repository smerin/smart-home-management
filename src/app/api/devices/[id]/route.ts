import { NextRequest, NextResponse } from "next/server";
import { isValidDeviceType, isValidDeviceStatus } from "@/lib/deviceTypes";
import { validateProperties } from "@/lib/deviceSchemas";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/utils";
import { UpdateDeviceRequest } from "@/types/devices";

// GET /api/devices/[id] - Get device details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`GET /api/devices/${id} - Getting device details`);

    const device = await prisma.device.findUnique({
      where: { id },
    });

    if (!device) {
      console.log(`❌ Device not found: ${id}`);
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    console.log(`✅ Found device: ${device.name}`);
    return NextResponse.json({
      ...device,
      properties: JSON.parse(device.properties),
    });
  } catch (e) {
    console.error("💥 Database error:", getErrorMessage(e));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/devices/[id] - Update device
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`PUT /api/devices/${id} - Updating device`);

    const body = await request.json();
    console.log("Request body:", body);

    const { name, type, location, properties, status, isActive } = body;

    // Check if device exists first
    const existingDevice = await prisma.device.findUnique({
      where: { id },
    });

    if (!existingDevice) {
      console.log(`❌ Device not found: ${id}`);
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Validate enum values if provided
    if (type && !isValidDeviceType(type)) {
      console.log("❌ Validation failed: invalid device type:", type);
      return NextResponse.json(
        {
          error: "Invalid device type",
        },
        { status: 400 }
      );
    }

    if (status && !isValidDeviceStatus(status)) {
      console.log("❌ Validation failed: invalid device status:", status);
      return NextResponse.json(
        {
          error: "Invalid device status",
        },
        { status: 400 }
      );
    }

    // Build update data object
    const updateData: Omit<UpdateDeviceRequest, "properties"> & {
      properties?: string;
    } = {};

    if (name !== undefined) {
      updateData.name = name;
    }
    if (type !== undefined) {
      updateData.type = type;
    }
    if (location !== undefined) {
      updateData.location = location;
    }
    if (status !== undefined) {
      updateData.status = status;
    }
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    if (properties !== undefined) {
      // Simple validation for properties
      const validation = validateProperties(properties);
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
      updateData.properties = JSON.stringify(properties);
    }

    // Update the device
    const updatedDevice = await prisma.device.update({
      where: { id },
      data: updateData,
    });

    console.log(`✅ Device updated: ${updatedDevice.name}`);

    return NextResponse.json({
      ...updatedDevice,
      properties: JSON.parse(updatedDevice.properties),
    });
  } catch (e) {
    console.error("💥 Database error:", getErrorMessage(e));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/devices/[id] - Delete device
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`DELETE /api/devices/${id} - Deleting device`);

    // Check if device exists first
    const deletingDevice = await prisma.device.findUnique({
      where: { id },
    });

    if (!deletingDevice) {
      console.log(`❌ Device not found: ${id}`);
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Device exists, so delete it
    await prisma.device.delete({
      where: { id },
    });

    console.log(`✅ Device deleted: ${deletingDevice.name}`);

    return NextResponse.json({
      message: "Device deleted successfully",
      id: deletingDevice.id,
      name: deletingDevice.name,
    });
  } catch (e) {
    console.error("💥 Database error:", getErrorMessage(e));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
