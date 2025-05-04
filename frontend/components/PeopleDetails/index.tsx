import { Fragment } from "react";
import styles from "./PeopleDetails.module.css";
import Link from "next/link";

export default function PeopleDetails({
  personData,
  loading,
}: {
  personData: PersonData | null;
  loading: boolean;
}) {
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && !personData && <p>No data found</p>}
      {!loading && personData && (
        <>
          <h2 className={styles.name}>{personData.name}</h2>
          <div className={styles.columns}>
            <div className={styles.leftcolumn}>
              <p className={styles.columntitle}>Details</p>
              <div className={styles.columncontent}>
                <p>Birth Year: {personData.birthYear}</p>
                <p>Gender: {personData.gender}</p>
                <p>Eye Color: {personData.eyeColor}</p>
                <p>Hair Color: {personData.hairColor}</p>
                <p>Height: {personData.height}</p>
                <p>Mass: {personData.mass}</p>
              </div>
            </div>
            <div className={styles.rightcolumn}>
              <p className={styles.columntitle}>Movies</p>
              <div className={styles.columncontent}>
                {personData.movies.map((movie: Movie, index: number) => (
                  <Fragment key={`movie-${movie.id}`}>
                    {!!index && ", "}
                    <Link
                      className={styles.contentlink}
                      href={`/movies/${movie.id}`}
                    >
                      {movie.title}
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
