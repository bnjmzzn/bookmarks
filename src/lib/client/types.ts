// src/lib/client/types.ts
import type { Entry as EntryRow } from "@/lib/validation";

export type Serialized<Value> = {
    [Key in keyof Value]: Value[Key] extends Date ? string : Value[Key];
};

export type Entry = Serialized<EntryRow>;