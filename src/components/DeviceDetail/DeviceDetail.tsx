"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteDevice, updateDevice } from "@/services/devices";
import { Device, DeviceType, StatusTypes } from "@/types/devices";
import styles from "./DeviceDetail.module.css";

interface DeviceDetailProps {
  device: Device;
}

export default function DeviceDetail({ device }: DeviceDetailProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(device.isActive);
  const [status, setStatus] = useState<StatusTypes>(StatusTypes.IDLE);

  const handleActiveToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setStatus(StatusTypes.LOADING);
      const isChecked = e.target.checked;
      await updateDevice(device.id, { isActive: isChecked });
      setIsActive(isChecked);
      setStatus(StatusTypes.SUCCESS);
    } catch (e) {
      setStatus(StatusTypes.ERROR);
      alert("Failed to update device status");
    }
  };

  const handleDelete = async () => {
    try {
      setStatus(StatusTypes.LOADING);
      await deleteDevice(device.id);
      router.replace("/");
    } catch (e) {
      setStatus(StatusTypes.ERROR);
      alert("Failed to delete device");
    }
  };

  return (
    <div className={styles.deviceDetail}>
      <Link className={styles.link} href="/">
        &larr; Back to devices
      </Link>
      <p className="subtitle">{device.location}</p>
      <h1>{device.name}</h1>
      <div className={styles.status}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isActive}
            aria-label={isActive ? "Active" : "Inactive"}
            disabled={status === StatusTypes.LOADING}
            onChange={handleActiveToggle}
          />
          <span className={styles.slider} />
        </label>
      </div>

      <table className={styles.details}>
        <tbody>
          <tr>
            <th>Device type</th>
            <td>{device.type}</td>
          </tr>
          {device.type === DeviceType.CAMERA && (
            <tr>
              <th>Recording</th>
              <td>{device.properties.isRecording ? "Yes" : "No"}</td>
            </tr>
          )}
          {device.type === DeviceType.LIGHT && (
            <>
              <tr>
                <th>Brightness</th>
                <td>{device.properties.brightness}</td>
              </tr>
              <tr>
                <th>Colour</th>
                <td>{device.properties.color}</td>
              </tr>
            </>
          )}
          {device.type === DeviceType.THERMOSTAT && (
            <>
              <tr>
                <th>Temperature</th>
                <td>{device.properties.temperature}°C</td>
              </tr>
              <tr>
                <th>Target temperature</th>
                <td>{device.properties.targetTemperature}°C</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <button
        className="button"
        data-delete={true}
        onClick={handleDelete}
        disabled={status === StatusTypes.LOADING}
      >
        Delete device
      </button>
    </div>
  );
}
