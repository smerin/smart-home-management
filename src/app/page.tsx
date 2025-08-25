import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Smart Home Management</h1>
          <p>
            A central hub for managing IoT devices in a smart home environment
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; George Smerin {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
