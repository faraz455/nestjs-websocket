import { Request } from "express";

function timeStampMilliseconds(): number {
  return new Date().getTime();
}

export function unix_timestamp(): number {
  return Math.round(timeStampMilliseconds() / 1000);
}

export function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function syncSleep(ms: number) {
  const timestamp = timeStampMilliseconds() + ms;
  while (timeStampMilliseconds() < timestamp);
}

const BASE36_ALPHABETS: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function MakeTimedIDUnique(): string {
  syncSleep(1);

  let base36: string = "";
  let num: number = Math.round(timeStampMilliseconds() * 1000);
  while (num != 0) {
    const idx = num % BASE36_ALPHABETS.length;
    num = Math.floor(num / BASE36_ALPHABETS.length);
    base36 = BASE36_ALPHABETS[idx] + base36;
  }
  return base36;
}

export function getHost(req: Request) {
  let host: string = req.headers.host!;
  // check 127.0.0.1 to support tests
  return host.includes("127.0.0.1:") ? "localhost:3000" : host;
}

export function unixTimestamp(): number {
  return Math.round(timeStampMilliseconds() / 1000);
}

export function datesForCreate() {
  const timestamp: number = unixTimestamp();
  return { dateCreated: timestamp, dateUpdated: timestamp };
}
