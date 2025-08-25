"use client";

import { deleteDevice } from "@/services/devices";
import { Device } from "@/types/devices";
import styles from "./DeviceItem.module.css";

interface DeviceItemProps {
  device: Device;
}

export default function DeviceItem({ device }: DeviceItemProps) {
  const handleDelete = async () => {
    try {
      // TODO: Move to device detail page
      const response = await deleteDevice(device.id);
    } catch (e) {
      alert("Failed to delete device");
    }
  };
  return (
    <div className={styles.deviceItem}>
      <h3>{device.name}</h3>
      <p>{device.location}</p>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
}
