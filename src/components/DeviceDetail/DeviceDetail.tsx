"use client";

import { useRouter } from "next/navigation";
import { deleteDevice } from "@/services/devices";
import { Device } from "@/types/devices";
import styles from "./DeviceDetail.module.css";

interface DeviceDetailProps {
  device: Device;
}

export default function DeviceDetail({ device }: DeviceDetailProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteDevice(device.id);
      router.replace("/");
    } catch (e) {
      alert("Failed to delete device");
    }
  };
  return (
    <div className={styles.deviceDetail}>
      <h3>{device.name}</h3>
      <p>{device.location}</p>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
}
