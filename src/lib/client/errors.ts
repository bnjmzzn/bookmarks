// src/lib/client/errors.ts
export class ClientError extends Error {
    status: number;
    issues: Record<string, unknown> | null;

    constructor(status: number, message: string, issues: Record<string, unknown> | null) {
        super(message);
        this.name = "ClientError";
        this.status = status;
        this.issues = issues;
    }
}

export function getErrorMessage(error: unknown) {
    if (error instanceof ClientError) {
        return error.message;
    }

    return "Something went wrong";
}