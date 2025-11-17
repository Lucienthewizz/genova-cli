import { execSync } from "child_process";
import { logError } from "./logger.js";

/**
 * Run a command synchronously with output displayed
 */
export function runCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    logError(`❌ Failed to execute command: ${command}`);
    process.exit(1);
  }
}

/**
 * Run a command silently without displaying output
 */
export function runCommandSilent(command) {
  try {
    execSync(command, { stdio: "pipe" });
  } catch (e) {
    logError(`❌ Failed to execute command: ${command}`);
  }
}
