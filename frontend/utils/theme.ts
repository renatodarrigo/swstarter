import { type Dispatch, type SetStateAction } from "react";

export function setTheme(
  themeName: string,
  setClassName: Dispatch<SetStateAction<string>>
) {
  localStorage.setItem("theme", themeName);
  setClassName(themeName);
}

export function keepTheme(setClassName: Dispatch<SetStateAction<string>>) {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme, setClassName);
    return;
  }

  const prefersLightTheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersLightTheme.matches) {
    setTheme("theme-dark", setClassName);
    return;
  }

  setTheme("theme-light", setClassName);
}
