import { useQuery } from "@tanstack/react-query";

const fetchMovieDetails = async (id: string) => {
  const response = await fetch(`http://localhost:3001/movies/${id}`);
  const data = await response.json();
  return data;
};

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });
};
