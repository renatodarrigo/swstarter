import cron from "node-cron";
import {
  getAvgRequestTime,
  getMostPopularHour,
  getTopMovieDetails,
  getTopMoviesSearchTerms,
  getTopPeopleDetails,
  getTopPeopleSearchTerms,
} from "./queries";
import { type Stats } from "./types";

const stats: Stats = {
  avgRequestTimeMS: 0,
  mostPopularHourUTC: "",
  topPeopleSearchTerms: [],
  topMoviesSearchTerms: [],
  topPeople: [],
  topMovies: [],
};

export async function calculateStats() {
  console.log("Calculating stats...");
  const [
    avgRequestTimeMS,
    mostPopularHourUTC,
    topPeopleSearchTerms,
    topMoviesSearchTerms,
    topPeople,
    topMovies,
  ] = await Promise.all([
    getAvgRequestTime(),
    getMostPopularHour(),
    getTopPeopleSearchTerms(),
    getTopMoviesSearchTerms(),
    getTopPeopleDetails(),
    getTopMovieDetails(),
  ]);

  stats.avgRequestTimeMS = avgRequestTimeMS;
  stats.mostPopularHourUTC = mostPopularHourUTC;
  stats.topPeopleSearchTerms = topPeopleSearchTerms;
  stats.topMoviesSearchTerms = topMoviesSearchTerms;
  stats.topPeople = topPeople;
  stats.topMovies = topMovies;
  console.log("Calculating stats done");
}

export function getStats() {
  return stats;
}

export function setStatsCronJob() {
  cron.schedule("*/5 * * * *", async () => {
    await calculateStats();
  });
}
