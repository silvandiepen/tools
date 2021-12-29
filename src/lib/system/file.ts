// import { dirname } from "path";
// import { createWriteStream, existsSync } from "fs";
import { existsSync } from "fs";
import { dirname, join } from "path";
// import https from "https";
// import fetch from "node-fetch";
import { asyncEvery, asyncSome } from "../async";
const { mkdir, readFile, access, writeFile, R_OK, F_OK, W_OK } =
  require("fs").promises;

// import { DownloadResponse } from "./file.model";

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

export const getJsonData = async (filePath: string): Promise<{}> => {
  const data = await getFileData(filePath);
  return JSON.parse(data);
};

// export const download = async (
//   url: string,
//   destination: string
// ): Promise<void> => {
//   const agent = new https.Agent({
//     rejectUnauthorized: false,
//   });
//   const res: DownloadResponse = await fetch(url, { agent });
//   await createDir(dirname(destination));
//   await new Promise((resolve, reject) => {
//     const fileStream = createWriteStream(destination);
//     res.body?.pipe(fileStream);
//     res.body?.on("error", (err: any) => {
//       reject(err);
//     });
//     fileStream.on("finish", () => {
//       //@ts-ignore: Resolve has to be resolved some how
//       resolve();
//     });
//   });
// };

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(join(__dirname, path), R_OK | W_OK | F_OK);
    console.log("file exists");
    return true;
  } catch {
    console.log("file doesnt exist");
    return false;
  }
};

export const filesExist = async (
  paths: string[],
  some = false
): Promise<boolean> => {
  const action = some ? asyncSome : asyncEvery;

  try {
    const result = await action(
      paths,
      async (file: string) => await fileExists(file)
    );
    return result;
  } catch (err) {
    return false;
  }
};

export const createFile = async (dest: string, data: string): Promise<void> => {
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, data);
};
