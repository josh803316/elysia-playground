import { initDB } from "./index.js";

async function main() {
  console.log("Running database setup with migrations and seeding...");

  try {
    // Initialize the database with schema and seed data
    await initDB({ seed: true });

    console.log("Database migration and seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

main();
