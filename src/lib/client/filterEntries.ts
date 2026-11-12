// src/lib/client/filterEntries.ts
import type { Entry } from "@/lib/client/types";

export type SortOption = "newest" | "oldest" | "az" | "za";

export type EntryFilters = {
    query: string;
    tags: string[];
    sort: SortOption;
};

const sortOptions: string[] = ["newest", "oldest", "az", "za"];

export function isSortOption(value: string | null): value is SortOption {
    if (value === null) {
        return false;
    }

    return sortOptions.includes(value);
}

function matchesQuery(entry: Entry, query: string) {
    if (query === "") {
        return true;
    }

    const searchable = [entry.title, entry.description, entry.url, entry.tags.join(" ")]
        .join(" ")
        .toLowerCase();

    return searchable.includes(query);
}

function matchesTags(entry: Entry, tags: string[]) {
    return tags.every((tag) => {
        return entry.tags.includes(tag);
    });
}

function compareEntries(first: Entry, second: Entry, sort: SortOption) {
    if (sort === "az") {
        return first.title.localeCompare(second.title);
    }

    if (sort === "za") {
        return second.title.localeCompare(first.title);
    }

    const firstTime = new Date(first.createdAt).getTime();
    const secondTime = new Date(second.createdAt).getTime();

    if (sort === "oldest") {
        return firstTime - secondTime;
    }

    return secondTime - firstTime;
}

export function filterEntries(entries: Entry[], filters: EntryFilters) {
    const query = filters.query.trim().toLowerCase();

    const matched = entries.filter((entry) => {
        return matchesQuery(entry, query) && matchesTags(entry, filters.tags);
    });

    return matched.sort((first, second) => {
        return compareEntries(first, second, filters.sort);
    });
}

export type TagCount = {
    tag: string;
    count: number;
};

export function getTagCounts(entries: Entry[]) {
    const counts = new Map<string, number>();

    for (const entry of entries) {
        for (const tag of entry.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }

    const result: TagCount[] = [];

    for (const [tag, count] of counts) {
        result.push({ tag, count });
    }

    return result.sort((first, second) => {
        if (first.count !== second.count) {
            return second.count - first.count;
        }

        return first.tag.localeCompare(second.tag);
    });
}