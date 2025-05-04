import { Dispatch, SetStateAction } from "react";
import ThemeToggle from "../ThemeToggle";
import styles from "./Header.module.css";

export default function Header({
  setThemeClassName,
}: {
  setThemeClassName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className={styles.header}>
      <h1>SWStarter</h1>
      <div className={styles.toggle}>
        <ThemeToggle setClassName={setThemeClassName} />
      </div>
    </header>
  );
}
