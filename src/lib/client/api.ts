// src/lib/client/api.ts
import { adminHttp, publicHttp } from "@/lib/client/http";
import type { Entry } from "@/lib/client/types";
import type { EntryCreate, EntryDelete, EntryUpdate } from "@/lib/validation";

export async function getEntries(signal?: AbortSignal) {
    const response = await publicHttp.get<Entry[]>("/entries", { signal });
    return response.data;
}

export async function createEntry(input: EntryCreate) {
    const response = await adminHttp.post<Entry>("/entries", input);
    return response.data;
}

export async function updateEntry(input: EntryUpdate) {
    const response = await adminHttp.patch<Entry>("/entries", input);
    return response.data;
}

export async function deleteEntry(input: EntryDelete) {
    await adminHttp.delete<null>("/entries", { data: input });
}