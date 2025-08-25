import Link from "next/link";
import DeviceList from "@/components/DeviceList/DeviceList";
import { getAllDevices } from "@/services/devices";
import styles from "./page.module.css";

export default async function Home() {
  const devices = await getAllDevices();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <DeviceList devices={devices} />
        <Link href="/add-device" className="button">
          Add new device
        </Link>
      </div>
    </main>
  );
}
