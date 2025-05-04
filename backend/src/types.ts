export type SearchResult = {
  id: string;
  name: string;
  type: "people" | "movies";
};

export type Movie = {
  id: string;
  title: string;
};

export type PersonDetails = {
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  mass: string;
  movies: Movie[];
};

export type Person = {
  id: string;
  name: string;
};

export type MovieDetails = {
  title: string;
  openingCrawl: string;
  people: Person[];
};

export type Job = {
  [key: string]: any;
};

export type QueueProcessor = (job: Job) => Promise<void>;

export type RequestData = {
  type: "search" | "details";
  search: "people" | "movies" | null;
  term: string | null;
  id: string | null;
  time: number;
  datetime: string;
};

export type TermStats = {
  term: string;
  percentage: string;
};

export type TopPeople = {
  name: string;
  percentage: string;
};

export type TopMovies = {
  title: string;
  percentage: string;
};

export type Stats = {
  avgRequestTimeMS: number;
  mostPopularHourUTC: string;
  topPeopleSearchTerms: TermStats[];
  topMoviesSearchTerms: TermStats[];
  topPeople: TopPeople[];
  topMovies: TopMovies[];
};
