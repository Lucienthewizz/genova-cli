import { runCommand } from "../utils/commands.js";
import { logInfo } from "../utils/logger.js";

/**
 * Generate front-end project
 */
export function generateFrontend(projectName, frontend) {
  logInfo("Creating frontend...");

  let feCommand = "";
  if (frontend === "vite-react-ts") {
    feCommand = `npm create vite@latest ${projectName} -- --template react-ts`;
  } else if (frontend === "nextjs") {
    feCommand = `npx create-next-app@latest ${projectName} --ts --app --eslint --tailwind --src-dir --import-alias="@/*" --no-git`;
  }

  runCommand(feCommand);
}
