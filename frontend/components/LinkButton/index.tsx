import styles from "./LinkButton.module.css";
import Link from "next/link";

export default function LinkButton({
  children,
  href = "#",
  disabled = false,
}: {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}) {
  return (
    <Link
      className={`${styles.linkbutton} ${disabled ? styles.disabled : ""}`}
      href={href}
    >
      <span>{children}</span>
    </Link>
  );
}
