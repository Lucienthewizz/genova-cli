import fs from "fs";
import { runCommand, runCommandSilent } from "../utils/commands.js";
import { createFile, createFolder } from "../utils/files.js";
import { logInfo } from "../utils/logger.js";
import { databaseDrivers } from "../config/presets.js";
import {
  getExpressTemplate,
  getHapiTemplate,
  getEnvTemplate,
} from "../templates/server.js";

/**
 * Generate back-end project
 */
export function generateBackend(projectName, config) {
  const { backend, useTypeScript, needsDatabase, database } = config;
  const serverDir = `${projectName}/server`;

  logInfo(`Creating backend (${backend})...`);

  createFolder(serverDir);

  // Initialize npm
  runCommandSilent(`cd ${serverDir} && npm init -y`);

  // Install dependencies
  const deps = [];
  const devDeps = [];

  if (backend === "express") {
    deps.push("express");
    if (useTypeScript) {
      deps.push("@types/express");
    }
  } else if (backend === "hapi") {
    deps.push("@hapi/hapi");
    if (useTypeScript) {
      deps.push("@types/hapi__hapi");
    }
  }

  deps.push("dotenv");

  if (needsDatabase && database && databaseDrivers[database]) {
    const dbPackage = databaseDrivers[database].package;
    deps.push(dbPackage);
    if (useTypeScript && dbPackage === "pg") {
      deps.push("@types/pg");
    }
  }

  if (useTypeScript) {
    devDeps.push("typescript", "@types/node", "ts-node", "nodemon");
  } else {
    devDeps.push("nodemon");
  }

  runCommand(`cd ${serverDir} && npm install ${deps.join(" ")}`);
  if (devDeps.length > 0) {
    runCommand(`cd ${serverDir} && npm install -D ${devDeps.join(" ")}`);
  }

  // Create folder structure
  createFolder(`${serverDir}/src`);
  createFolder(`${serverDir}/src/routes`);
  createFolder(`${serverDir}/src/controllers`);
  createFolder(`${serverDir}/src/models`);
  if (needsDatabase) {
    createFolder(`${serverDir}/src/config`);
  }

  // Create main file
  const mainFile = useTypeScript ? "src/index.ts" : "src/index.js";
  const template =
    backend === "express"
      ? getExpressTemplate(useTypeScript)
      : getHapiTemplate(useTypeScript);

  createFile(`${serverDir}/${mainFile}`, template);

  // Create .env files
  createFile(`${serverDir}/.env`, getEnvTemplate(needsDatabase));
  createFile(`${serverDir}/.env.example`, getEnvTemplate(needsDatabase));

  // Update package.json with scripts
  const packageJsonPath = `${serverDir}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  if (useTypeScript) {
    packageJson.scripts = {
      start: "node dist/index.js",
      dev: "nodemon --exec ts-node src/index.ts",
      build: "tsc",
    };
    packageJson.type = "module";

    // Create tsconfig.json
    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "node",
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ["src/**/*"],
      exclude: ["node_modules"],
    };
    createFile(`${serverDir}/tsconfig.json`, JSON.stringify(tsConfig, null, 2));
  } else {
    packageJson.scripts = {
      start: "node src/index.js",
      dev: "nodemon src/index.js",
    };
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
