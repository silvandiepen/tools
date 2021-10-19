import { dirname } from "path";
import { createWriteStream, existsSync } from "fs";
import https from "https";
import fetch from "node-fetch";
const { mkdir, readFile } = require("fs").promises;

import { DownloadResponse } from "./file.model";

export const createDir = async (dir: string): Promise<void> => {
  try {
    !existsSync(dir) && (await mkdir(dir, { recursive: true }));
  } catch (error) {
    console.error(error);
  }
};

export const getFileData = async (filePath: string): Promise<string> => {
  try {
    const file = await readFile(filePath).then((res: any) => res.toString());
    return filePath.includes(".json") ? JSON.parse(file) : file;
  } catch (err: any) {
    throw Error(err);
  }
};

export const download = async (
  url: string,
  destination: string
): Promise<void> => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const res: DownloadResponse = await fetch(url, { agent });
  await createDir(dirname(destination));
  await new Promise((resolve, reject) => {
    const fileStream = createWriteStream(destination);
    res.body?.pipe(fileStream);
    res.body?.on("error", (err: any) => {
      reject(err);
    });
    fileStream.on("finish", () => {
      //@ts-ignore: Resolve has to be resolved some how
      resolve();
    });
  });
};
