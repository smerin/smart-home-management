import { Device } from "@/types/devices";
import DeviceItem from "../DeviceItem/DeviceItem";
import styles from "./DeviceList.module.css";
import Link from "next/link";

interface DeviceListProps {
  devices: Device[];
}

export default function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className={styles.deviceList}>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            <DeviceItem device={device} />
          </li>
        ))}
      </ul>
      <Link href="/add-device" className="button">
        Add new device
      </Link>
    </div>
  );
}
