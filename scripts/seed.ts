import { PrismaClient, DeviceType, DeviceStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting to seed the database...");

  // Clear existing data
  await prisma.device.deleteMany();
  console.log("🗑️ Cleared existing devices");

  // Create sample IoT devices using your simplified properties
  const devices = [
    {
      name: "Living room light",
      type: DeviceType.LIGHT,
      location: "Living room",
      status: DeviceStatus.ONLINE,
      isActive: true,
      properties: JSON.stringify({
        brightness: 80,
        color: "#FFD700", // Golden color
      }),
    },
    {
      name: "Bedroom light",
      type: DeviceType.LIGHT,
      location: "Bedroom",
      status: DeviceStatus.OFFLINE,
      isActive: false,
      properties: JSON.stringify({
        brightness: 0,
        color: "#FFFFFF", // White
      }),
    },
    {
      name: "Main thermostat",
      type: DeviceType.THERMOSTAT,
      location: "Hallway",
      status: DeviceStatus.ONLINE,
      isActive: true,
      properties: JSON.stringify({
        temperature: 22, // Current temp
        targetTemperature: 24, // Desired temp
      }),
    },
    {
      name: "Upstairs thermostat",
      type: DeviceType.THERMOSTAT,
      location: "Upstairs landing",
      status: DeviceStatus.ONLINE,
      isActive: false,
      properties: JSON.stringify({
        temperature: 20,
        targetTemperature: 20,
      }),
    },
    {
      name: "Front door camera",
      type: DeviceType.CAMERA,
      location: "Front Door",
      status: DeviceStatus.ONLINE,
      isActive: true,
      properties: JSON.stringify({
        isRecording: true,
      }),
    },
    {
      name: "Garden camera",
      type: DeviceType.CAMERA,
      location: "Garden",
      status: DeviceStatus.ERROR,
      isActive: false,
      properties: JSON.stringify({
        isRecording: false,
      }),
    },
  ];

  // Create devices one by one so we can see the progress
  for (const deviceData of devices) {
    const device = await prisma.device.create({
      data: deviceData,
    });
    console.log(`✅ Created: ${device.name} (${device.type}) - ${device.id}`);
  }

  console.log("🎉 Seed data created successfully!");

  // Show a summary
  const totalDevices = await prisma.device.count();
  const devicesByType = await prisma.device.groupBy({
    by: ["type"],
    _count: { type: true },
  });

  console.log(`📊 Summary: ${totalDevices} devices created`);
  devicesByType.forEach((group) => {
    console.log(`   ${group.type}: ${group._count.type} devices`);
  });
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
