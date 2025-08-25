import AddNewDevice from "@/components/AddNewDevice/AddNewDevice";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AddNewDevice />
      </div>
    </main>
  );
}
