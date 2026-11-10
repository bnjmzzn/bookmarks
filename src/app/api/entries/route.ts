// src/app/api/entries/route.ts
import { handleError } from "@/lib/server/errors";
import { jsendSuccess } from "@/lib/server/http/jsend";
import { listEntries } from "@/lib/server/service";

export async function GET() {
    try {
        const entries = await listEntries();
        return jsendSuccess(entries);
    } catch (error) {
        return handleError(error);
    }
}