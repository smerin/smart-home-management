import { Device } from "../../types/devices";
import styles from "./DeviceItem.module.css";

interface DeviceItemProps {
  device: Device;
}

export default function DeviceItem({ device }: DeviceItemProps) {
  return (
    <div className={styles.deviceItem}>
      <h3>{device.name}</h3>
      <p>{device.location}</p>
    </div>
  );
}
