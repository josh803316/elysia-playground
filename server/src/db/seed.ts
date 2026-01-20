import { initDB } from "./index";

async function main() {
  console.log("Running database seeding...");

  try {
    // Initialize the database with schema and seed data
    await initDB({ seed: true });

    console.log("Database seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
}

main();
