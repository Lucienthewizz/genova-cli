# Genova CLI

<div align="center">

🚀 **A powerful CLI tool for scaffolding modern full-stack projects**

[![NPM Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/genova-cli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Available Stacks](#-available-stacks)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Configuration Options](#-configuration-options)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🎯 **10+ Pre-configured Stack Templates** - Ready-to-use combinations for rapid development
- ⚡ **Interactive CLI** - Simple arrow-key navigation, no typing required (for presets)
- 🏗️ **Modern Tech Stack** - React, Next.js, Express, Hapi.js, TypeScript, PostgreSQL
- 📚 **Built-in Documentation** - Automatic #codebase folder with architecture docs
- 🎨 **Code Quality Tools** - ESLint & Prettier pre-configured
- 🔧 **Flexible Configuration** - Choose presets or customize your own stack
- 🌱 **Git Ready** - Automatic Git initialization with .gitignore
- 📦 **Production Ready** - TypeScript, environment variables, and best practices included

---

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g genova-cli
```

### Using npx (No Installation Required)

```bash
npx genova-cli
```

---

## 🎬 Quick Start

1. **Run the CLI**:

   ```bash
   genova
   ```

2. **Select your project name** using arrow keys (or choose "Custom name" to type your own)

3. **Choose a stack template** from the list:

   - MERN Stack (React + Express + PostgreSQL)
   - Next.js Full-stack
   - React Dashboard (Frontend only)
   - Express API (Backend only)
   - ...and more!

4. **Navigate to your project**:

   ```bash
   cd your-project-name
   ```

5. **Start developing**! ✨

---

## 📦 Available Stacks

### Full-Stack Templates

| Template                  | Description                 | Tech Stack                                       |
| ------------------------- | --------------------------- | ------------------------------------------------ |
| 🚀 **MERN Stack**         | Production-ready full-stack | React + Vite + Express + PostgreSQL + TypeScript |
| ⚡ **Next.js Full-stack** | Modern SSR application      | Next.js + Express + PostgreSQL + TypeScript      |
| 🎯 **React + Express**    | Simple full-stack           | Vite + Express (No DB, No TypeScript)            |
| ⚡ **Next.js + Hapi**     | Alternative backend         | Next.js + Hapi.js (No DB)                        |

### Frontend-Only Templates

| Template               | Description         | Tech Stack                |
| ---------------------- | ------------------- | ------------------------- |
| 🎨 **React Dashboard** | SPA with Vite       | React + Vite + TypeScript |
| 📱 **Next.js App**     | SSR/SSG application | Next.js + TypeScript      |

### Backend-Only Templates

| Template                  | Description         | Tech Stack                        |
| ------------------------- | ------------------- | --------------------------------- |
| 🔧 **Express API**        | RESTful API with DB | Express + TypeScript + PostgreSQL |
| ⚙️ **Express API Simple** | Lightweight API     | Express + TypeScript              |
| 🌐 **Hapi API**           | Robust API with DB  | Hapi.js + TypeScript + PostgreSQL |
| 🛠️ **Hapi API Simple**    | Minimal Hapi setup  | Hapi.js + TypeScript              |

### Custom Stack

| Template      | Description                                           |
| ------------- | ----------------------------------------------------- |
| ✨ **Custom** | Build your own combination by choosing each component |

---

## 📁 Project Structure

### Full-Stack Project

```
my-project/
├── client/                 # Front-end application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Back-end API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── index.ts
│   ├── .env
│   └── package.json
├── #codebase/              # Documentation folder
│   ├── docs/
│   │   └── architecture.md
│   ├── examples/
│   └── snippets/
├── .gitignore
└── README.md
```

---

## 📖 Usage Guide

### Front-End Setup

```bash
cd your-project/client
npm install
npm run dev
```

The front-end will be available at `http://localhost:5173` (Vite) or `http://localhost:3000` (Next.js)

### Back-End Setup

```bash
cd your-project/server
npm install

# Configure environment variables if needed
nano .env

# Start development server
npm run dev
```

The back-end will be available at `http://localhost:3000`

### Database Configuration (if PostgreSQL is included)

Edit `server/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
```

---

## ⚙️ Configuration Options

### Custom Stack Configuration

When selecting "Custom" stack, configure these options:

1. **Project Type**

   - Full-stack (Front-end + Back-end)
   - Front-end only
   - Back-end only

2. **Front-end Framework** (if applicable)

   - Vite (React + TypeScript)
   - Next.js (App Router + TypeScript)

3. **Back-end Framework** (if applicable)

   - Express.js
   - Hapi.js

4. **TypeScript** - Enable/disable TypeScript for back-end

5. **Database** - Include PostgreSQL driver (pg)

6. **Code Quality Tools**

   - ESLint for linting
   - Prettier for formatting

7. **Documentation** - Create #codebase folder

8. **Version Control** - Initialize Git repository

---

## 🎯 Key Features Explained

### #codebase Folder

The `#codebase` folder is automatically created to organize your project documentation:

- **docs/** - Technical documentation, architecture decisions (ADR)
- **examples/** - Code examples and implementation patterns
- **snippets/** - Reusable code snippets

This keeps your codebase clean while maintaining important reference materials.

### Pre-configured Scripts

All generated projects include useful npm scripts:

**Front-end:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Back-end:**

- `npm run dev` - Start with nodemon (auto-reload)
- `npm run build` - Compile TypeScript (if enabled)
- `npm start` - Run production build

### Environment Variables

Back-end projects include `.env` and `.env.example` files:

- `.env` - Your actual configuration (gitignored)
- `.env.example` - Template for other developers

---

## 🛠️ Development

### Project Commands

```bash
# Install dependencies
npm install

# Run Genova CLI locally
node index.js

# Create a global symlink for testing
npm link
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👨‍💻 Author

**I Gusti Agung Ngurah Lucien Yudistira Purnawarman**

---

## 🙏 Acknowledgments

- Built with [@clack/prompts](https://github.com/natemoo-re/clack) for modern interactive CLI
- Styled with [Kleur](https://github.com/lukeed/kleur) for lightweight terminal colors

---

<div align="center">

**Made with ❤️ and ☕**

[Report Bug](https://github.com/yourusername/genova-cli/issues) · [Request Feature](https://github.com/yourusername/genova-cli/issues)

</div>
