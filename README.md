# Express + Prisma + SQLite API

A simple RESTful API built with Express, Prisma ORM, and SQLite.  
This project demonstrates how to manage nested relations like Items → Children → SubChildren.

---

## 🚀 Features

- Express REST API
- SQLite database with Prisma ORM
- Nested relationships
- Logging, auto DB creation
- Easily extendable

---

## 📦 Requirements

- Node.js v18+
- npm

---

## 🔧 Setup

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations (this creates the SQLite DB)
npx prisma migrate dev --name init

# Start the server
node index.js


# init yr project
npm init -y
npm install prisma --save-dev
npx prisma
npx prisma init --datasource-provider sqlite --output ../generated/prisma

DATABASE_URL="file:./dev.db"

npx prisma migrate dev --name init
npm install @prisma/client
npx prisma generate

```