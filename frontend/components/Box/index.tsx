import styles from "./Box.module.css";

export default function Box({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.box}>{children}</div>;
}
