/**
 * Get Express server template
 */
export function getExpressTemplate(useTypeScript = false) {
  if (useTypeScript) {
    return `import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express API!' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;
  }
  return `const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express API!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;
}

/**
 * Get Hapi server template
 */
export function getHapiTemplate(useTypeScript = false) {
  if (useTypeScript) {
    return `import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: 'Welcome to Hapi API!' };
    }
  });

  server.route({
    method: 'GET',
    path: '/api/health',
    handler: (request, h) => {
      return { status: 'OK', timestamp: new Date().toISOString() };
    }
  });

  await server.start();
  console.log(\`🚀 Server running on \${server.info.uri}\`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
`;
  }
  return `const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: 'Welcome to Hapi API!' };
    }
  });

  server.route({
    method: 'GET',
    path: '/api/health',
    handler: (request, h) => {
      return { status: 'OK', timestamp: new Date().toISOString() };
    }
  });

  await server.start();
  console.log(\`🚀 Server running on \${server.info.uri}\`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
`;
}

/**
 * Get environment variables template
 */
export function getEnvTemplate(needsDatabase) {
  let content = `# Server Configuration
PORT=3000
NODE_ENV=development
`;

  if (needsDatabase) {
    content += `
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
`;
  }

  return content;
}

/**
 * Get .gitignore template
 */
export function getGitignoreTemplate() {
  return `# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Environment
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/
`;
}

/**
 * Get README template
 */
export function getReadmeTemplate(projectName, options) {
  const { frontend, backend, needsDatabase, useCodebase } = options;

  let content = `# ${projectName}

This project was created using **Genova CLI**.

## Project Structure

\`\`\`
${projectName}/
`;

  if (frontend) {
    content += `├── client/          # Front-end application (${frontend})\n`;
  }

  if (backend) {
    content += `├── server/          # Back-end API (${backend})\n`;
  }

  if (useCodebase) {
    content += `├── #codebase/       # Documentation and code references\n`;
  }

  content += `└── README.md
\`\`\`

## Getting Started

`;

  if (frontend) {
    content += `### Front-end

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

`;
  }

  if (backend) {
    content += `### Back-end

\`\`\`bash
cd server
npm install
`;
    if (needsDatabase) {
      content += `# Configure database in .env\n`;
    }
    content += `npm run dev
\`\`\`

`;
  }

  content += `## Tech Stack

`;

  if (frontend) {
    content += `- **Front-end:** ${
      frontend === "vite-react-ts"
        ? "React + Vite + TypeScript"
        : "Next.js + TypeScript"
    }\n`;
  }

  if (backend) {
    content += `- **Back-end:** ${
      backend === "hapi" ? "Hapi.js" : "Express.js"
    }\n`;
  }

  if (needsDatabase) {
    content += `- **Database:** PostgreSQL\n`;
  }

  content += `
## License

MIT License
`;

  return content;
}

/**
 * Get #codebase README template
 */
export function getCodebaseReadmeTemplate() {
  return `# #codebase

This folder contains documentation and code references for the project.

## Structure

- **docs/** - Technical documentation and guides
- **examples/** - Implementation examples and use cases
- **snippets/** - Useful code snippets

## Usage

Use this folder to:
- Store architecture documentation
- Record technical decisions (ADR)
- Save frequently used code snippets
- Store feature implementation examples

---
*Generated by Genova CLI*
`;
}

/**
 * Get architecture documentation template
 */
export function getArchitectureDocTemplate(config) {
  const { frontend, backend, needsDatabase } = config;

  let content = `# Project Architecture

## Overview

This document explains the application architecture.

## Layers

`;

  if (frontend) {
    content += `- **Client**: Front-end layer using ${
      frontend === "vite-react-ts" ? "React + Vite" : "Next.js"
    }\n`;
  }

  if (backend) {
    content += `- **Server**: Back-end API using ${backend}\n`;
  }

  if (needsDatabase) {
    content += `- **Database**: PostgreSQL\n`;
  }

  content += `
## Data Flow

[Describe your application data flow here]

## Best Practices

- Use TypeScript for type safety
- Implement proper error handling
- Write tests for critical features
`;

  return content;
}
