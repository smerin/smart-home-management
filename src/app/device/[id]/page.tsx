import { notFound } from "next/navigation";
import { getDeviceById } from "@/services/devices";
import DeviceDetail from "@/components/DeviceDetail/DeviceDetail";

export default async function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const device = await getDeviceById(id).catch(() => {
    return notFound();
  });

  return (
    <main>
      <div className="container">
        <DeviceDetail device={device} />
      </div>
    </main>
  );
}
