import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";
import { setTheme } from "@/utils/theme";
import Image from "next/image";

export default function ThemeToggle({
  setClassName,
}: {
  setClassName: Dispatch<SetStateAction<string>>;
}) {
  const [storedTheme, setStoredTheme] = useState("theme-light");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "theme-light";
    setStoredTheme(theme);
  }, []);

  const changeThemeAndToggle = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light", setClassName);
      setStoredTheme("theme-light");
    } else {
      setTheme("theme-dark", setClassName);
      setStoredTheme("theme-dark");
    }
  };

  const handleOnClick = () => {
    changeThemeAndToggle();
  };

  return (
    <button
      onClick={handleOnClick}
      className={`${styles.themetoggle} ${styles[storedTheme]}`}
      title={
        storedTheme === "theme-light"
          ? `"Come to the Dark Side..."`
          : "Back to the Light Side"
      }
    >
      {storedTheme === "theme-light" && (
        <Image
          src="/galactic-empire-16.png"
          alt="Galactic Empire logo"
          width={16}
          height={16}
        />
      )}
      {storedTheme === "theme-dark" && (
        <Image
          src="/rebel-alliance-16.png"
          alt="Rebel Alliance logo"
          width={16}
          height={16}
        />
      )}
    </button>
  );
}
