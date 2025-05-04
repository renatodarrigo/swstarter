import { RequestLog } from "./lib/db";
import { getMovieTitle, getPersonName } from "./swapi";

export async function getAvgRequestTime() {
  const queryResult = await RequestLog.aggregate([
    {
      $group: {
        _id: null,
        avgTime: { $avg: "$time" },
      },
    },
  ]);
  const avgTime = Math.round((queryResult[0]?.avgTime || 0) * 100) / 100;
  return avgTime;
}

export async function getTopMoviesSearchTerms(limit = 5) {
  const queryResult = await RequestLog.aggregate([
    {
      $match: {
        type: "search",
        search: "movies",
        term: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$term",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        terms: { $push: { term: "$_id", count: "$count" } },
        total: { $sum: "$count" },
      },
    },
    {
      $unwind: "$terms",
    },
    {
      $project: {
        term: "$terms.term",
        percentage: {
          $round: [
            {
              $multiply: [{ $divide: ["$terms.count", "$total"] }, 100],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: { percentage: -1 },
    },
    {
      $limit: limit,
    },
  ]);
  const result = queryResult.map((item) => ({
    term: item.term,
    percentage: `${item.percentage}%`,
  }));
  return result;
}

export async function getTopPeopleSearchTerms(limit = 5) {
  const queryResult = await RequestLog.aggregate([
    {
      $match: {
        type: "search",
        search: "people",
        term: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$term",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        terms: { $push: { term: "$_id", count: "$count" } },
        total: { $sum: "$count" },
      },
    },
    {
      $unwind: "$terms",
    },
    {
      $project: {
        term: "$terms.term",
        percentage: {
          $round: [
            {
              $multiply: [{ $divide: ["$terms.count", "$total"] }, 100],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: { percentage: -1 },
    },
    {
      $limit: limit,
    },
  ]);
  const result = queryResult.map((item) => ({
    term: item.term,
    percentage: `${item.percentage}%`,
  }));
  return result;
}

export async function getTopPeopleDetails(limit = 5) {
  const queryResult = await RequestLog.aggregate([
    {
      $match: {
        type: "details",
        search: "people",
        id: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$id",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        terms: { $push: { id: "$_id", count: "$count" } },
        total: { $sum: "$count" },
      },
    },
    {
      $unwind: "$terms",
    },
    {
      $project: {
        id: "$terms.id",
        percentage: {
          $round: [
            {
              $multiply: [{ $divide: ["$terms.count", "$total"] }, 100],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: { percentage: -1 },
    },
    {
      $limit: limit,
    },
  ]);
  const people = queryResult.map(async (item) => {
    const personName = await getPersonName(item.id);
    const person = {
      name: personName,
      percentage: `${item.percentage}%`,
    };
    return person;
  });
  const result = await Promise.all(people);
  return result;
}

export async function getTopMovieDetails(limit = 5) {
  const queryResult = await RequestLog.aggregate([
    {
      $match: {
        type: "details",
        search: "movies",
        id: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$id",
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        terms: { $push: { id: "$_id", count: "$count" } },
        total: { $sum: "$count" },
      },
    },
    {
      $unwind: "$terms",
    },
    {
      $project: {
        id: "$terms.id",
        percentage: {
          $round: [
            {
              $multiply: [{ $divide: ["$terms.count", "$total"] }, 100],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: { percentage: -1 },
    },
    {
      $limit: limit,
    },
  ]);
  const movies = queryResult.map(async (item) => {
    const movieTitle = await getMovieTitle(item.id);
    const movie = {
      title: movieTitle,
      percentage: `${item.percentage}%`,
    };
    return movie;
  });
  const result = await Promise.all(movies);
  return result;
}

export async function getMostPopularHour() {
  const queryResult = await RequestLog.aggregate([
    {
      $group: {
        _id: { $hour: { $dateFromString: { dateString: "$datetime" } } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        hour: {
          $concat: [
            {
              $cond: {
                if: { $eq: ["$_id", 0] },
                then: "12",
                else: {
                  $cond: {
                    if: { $lt: ["$_id", 12] },
                    then: { $toString: "$_id" },
                    else: { $toString: { $subtract: ["$_id", 12] } },
                  },
                },
              },
            },
            { $cond: { if: { $lt: ["$_id", 12] }, then: " AM", else: " PM" } },
          ],
        },
      },
    },
  ]);
  const mostPopularHour = queryResult[0]?.hour || null;
  return mostPopularHour;
}
