// Simple test to make sure our setup works
import { getErrorMessage } from "@/utils";
import { prisma } from "@/lib/prisma";
import { isValidDeviceType, DEVICE_TYPES } from "@/lib/deviceTypes";

async function testSetup() {
  console.log("🧪 Testing database setup...");

  // Test 1: Check if we can connect to the database
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
  } catch (e) {
    console.log("❌ Database connection failed:", getErrorMessage(e));
    return;
  }

  // Test 2: Check enum validation
  console.log("📋 Available device types:", DEVICE_TYPES);
  console.log('🔍 Is "LIGHT" valid?', isValidDeviceType("LIGHT"));
  console.log('🔍 Is "TOASTER" valid?', isValidDeviceType("TOASTER"));

  // Test 3: Try to create and delete a test device
  try {
    const testDevice = await prisma.device.create({
      data: {
        name: "Test Light",
        type: "LIGHT",
        properties: JSON.stringify({ brightness: 50 }),
      },
    });
    console.log("✅ Created test device:", testDevice.id);

    // Clean up - delete the test device
    await prisma.device.delete({
      where: { id: testDevice.id },
    });
    console.log("✅ Deleted test device");
  } catch (e) {
    console.log("❌ Database operation failed:", getErrorMessage(e));
  }

  await prisma.$disconnect();
  console.log("🎉 Setup test complete!");
}

testSetup();
