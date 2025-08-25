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
      name: "Living Room Smart Light",
      type: DeviceType.LIGHT,
      location: "Living Room",
      status: DeviceStatus.ONLINE,
      isActive: true,
      properties: JSON.stringify({
        brightness: 80,
        color: "#FFD700", // Golden color
      }),
    },
    {
      name: "Bedroom Light",
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
      name: "Main Thermostat",
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
      name: "Upstairs Thermostat",
      type: DeviceType.THERMOSTAT,
      location: "Upstairs Hall",
      status: DeviceStatus.ONLINE,
      isActive: false,
      properties: JSON.stringify({
        temperature: 20,
        targetTemperature: 20,
      }),
    },
    {
      name: "Front Door Camera",
      type: DeviceType.CAMERA,
      location: "Front Door",
      status: DeviceStatus.ONLINE,
      isActive: true,
      properties: JSON.stringify({
        isRecording: true,
      }),
    },
    {
      name: "Backyard Camera",
      type: DeviceType.CAMERA,
      location: "Backyard",
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
