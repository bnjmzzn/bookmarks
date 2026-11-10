// src/lib/server/science.ts
import { timingSafeEqual } from "node:crypto";
import { AppError } from "@/lib/server/errors";

function isMatchingScience(provided: string, expected: string) {
    const providedBuffer = Buffer.from(provided);
    const expectedBuffer = Buffer.from(expected);

    if (providedBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function requireScience(request: Request) {
    const expected = process.env.SCIENCE;

    if (!expected) {
        throw new AppError("config", "SCIENCE is not set", 500);
    }

    const provided = request.headers.get("x-science");

    if (!provided) {
        throw new AppError("unauthorized", "Unauthorized", 401);
    }

    if (!isMatchingScience(provided, expected)) {
        throw new AppError("unauthorized", "Unauthorized", 401);
    }
}