import { runCommand, runCommandSilent } from "../utils/commands.js";
import { createFile } from "../utils/files.js";
import { logInfo } from "../utils/logger.js";

/**
 * Add ESLint to the project
 */
export function addESLint(serverDir, useTypeScript) {
  logInfo("\n✨ Adding ESLint...");
  runCommand(`cd ${serverDir} && npm install -D eslint`);

  const eslintConfig = {
    env: {
      node: true,
      es2021: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  };

  if (useTypeScript) {
    eslintConfig.extends.push("plugin:@typescript-eslint/recommended");
    eslintConfig.parser = "@typescript-eslint/parser";
    runCommandSilent(
      `cd ${serverDir} && npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`
    );
  }

  createFile(
    `${serverDir}/.eslintrc.json`,
    JSON.stringify(eslintConfig, null, 2)
  );
}

/**
 * Add Prettier to the project
 */
export function addPrettier(serverDir) {
  logInfo("💅 Adding Prettier...");
  runCommand(`cd ${serverDir} && npm install -D prettier`);

  const prettierConfig = {
    semi: true,
    trailingComma: "es5",
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
  };

  createFile(
    `${serverDir}/.prettierrc.json`,
    JSON.stringify(prettierConfig, null, 2)
  );
}

/**
 * Initialize Git repository
 */
export function initializeGit(projectName, gitignoreContent) {
  logInfo("\n🌱 Initializing Git...");
  runCommandSilent(`cd ${projectName} && git init`);
  createFile(`${projectName}/.gitignore`, gitignoreContent);
}
