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
  const { projectType, frontend, backend, database } = options;

  let content = `# ${projectName}

Generated with Genova CLI

## Setup

`;

  if (projectType === "frontend") {
    content += `\`\`\`bash
npm install
npm run dev
\`\`\`
`;
  } else if (projectType === "fullstack") {
    content += `\`\`\`bash
npm install
npm run dev
\`\`\`
`;
  } else if (projectType === "backend") {
    content += `\`\`\`bash
cd server
npm install
`;
    if (database && database !== "none") {
      content += `# Configure .env file
`;
    }
    content += `npm run dev
\`\`\`
`;
  }

  return content;
}
