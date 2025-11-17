import fs from "fs";
import { logError } from "./logger.js";

/**
 * Create a file with specified content
 */
export function createFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, "utf8");
  } catch (e) {
    logError(`❌ Failed to create file: ${filePath}`);
  }
}

/**
 * Create a folder if it doesn't exist
 */
export function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

/**
 * Check if a folder exists
 */
export function folderExists(folderPath) {
  return fs.existsSync(folderPath);
}
