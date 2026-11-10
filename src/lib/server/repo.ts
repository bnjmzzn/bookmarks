// src/lib/server/repo.ts
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { entries } from "@/db/schema";
import type { EntryCreate, EntryUpdate } from "@/lib/validation";

export async function selectAllEntries() {
    return db
        .select()
        .from(entries)
        .orderBy(desc(entries.createdAt));
}

export async function insertEntry(values: EntryCreate) {
    const [created] = await db
        .insert(entries)
        .values(values)
        .returning();

    return created;
}

export async function updateEntryById(id: string, values: Omit<EntryUpdate, "id">) {
    const [updated] = await db
        .update(entries)
        .set(values)
        .where(eq(entries.id, id))
        .returning();

    return updated;
}

export async function deleteEntryById(id: string) {
    const [deleted] = await db
        .delete(entries)
        .where(eq(entries.id, id))
        .returning();

    return deleted;
}