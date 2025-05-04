import dotenv from "dotenv";
import { performance } from "perf_hooks";
import express from "express";
import cors from "cors";
import {
  searchPeople,
  searchMovies,
  personDetails,
  movieDetails,
} from "./swapi";
import { connectToDatabase } from "./lib/db";
import { getLogQueue } from "./logger";
import { calculateStats, getStats, setStatsCronJob } from "./stats";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function main() {
  await connectToDatabase();
  await calculateStats();
  setStatsCronJob();

  const logQueue = getLogQueue();
  const app = express();
  app.use(cors());

  app.get("/search/people/:term", async (req, res) => {
    const search = req.params.term;
    const start = performance.now();
    const response = await searchPeople(search);
    const end = performance.now();
    const time = end - start;
    logQueue.add({
      type: "search",
      search: "people",
      term: search,
      id: null,
      time,
      datetime: new Date().toISOString(),
    });
    res.json(response);
  });

  app.get("/search/movies/:term", async (req, res) => {
    const search = req.params.term;
    const start = performance.now();
    const response = await searchMovies(search);
    const end = performance.now();
    const time = end - start;
    logQueue.add({
      type: "search",
      search: "movies",
      term: search,
      id: null,
      time,
      datetime: new Date().toISOString(),
    });
    res.json(response);
  });

  app.get("/people/:id", async (req, res) => {
    const id = req.params.id;
    const start = performance.now();
    const response = await personDetails(id);
    const end = performance.now();
    const time = end - start;
    logQueue.add({
      type: "details",
      search: "people",
      term: null,
      id: id,
      time,
      datetime: new Date().toISOString(),
    });
    res.json(response);
  });

  app.get("/movies/:id", async (req, res) => {
    const id = req.params.id;
    const start = performance.now();
    const response = await movieDetails(id);
    const end = performance.now();
    const time = end - start;
    logQueue.add({
      type: "details",
      search: "movies",
      term: null,
      id: id,
      time,
      datetime: new Date().toISOString(),
    });
    res.json(response);
  });

  app.get("/stats", async (req, res) => {
    const stats = getStats();
    res.json(stats);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
