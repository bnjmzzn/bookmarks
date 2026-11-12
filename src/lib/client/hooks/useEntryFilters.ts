// src/lib/client/hooks/useEntryFilters.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { isSortOption } from "@/lib/client/filterEntries";
import type { EntryFilters, SortOption } from "@/lib/client/filterEntries";

type UrlState = EntryFilters & {
    entryId: string | null;
};

function buildUrl(state: UrlState) {
    const params = new URLSearchParams();

    if (state.query !== "") {
        params.set("q", state.query);
    }

    for (const tag of state.tags) {
        params.append("tags", tag);
    }

    if (state.sort !== "newest") {
        params.set("sort", state.sort);
    }

    if (state.entryId !== null) {
        params.set("entry", state.entryId);
    }

    const queryString = params.toString();

    if (queryString === "") {
        return "/";
    }

    return `/?${queryString}`;
}

export function useEntryFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortParam = searchParams.get("sort");
    const filters: EntryFilters = {
        query: searchParams.get("q") ?? "",
        tags: searchParams.getAll("tags"),
        sort: isSortOption(sortParam) ? sortParam : "newest",
    };
    const entryId = searchParams.get("entry");

    function setQuery(query: string) {
        router.replace(buildUrl({ ...filters, query, entryId: null }));
    }

    function setSort(sort: SortOption) {
        router.replace(buildUrl({ ...filters, sort, entryId: null }));
    }

    function setTags(tags: string[]) {
        router.push(buildUrl({ ...filters, tags, entryId: null }));
    }

    function selectTag(tag: string) {
        router.push(`/?tags=${encodeURIComponent(tag)}`);
    }

    function clearAll() {
        router.push("/");
    }

    return { filters, entryId, setQuery, setSort, setTags, selectTag, clearAll };
}