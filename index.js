#!/usr/bin/env node

import { spinner } from "@clack/prompts";
import { getUserInput } from "./src/prompts/questions.js";
import { logInfo, logError, displayBanner } from "./src/utils/logger.js";
import { createFolder, folderExists, createFile } from "./src/utils/files.js";
import { generateFrontend } from "./src/generators/frontend.js";
import { generateBackend } from "./src/generators/backend.js";
import {
  addESLint,
  addPrettier,
  initializeGit,
} from "./src/generators/tooling.js";
import {
  getReadmeTemplate,
  getGitignoreTemplate,
} from "./src/templates/server.js";

/**
 * Main CLI function
 */
async function main() {
  displayBanner();

  try {
    // Get user input
    const answers = await getUserInput();
    const projectName = answers.projectName;

    // Validate folder doesn't exist
    if (folderExists(projectName)) {
      logError(`Folder '${projectName}' already exists.`);
      process.exit(1);
    }

    // Build configuration
    const config = {
      projectType: answers.projectType,
      frontend: answers.frontend,
      backend: answers.backend,
      database: answers.database,
      useTypeScript: answers.useTypeScript,
      needsDatabase: answers.database && answers.database !== "none",
      addLinting: answers.addLinting,
      addPrettier: answers.addPrettier,
      initGit: answers.initGit,
    };

    const s = spinner();
    s.start("Creating project...");

    // For frontend-only, just run npm create vite
    if (config.projectType === "frontend") {
      s.stop();
      generateFrontend(projectName, config.frontend, config.useTypeScript);
      console.log(`\ncd ${projectName}`);
      return;
    }

    // For fullstack - create monorepo structure
    if (config.projectType === "fullstack") {
      createFolder(projectName);

      // Generate frontend in /frontend folder
      s.message("Generating frontend...");
      const frontendPath = `${projectName}/frontend`;
      generateFrontend(frontendPath, config.frontend, config.useTypeScript);

      // Generate backend in /backend folder
      s.message("Generating backend...");
      const backendConfig = {
        ...config,
        projectType: "backend",
      };
      const backendPath = `${projectName}/backend`;
      createFolder(backendPath);
      generateBackend(backendPath, backendConfig);

      // Add tooling for backend
      if (config.addLinting || config.addPrettier) {
        const serverDir = `${backendPath}/server`;

        if (config.addLinting) {
          addESLint(serverDir, config.useTypeScript);
        }

        if (config.addPrettier) {
          addPrettier(serverDir);
        }
      }

      // Initialize Git
      if (config.initGit) {
        initializeGit(projectName, getGitignoreTemplate());
      }

      // Create README
      const readmeContent = getReadmeTemplate(projectName, config);
      createFile(`${projectName}/README.md`, readmeContent);

      s.stop("Done");
      console.log(`\ncd ${projectName}`);
      return;
    }

    // For backend-only
    createFolder(projectName);

    s.message("Generating backend...");
    generateBackend(projectName, config);

    // Add tooling
    if (config.addLinting || config.addPrettier) {
      const serverDir = `${projectName}/server`;

      if (config.addLinting) {
        addESLint(serverDir, config.useTypeScript);
      }

      if (config.addPrettier) {
        addPrettier(serverDir);
      }
    }

    // Initialize Git
    if (config.initGit) {
      initializeGit(projectName, getGitignoreTemplate());
    }

    // Create README
    const readmeContent = getReadmeTemplate(projectName, config);
    createFile(`${projectName}/README.md`, readmeContent);

    s.stop("Done");

    console.log(`\ncd ${projectName}`);
  } catch (error) {
    logError("Error: " + (error.message || "Unknown error"));
    process.exit(1);
  }
}

// Run the CLI
main();
