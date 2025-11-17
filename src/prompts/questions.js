import { select, text, isCancel, cancel } from "@clack/prompts";
import { folderExists } from "../utils/files.js";

/**
 * Get all user prompts using Clack
 */
export async function getUserInput() {
  // Project name input
  const projectName = await text({
    message: "Project name:",
    placeholder: "my-project",
    validate: (input) => {
      if (!input) return "Project name cannot be empty.";
      if (!/^[a-z0-9-_]+$/.test(input)) {
        return "Only lowercase letters, numbers, -, and _ allowed.";
      }
      if (folderExists(input)) {
        return `Folder '${input}' already exists.`;
      }
    },
  });

  if (isCancel(projectName)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  // Project type
  const projectType = await select({
    message: "Project type:",
    options: [
      { label: "Backend", value: "backend" },
      { label: "Frontend", value: "frontend" },
      { label: "Fullstack", value: "fullstack" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  const answers = {
    projectName,
    projectType,
    frontend: null,
    backend: null,
    database: null,
    useTypeScript: false,
    addLinting: true,
    addPrettier: true,
    initGit: true,
  };

  // Backend configuration
  if (projectType === "backend") {
    const backend = await select({
      message: "Backend framework:",
      options: [
        { label: "Express", value: "express" },
        { label: "Hapi", value: "hapi" },
      ],
    });

    if (isCancel(backend)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.backend = backend;

    const language = await select({
      message: "Language:",
      options: [
        { label: "TypeScript", value: "typescript" },
        { label: "JavaScript", value: "javascript" },
      ],
    });

    if (isCancel(language)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.useTypeScript = language === "typescript";

    const database = await select({
      message: "Database:",
      options: [
        { label: "PostgreSQL", value: "postgresql" },
        { label: "MySQL", value: "mysql" },
        { label: "SQLite", value: "sqlite" },
        { label: "None", value: "none" },
      ],
    });

    if (isCancel(database)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.database = database;
  }

  // Frontend configuration
  if (projectType === "frontend") {
    const language = await select({
      message: "Language:",
      options: [
        { label: "TypeScript", value: "typescript" },
        { label: "JavaScript", value: "javascript" },
      ],
    });

    if (isCancel(language)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.useTypeScript = language === "typescript";
    answers.frontend =
      language === "typescript" ? "vite-react-ts" : "vite-react";
  }

  // Fullstack configuration
  if (projectType === "fullstack") {
    const language = await select({
      message: "Language:",
      options: [
        { label: "TypeScript", value: "typescript" },
        { label: "JavaScript", value: "javascript" },
      ],
    });

    if (isCancel(language)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.useTypeScript = language === "typescript";
    answers.frontend = "nextjs";
    answers.backend = null;
  }

  return answers;
}
