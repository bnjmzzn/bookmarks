// src/app/api/entries/route.ts
import { handleError } from "@/lib/server/errors";
import { jsendSuccess } from "@/lib/server/http/jsend";
import { listEntries } from "@/lib/server/service";

export async function GET() {
    try {
        const entries = await listEntries();
        const response = jsendSuccess(entries);
        response.headers.set(
            "Cache-Control",
            "public, s-maxage=60, stale-while-revalidate=600",
        );
        return response;
    } catch (error) {
        return handleError(error);
    }
}