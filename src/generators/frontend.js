import { runCommand } from "../utils/commands.js";
import { logInfo } from "../utils/logger.js";

/**
 * Generate front-end project
 */
export function generateFrontend(projectName, frontend, useTypeScript = true) {
  logInfo("Creating frontend...");

  let feCommand = "";
  if (frontend === "vite") {
    feCommand = `npm create vite@latest ${projectName}`;
  } else if (frontend === "nextjs") {
    const tsFlag = useTypeScript ? "--ts" : "--js";
    feCommand = `npx create-next-app@latest ${projectName} ${tsFlag} --app --eslint --tailwind --src-dir --import-alias="@/*" --no-git`;
  }

  runCommand(feCommand);
}
