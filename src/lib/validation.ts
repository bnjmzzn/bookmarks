// src/lib/validation.ts
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { entries } from "@/db/schema";

export type Entry = typeof entries.$inferSelect;

function isHttpUrl(value: string) {
    try {
        const { protocol } = new URL(value);
        return protocol === "http:" || protocol === "https:";
    } catch {
        return false;
    }
}

const fieldOverrides = {
    title: (schema: z.ZodString) => schema.trim().min(1),
    url: (schema: z.ZodString) => schema.trim().refine(isHttpUrl, "Must be an http or https url"),
};

const serverOwnedFields = {
    createdAt: true,
    editedAt: true,
} as const;

export const entryCreateSchema = createInsertSchema(entries, fieldOverrides).omit({
    id: true,
    ...serverOwnedFields,
});

function hasUpdatableField(data: Record<string, unknown>) {
    const fieldKeys = Object.keys(data).filter((key) => {
        return key !== "id";
    });

    return fieldKeys.length > 0;
}

export const entryUpdateSchema = createUpdateSchema(entries, fieldOverrides)
    .omit({
        id: true,
        ...serverOwnedFields,
    })
    .extend({
        id: z.uuid(),
    })
    .refine(hasUpdatableField, "At least one field to update is required");

export const entryDeleteSchema = z.object({
    id: z.uuid(),
});

export type EntryCreate = z.infer<typeof entryCreateSchema>;
export type EntryUpdate = z.infer<typeof entryUpdateSchema>;
export type EntryDelete = z.infer<typeof entryDeleteSchema>;