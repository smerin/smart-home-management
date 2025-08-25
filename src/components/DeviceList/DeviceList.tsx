import { Device } from "../../types/devices";
import DeviceItem from "../DeviceItem/DeviceItem";
import styles from "./DeviceList.module.css";

interface DeviceListProps {
  devices: Device[];
}

export default function DeviceList({ devices }: DeviceListProps) {
  return (
    <div className={styles.deviceList}>
      <h2>My devices</h2>
      <ul className={styles.devices}>
        {devices.map((device) => (
          <li>
            <DeviceItem device={device} />
          </li>
        ))}
      </ul>
    </div>
  );
}
