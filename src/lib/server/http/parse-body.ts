// src/lib/server/http/parse-body.ts
import type { ZodType } from "zod";

export async function parseBody<Schema extends ZodType>(
    request: Request,
    schema: Schema,
) {
    const body = await request.json();
    return schema.parse(body);
}