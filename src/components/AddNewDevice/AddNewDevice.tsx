"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDevice } from "@/services/devices";
import { CreateDeviceRequest, DeviceType, StatusTypes } from "@/types/devices";
import styles from "./AddNewDevice.module.css";

export default function AddNewDevice() {
  const router = useRouter();
  const [status, setStatus] = useState<StatusTypes>(StatusTypes.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = status === StatusTypes.LOADING;

  const handleAddDevice = async (deviceRequest: CreateDeviceRequest) => {
    try {
      setStatus(StatusTypes.LOADING);
      setErrorMessage("");
      const device = await createDevice(deviceRequest);
      if (device) {
        router.push("/");
      } else {
        throw new Error();
      }
    } catch (e) {
      setStatus(StatusTypes.ERROR);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.addNewDevice}>
      <div className={styles.buttons}>
        <button
          className="button"
          disabled={isSubmitting}
          onClick={() =>
            handleAddDevice({
              name: "Wall lights",
              type: DeviceType.LIGHT,
              location: "Bedroom",
              properties: {
                color: "#ffffff",
                brightness: 30,
              },
            })
          }
        >
          Add bedroom wall lights
        </button>
        <button
          className="button"
          disabled={isSubmitting}
          onClick={() =>
            handleAddDevice({
              name: "Garage thermostat",
              type: DeviceType.THERMOSTAT,
              location: "Garage",
              properties: {
                temperature: 10,
                targetTemperature: 15,
              },
            })
          }
        >
          Add garage thermostat
        </button>
        <button
          className="button"
          disabled={isSubmitting}
          onClick={() =>
            handleAddDevice({
              name: "Alleyway Camera",
              type: DeviceType.CAMERA,
              location: "Alleyway",
              properties: {
                isRecording: false,
              },
            })
          }
        >
          Add alleyway camera
        </button>
      </div>
      {status === StatusTypes.ERROR && errorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </div>
  );
}
