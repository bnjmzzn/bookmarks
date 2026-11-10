// src/app/api/admin/entries/route.ts
import { handleError } from "@/lib/server/errors";
import { jsendSuccess } from "@/lib/server/http/jsend";
import { parseBody } from "@/lib/server/http/parse-body";
import { requireScience } from "@/lib/server/science";
import { createEntry, deleteEntry, updateEntry } from "@/lib/server/service";
import {
    entryCreateSchema,
    entryDeleteSchema,
    entryUpdateSchema,
} from "@/lib/validation";

export async function POST(request: Request) {
    try {
        requireScience(request);
        const input = await parseBody(request, entryCreateSchema);
        const created = await createEntry(input);
        return jsendSuccess(created, 201);
    } catch (error) {
        return handleError(error);
    }
}

export async function PATCH(request: Request) {
    try {
        requireScience(request);
        const input = await parseBody(request, entryUpdateSchema);
        const updated = await updateEntry(input);
        return jsendSuccess(updated);
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(request: Request) {
    try {
        requireScience(request);
        const { id } = await parseBody(request, entryDeleteSchema);
        await deleteEntry(id);
        return jsendSuccess(null);
    } catch (error) {
        return handleError(error);
    }
}