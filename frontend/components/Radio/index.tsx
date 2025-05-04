import styles from "./Radio.module.css";

export default function Radio({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={styles.radio}>
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
