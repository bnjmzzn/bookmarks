// src/lib/client/hooks/useEntryFilters.ts
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTagCounts, isSortOption } from "@/lib/client/filterEntries";
import type { EntryFilters, SortOption } from "@/lib/client/filterEntries";
import { useEntriesContext } from "@/lib/client/EntriesContext";

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
    const { entries, isLoading, hasError } = useEntriesContext();

    const knownTags = getTagCounts(entries).map((item) => {
        return item.tag;
    });
    const urlTags = searchParams.getAll("tags");
    const validTags = urlTags.filter((tag) => {
        return knownTags.includes(tag);
    });

    const sortParam = searchParams.get("sort");
    const filters: EntryFilters = {
        query: searchParams.get("q") ?? "",
        tags: validTags,
        sort: isSortOption(sortParam) ? sortParam : "newest",
    };
    const entryId = searchParams.get("entry");
    const hasUnknownTags = validTags.length !== urlTags.length;
    
    const hasInvalidSort = sortParam !== null && !isSortOption(sortParam);
    const needsCleanup = hasUnknownTags || hasInvalidSort;

    useEffect(() => {
        if (isLoading || hasError) {
            return;
        }
    
        if (!needsCleanup) {
            return;
        }
    
        router.replace(buildUrl({ ...filters, entryId }));
    }, [isLoading, hasError, needsCleanup]);

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

    function openEntry(id: string) {
        router.push(buildUrl({ ...filters, entryId: id }), { scroll: false });
    }
    
    function closeEntry() {
        router.push(buildUrl({ ...filters, entryId: null }), { scroll: false });
    }

    return {
        filters,
        entryId,
        setQuery,
        setSort,
        setTags,
        selectTag,
        clearAll,
        openEntry,
        closeEntry,
    };
}