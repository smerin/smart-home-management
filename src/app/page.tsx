export const dynamic = "force-dynamic";

import { getAllDevices } from "@/services/devices";
import DeviceList from "@/components/DeviceList/DeviceList";

export default async function Home() {
  const devices = await getAllDevices();

  return (
    <main>
      <div className="container">
        <DeviceList devices={devices} />
      </div>
    </main>
  );
}
