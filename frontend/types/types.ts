type Person = {
  id: string;
  name: string;
};

type Movie = {
  id: string;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PersonData = {
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  mass: string;
  movies: Movie[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MovieData = {
  title: string;
  openingCrawl: string;
  people: Person[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SearchResult = {
  id: string;
  name: string;
  type: string;
};
