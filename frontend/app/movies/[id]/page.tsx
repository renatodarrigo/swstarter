"use client";

import Box from "@/components/Box";
import styles from "./page.module.css";
import LinkButton from "@/components/LinkButton";
import { use } from "react";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import MovieDetails from "@/components/MovieDetails";

export default function MoviesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading, isFetching } = useMovieDetails(id);

  return (
    <div className={styles.moviespage}>
      <Box>
        <MovieDetails loading={isLoading || isFetching} movieData={data} />
        <div className={styles.nav}>
          <LinkButton href="/">Back to Search</LinkButton>
        </div>
      </Box>
    </div>
  );
}
