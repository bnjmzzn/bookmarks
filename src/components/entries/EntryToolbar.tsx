// src/components/entries/EntryToolbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { getTagCounts, isSortOption } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

const sortData = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "az", label: "A to Z" },
    { value: "za", label: "Z to A" },
];

export function EntryToolbar() {
    const { entries } = useEntriesContext();
    const { filters, setQuery, setSort, setTags, clearAll } = useEntryFilters();
    const [keyword, setKeyword] = useState(filters.query);
    const lastSentQuery = useRef(filters.query);

    const tagCounts = getTagCounts(entries);
    const tagOptions = tagCounts.map((item) => {
        return item.tag;
    });

    const hasQuery = filters.query !== "";
    const hasTags = filters.tags.length > 0;
    const hasCustomSort = filters.sort !== "newest";
    const hasActiveFilters = hasQuery || hasTags || hasCustomSort;

    const sendQuery = useDebouncedCallback((value: string) => {
        lastSentQuery.current = value;
        setQuery(value);
    }, 200);

    useEffect(() => {
        if (filters.query === lastSentQuery.current) {
            return;
        }

        lastSentQuery.current = filters.query;
        setKeyword(filters.query);
    }, [filters.query]);

    const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setKeyword(value);
        sendQuery(value);
    };

    const handleSortChange = (value: string | null) => {
        if (!isSortOption(value)) {
            return;
        }

        setSort(value);
    };

    return (
        <Group align="flex-end" wrap="wrap">
            <TextInput
                label="Search"
                placeholder="Keyword"
                value={keyword}
                onChange={handleKeywordChange}
                style={{ flex: 1, minWidth: 180 }}
            />
            <MultiSelect
                label="Tags"
                placeholder="Filter by tags"
                data={tagOptions}
                value={filters.tags}
                onChange={setTags}
                searchable
                style={{ flex: 1, minWidth: 180 }}
            />
            <Select
                label="Sort"
                data={sortData}
                value={filters.sort}
                onChange={handleSortChange}
                allowDeselect={false}
                w={140}
            />
            <Button variant="default" onClick={clearAll} disabled={!hasActiveFilters}>
                Clear all
            </Button>
        </Group>
    );
}