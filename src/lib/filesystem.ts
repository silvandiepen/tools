import { existsSync } from "fs";
const { mkdir } = require("fs").promises;

export const createDir = async (dir: string): Promise<void> => {
  try {
    !existsSync(dir) && (await mkdir(dir, { recursive: true }));
  } catch (error) {
    console.error(error);
  }
};
