import { type RequestData } from "./types";
import { RequestLog } from "./lib/db";
import Queue from "./lib/queue";

async function logRequest(reqData: RequestData): Promise<void> {
  console.log("Request info:", JSON.stringify(reqData));
  const requestLog = new RequestLog(reqData);
  await requestLog.save();
}

export function getLogQueue(): Queue {
  const logQueue = new Queue();
  logQueue.setProcessor(async (job) => {
    const { type, search, term, id, time, datetime } = job;
    await logRequest({
      type,
      search,
      term,
      id,
      time,
      datetime,
    });
  });
  return logQueue;
}
