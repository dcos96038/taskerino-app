import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema.ts",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
  driver: "mysql2",
} satisfies Config;
