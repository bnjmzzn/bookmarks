// src/lib/client/types.ts
import type { Entry as EntryRow } from "@/lib/validation";

export type Serialized<Value> = {
    [Key in keyof Value]: Value[Key] extends Date ? string : Value[Key];
};

export type Entry = Serialized<EntryRow>;

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