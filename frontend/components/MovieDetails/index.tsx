import { Fragment } from "react";
import styles from "./MovieDetails.module.css";
import Link from "next/link";

export default function MovieDetails({
  movieData,
  loading,
}: {
  movieData: MovieData | null;
  loading: boolean;
}) {
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && !movieData && <p>No data found</p>}
      {!loading && movieData && (
        <>
          <h2 className={styles.title}>{movieData.title}</h2>
          <div className={styles.columns}>
            <div className={styles.leftcolumn}>
              <p className={styles.columntitle}>Opening Crawl</p>
              <div className={styles.columncontent}>
                <p
                  dangerouslySetInnerHTML={{ __html: movieData.openingCrawl }}
                ></p>
              </div>
            </div>
            <div className={styles.rightcolumn}>
              <p className={styles.columntitle}>Characters</p>
              <div className={styles.columncontent}>
                {movieData.people.map((person: Person, index: number) => (
                  <Fragment key={`person-${person.id}`}>
                    {!!index && ", "}
                    <Link
                      className={styles.contentlink}
                      href={`/people/${person.id}`}
                    >
                      {person.name}
                    </Link>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
