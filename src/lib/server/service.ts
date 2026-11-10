// src/lib/server/service.ts
import {
    deleteEntryById,
    insertEntry,
    selectAllEntries,
    updateEntryById,
} from "@/lib/server/repo";
import { AppError } from "@/lib/server/errors";
import type { EntryCreate, EntryUpdate } from "@/lib/validation";

export async function listEntries() {
    return selectAllEntries();
}

export async function createEntry(input: EntryCreate) {
    return insertEntry(input);
}

export async function updateEntry(input: EntryUpdate) {
    const { id, ...values } = input;
    const updated = await updateEntryById(id, values);

    if (!updated) {
        throw new AppError("not_found", "Entry not found", 404);
    }

    return updated;
}

export async function deleteEntry(id: string) {
    const deleted = await deleteEntryById(id);

    if (!deleted) {
        throw new AppError("not_found", "Entry not found", 404);
    }
}