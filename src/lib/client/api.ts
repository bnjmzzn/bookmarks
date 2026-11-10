// src/lib/client/api.ts
import { request } from "@/lib/client/http";
import type { Entry } from "@/lib/client/types";
import type { EntryCreate, EntryDelete, EntryUpdate } from "@/lib/validation";

export const api = {
    entries: {
        list(signal?: AbortSignal) {
            return request<Entry[]>("public", { method: "get", url: "/entries", signal });
        },
        create(input: EntryCreate) {
            return request<Entry>("admin", { method: "post", url: "/entries", data: input });
        },
        update(input: EntryUpdate) {
            return request<Entry>("admin", { method: "patch", url: "/entries", data: input });
        },
        remove(input: EntryDelete) {
            return request<null>("admin", { method: "delete", url: "/entries", data: input });
        },
    },
};