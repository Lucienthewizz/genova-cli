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

  // Ask if fullstack
  const isFullstack = await select({
    message: "Fullstack project?",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  });

  if (isCancel(isFullstack)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  const answers = {
    projectName,
    projectType: isFullstack ? "fullstack" : null,
    frontend: null,
    backend: null,
    database: null,
    useTypeScript: false,
    addLinting: true,
    addPrettier: true,
    initGit: true,
  };

  if (isFullstack) {
    // Frontend choice
    const frontend = await select({
      message: "Frontend framework:",
      options: [
        { label: "Vite", value: "vite" },
        { label: "Next.js", value: "nextjs" },
      ],
    });

    if (isCancel(frontend)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.frontend = frontend;

    // Backend choice
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
      message: "Backend language:",
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
  } else {
    // Not fullstack - ask frontend or backend
    const projectType = await select({
      message: "Project type:",
      options: [
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
      ],
    });

    if (isCancel(projectType)) {
      cancel("Operation cancelled");
      process.exit(0);
    }

    answers.projectType = projectType;

    if (projectType === "frontend") {
      answers.frontend = "vite";
    } else {
      // Backend
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
  }

  return answers;
}
