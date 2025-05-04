import { useQuery } from "@tanstack/react-query";

const fetchSearchPeople = async (term: string) => {
  const response = await fetch(`http://localhost:3001/search/people/${term}`);
  const data = await response.json();
  return data;
};

const fetchSearchMovies = async (term: string) => {
  const response = await fetch(`http://localhost:3001/search/movies/${term}`);
  const data = await response.json();
  return data;
};

export const useSearch = (type: string, term: string) => {
  return useQuery({
    queryKey: ["search", type, term],
    queryFn: () => {
      if (type === "movies") {
        return fetchSearchMovies(term);
      }
      if (type === "people") {
        return fetchSearchPeople(term);
      }
      return [];
    },
    enabled: term.length > 0,
  });
};
