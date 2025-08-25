// TODO: Is this in the right place / still relevant?

import { DeviceType, DeviceStatus } from "@prisma/client";

// Extract the values from Prisma enums
export const DEVICE_TYPES = Object.values(DeviceType);
export const DEVICE_STATUSES = Object.values(DeviceStatus);

// Type guard functions - check if a string is a valid enum value
export function isValidDeviceType(type: string): type is DeviceType {
  return DEVICE_TYPES.includes(type as DeviceType);
}

export function isValidDeviceStatus(status: string): status is DeviceStatus {
  return DEVICE_STATUSES.includes(status as DeviceStatus);
}

// Human-friendly labels for the frontend
export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  LIGHT: "Smart Light",
  THERMOSTAT: "Thermostat",
  CAMERA: "Security Camera",
};

export const DEVICE_STATUS_LABELS: Record<DeviceStatus, string> = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  ERROR: "Error",
};
