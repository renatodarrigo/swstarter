import LinkButton from "@/components/LinkButton";
import styles from "./ResultItem.module.css";

export default function ResultItem({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <div className={styles.resultitem}>
      <p>{name}</p>
      <LinkButton href={href}>See Details</LinkButton>
    </div>
  );
}
