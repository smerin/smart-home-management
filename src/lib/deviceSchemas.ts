// TODO: Is this in the right place / still relevant?

// Simple validation for device properties
export function validateProperties(properties: any): {
  isValid: boolean;
  error?: string;
} {
  // Check if properties is an object
  if (!properties || typeof properties !== "object") {
    return { isValid: false, error: "Properties must be an object" };
  }

  // Check if it can be converted to JSON (no functions, undefined, etc.)
  try {
    JSON.stringify(properties);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: "Properties must be serializable to JSON" };
  }
}

// Default properties for each device type
export function getDefaultProperties(type: string) {
  switch (type) {
    case "LIGHT":
      return {
        brightness: 100,
        color: "#FFFFFF",
      };
    case "THERMOSTAT":
      return {
        temperature: 20,
        targetTemperature: 20,
      };
    case "CAMERA":
      return {
        isRecording: false,
      };
    default:
      return {};
  }
}
