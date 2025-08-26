-- CreateEnum
CREATE TYPE "public"."DeviceType" AS ENUM ('LIGHT', 'THERMOSTAT', 'CAMERA');

-- CreateEnum
CREATE TYPE "public"."DeviceStatus" AS ENUM ('ONLINE', 'OFFLINE', 'ERROR');

-- CreateTable
CREATE TABLE "public"."devices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."DeviceType" NOT NULL,
    "status" "public"."DeviceStatus" NOT NULL DEFAULT 'OFFLINE',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "properties" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);
