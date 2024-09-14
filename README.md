# Employee-manager Application

This is a a Node.js Express application with TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. **Clone the Repository:**

   git clone repository-url

2. **Install the dependecies and setup project:**

   cd app-name
   npm install

3. **Configure database as mentioned below - working with database section**
4. **Copy .env file to root of the project:**

5. **Build the application:**

   npm run build

6. **Run the application:**

   npm start

7. **Run the local development server:**

   npm run dev

## Working with database - drizzle

1. Setup a postgresql database locally
2. Set the DATABASE_URL in .env file to connect to the database
3. use `npm run push` command to create the tables needed for the database.

All the schemas and migration file location is set to models folder. Update drizzle.config.ts to change configurations

**Pull the schema from supabase:**

npm run pull

**Publish the updated schema to supabase:**

npm run push

## Documentation - swagger

**Browse /api-docs for the documentation**
