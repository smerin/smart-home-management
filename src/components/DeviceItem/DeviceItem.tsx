import Link from "next/link";
import { Device } from "@/types/devices";
import styles from "./DeviceItem.module.css";

interface DeviceItemProps {
  device: Device;
}

export default function DeviceItem({ device }: DeviceItemProps) {
  return (
    <Link className={styles.deviceItem} href={`/device/${device.id}`}>
      <div className={styles.info}>
        <p className="subtitle">{device.location}</p>
        <h3>{device.name}</h3>
      </div>
      <div>
        <span className={styles.light} data-active={device.isActive} />
      </div>
    </Link>
  );
}
