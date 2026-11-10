// db/schema.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("entries", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    title: text("title")
        .notNull(),
    url: text("url")
        .notNull(),
    description: text("description")
        .notNull()
        .default(""),
    tags: text("tags")
        .array()
        .notNull()
        .default([]),
    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),
    editedAt: timestamp("edited_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});