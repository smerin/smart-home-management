// Shared types for the entire application
// Uses Prisma-generated types as the single source of truth
import {
  Device as PrismaDevice,
  DeviceType,
  DeviceStatus,
} from "@prisma/client";

// Re-export Prisma types
export { DeviceType, DeviceStatus };

// Main Device type with parsed properties (Prisma stores properties as string)
export interface Device extends Omit<PrismaDevice, "properties"> {
  properties: Record<string, number | string | boolean>; // Parsed JSON properties
}

// API request types
export interface CreateDeviceRequest {
  name: string;
  type: DeviceType;
  location?: string;
  status?: DeviceStatus;
  isActive?: boolean;
  properties?: Record<string, number | string | boolean>;
}

export interface UpdateDeviceRequest {
  name?: string;
  type?: DeviceType;
  location?: string | null;
  status?: DeviceStatus;
  isActive?: boolean;
  properties?: Record<string, number | string | boolean>;
}

export interface DeleteDeviceResponse {
  message: string;
  id: string;
  name: string;
}

export enum StatusTypes {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
  IDLE = "idle",
}
