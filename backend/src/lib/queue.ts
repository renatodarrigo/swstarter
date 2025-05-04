import { type QueueProcessor, type Job } from "../types";

export default class Queue {
  private queue: Job[] = [];
  private processor: QueueProcessor | null = null;
  private isProcessing = false;

  public add(job: Job) {
    this.queue.push(job);
    this.processQueue();
  }

  public setProcessor(processor: QueueProcessor) {
    this.processor = processor;
  }

  private async processQueue() {
    if (!this.processor) {
      throw new Error("Processor not set");
    }
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (job) {
        await this.processor(job);
      }
    }

    this.isProcessing = false;
  }
}
