import {
  Device,
  DeviceType,
  DeviceStatus,
  CreateDeviceRequest,
  DeleteDeviceResponse,
} from "@/types/devices";

const API_BASE = "/api/devices";

// Base URL for API calls - handle both server and client environments
const getBaseURL = () => {
  // If running in browser, use current origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // If running on server, use localhost (for SSR/API routes calling each other)
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// Generic fetch wrapper with error handling
async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    // Build full URL for client-side requests
    const fullUrl = url.startsWith("http") ? url : `${getBaseURL()}${url}`;

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export async function getAllDevices(): Promise<Device[]> {
  console.log("Fetching all devices");
  return await apiCall<Device[]>(API_BASE);
}

export async function createDevice(data: CreateDeviceRequest): Promise<Device> {
  console.log("Creating device:", data.name);
  return await apiCall<Device>(API_BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getDeviceById(id: string): Promise<Device> {
  console.log(`Fetching device: ${id}`);
  return await apiCall<Device>(`${API_BASE}/${id}`);
}

export async function deleteDevice(id: string): Promise<DeleteDeviceResponse> {
  console.log(`Deleting device: ${id}`);
  return await apiCall(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
}
