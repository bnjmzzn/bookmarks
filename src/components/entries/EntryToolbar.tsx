// src/components/entries/EntryToolbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { getTagCounts, isSortOption } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";
import { IconArrowsSort, IconFilterOff, IconSearch, IconTags } from "@tabler/icons-react";

const SEARCH_MAX_LENGTH = 100;
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
        <Group gap="sm" wrap="wrap" align="center">
            <TextInput
                aria-label="Search"
                placeholder="Search entries"
                value={keyword}
                onChange={handleKeywordChange}
                leftSection={<IconSearch size={18} stroke={2} />}
                maxLength={SEARCH_MAX_LENGTH}
                radius="md"
                size="md"
                style={{ flex: "2 1 0", minWidth: 220 }}
            />
            <MultiSelect
                aria-label="Tags"
                placeholder={hasTags ? "" : "Filter by tags"}
                data={tagOptions}
                value={filters.tags}
                onChange={setTags}
                leftSection={<IconTags size={18} stroke={2} />}
                searchable
                clearable
                hidePickedOptions
                radius="md"
                size="md"
                style={{ flex: "2 1 0", minWidth: 220 }}
                styles={{
                    input: {
                        height: 42,
                        minHeight: 42,
                        overflow: "hidden",
                    },
                    pillsList: {
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                    },
                }}
            />
            <Select
                aria-label="Sort"
                data={sortData}
                value={filters.sort}
                onChange={handleSortChange}
                leftSection={<IconArrowsSort size={18} stroke={2} />}
                allowDeselect={false}
                radius="md"
                size="md"
                style={{ flex: "0 0 160px" }}
            />
            <Button
                variant="filled"
                color="red"
                size="md"
                radius="md"
                onClick={clearAll}
                disabled={!hasActiveFilters}
                leftSection={<IconFilterOff size={18} stroke={2} />}
                style={{ flex: "0 0 auto" }}
            >
                Clear
            </Button>
        </Group>
    );
}