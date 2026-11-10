// src/lib/server/errors.ts
import { ZodError } from "zod";
import { jsendError, jsendFail } from "@/lib/server/http/jsend";

export type AppErrorKind =
    | "unauthorized"
    | "not_found"
    | "conflict"
    | "validation"
    | "config";

export class AppError extends Error {
    kind: AppErrorKind;
    status: number;

    constructor(kind: AppErrorKind, message: string, status: number) {
        super(message);
        this.name = "AppError";
        this.kind = kind;
        this.status = status;
    }
}

const UNIQUE_VIOLATION_CODE = "23505";

function hasUniqueViolationCode(error: unknown) {
    if (typeof error !== "object" || error === null) {
        return false;
    }

    const { code } = error as { code?: unknown };
    return code === UNIQUE_VIOLATION_CODE;
}

function isUniqueViolation(error: unknown) {
    if (hasUniqueViolationCode(error)) {
        return true;
    }

    if (error instanceof Error) {
        return hasUniqueViolationCode(error.cause);
    }

    return false;
}

export function handleError(error: unknown) {
    if (error instanceof ZodError) {
        return jsendFail({ issues: error.issues }, 400);
    }

    if (error instanceof AppError) {
        if (error.status >= 500) {
            console.error(error);
            return jsendError("Internal server error", error.status);
        }

        return jsendFail({ message: error.message }, error.status);
    }

    if (isUniqueViolation(error)) {
        return jsendFail({ message: "Entry with this url already exists" }, 409);
    }

    if (error instanceof SyntaxError) {
        return jsendFail({ message: "Malformed JSON body" }, 400);
    }

    console.error(error);
    return jsendError("Internal server error", 500);
}