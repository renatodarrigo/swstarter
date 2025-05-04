import {
  type Movie,
  type MovieDetails,
  type PersonDetails,
  type SearchResult,
} from "./types";

export async function searchPeople(search: string) {
  const response = await fetch(`https://swapi.tech/api/people/?name=${search}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }

  const results: SearchResult[] = [];
  for (const result of data.result) {
    const person: SearchResult = {
      id: result.uid,
      name: result.properties.name,
      type: "people",
    };
    results.push(person);
  }

  return results;
}

export async function searchMovies(search: string) {
  const response = await fetch(`https://swapi.tech/api/films/?title=${search}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }

  const results: SearchResult[] = [];
  for (const result of data.result) {
    const movie: SearchResult = {
      id: result.uid,
      name: result.properties.title,
      type: "movies",
    };
    results.push(movie);
  }

  return results;
}

export async function personDetails(id: string) {
  const response = await fetch(`https://swapi.tech/api/people/${id}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }
  const movies = await getMoviesWithPerson(id);

  const details: PersonDetails = {
    name: data.result.properties.name,
    birthYear: data.result.properties.birth_year,
    gender: data.result.properties.gender,
    eyeColor: data.result.properties.eye_color,
    hairColor: data.result.properties.hair_color,
    height: data.result.properties.height,
    mass: data.result.properties.mass,
    movies: movies,
  };

  return details;
}

export async function movieDetails(id: string) {
  const response = await fetch(`https://swapi.tech/api/films/${id}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }
  const people = await getPeopleInMovie(id);
  const details: MovieDetails = {
    title: data.result.properties.title,
    openingCrawl: data.result.properties.opening_crawl.replaceAll(
      /(\r\n)/gm,
      "<br />"
    ),
    people: people,
  };

  return details;
}

async function getMoviesWithPerson(id: string) {
  const response = await fetch(`https://swapi.tech/api/films`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }
  const movies: Movie[] = data.result
    .filter((movie) => {
      return movie.properties.characters.some((character: string) => {
        const characterId = character.split("/").pop();
        return characterId === id;
      });
    })
    .map((movie) => ({
      id: movie.uid,
      title: movie.properties.title,
    }));

  return movies;
}

async function getPeopleInMovie(id: string) {
  const response = await fetch(`https://swapi.tech/api/films/${id}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }

  const peopleData = await Promise.all(
    data.result.properties.characters.map(async (link: string) => {
      return fetch(link).then((response) => response.json());
    })
  );

  const people = peopleData.map((person: any) => ({
    id: person.result.uid,
    name: person.result.properties.name,
  }));

  return people;
}

export async function getPersonName(id: string) {
  const response = await fetch(`https://swapi.tech/api/people/${id}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }
  return data.result.properties.name;
}

export async function getMovieTitle(id: string) {
  const response = await fetch(`https://swapi.tech/api/films/${id}`);
  const data = await response.json();
  if (data.message !== "ok") {
    throw new Error("Network response was not ok");
  }
  return data.result.properties.title;
}
