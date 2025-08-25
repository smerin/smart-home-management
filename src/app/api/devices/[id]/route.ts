import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import {
  isValidDeviceType,
  isValidDeviceStatus,
} from "../../../../lib/deviceTypes";
import { validateProperties } from "../../../../lib/deviceSchemas";

// DELETE /api/devices/[id] - Delete device
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log(`DELETE /api/devices/${id} - Deleting device`);

    try {
      const deletedDevice = await prisma.device.delete({
        where: { id },
      });

      console.log(`✅ Device deleted: ${deletedDevice.name}`);

      return NextResponse.json({
        message: "Device deleted successfully",
        id: deletedDevice.id,
        name: deletedDevice.name,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        // Prisma error code for "Record not found"
        console.log(`❌ Device not found: ${id}`);
        return NextResponse.json(
          { error: "Device not found" },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error: any) {
    console.error("💥 Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
