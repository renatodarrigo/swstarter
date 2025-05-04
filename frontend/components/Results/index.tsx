import ResultItem from "@/components/ResultItem";
import styles from "./Results.module.css";

export default function Results({
  data,
  searching,
}: {
  data: SearchResult[];
  searching: boolean;
}) {
  return (
    <div className={styles.results}>
      <h2>Results</h2>
      <div className={styles.resultlist}>
        {searching ? (
          <div className={styles.empty}>
            <p>Searching...</p>
          </div>
        ) : !searching && data && data.length ? (
          data.map((item) => (
            <ResultItem
              key={`${item.type}-${item.id}`}
              name={item.name}
              href={`/${item.type}/${item.id}`}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>
              There are zero matches.
              <br />
              Use the form to search for People or Movies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
