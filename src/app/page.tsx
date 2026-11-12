// src/app/page.tsx
// DEBUG
"use client";

import { Stack } from "@mantine/core";
import { EntryGrid } from "@/components/entries/EntryGrid";
import { EntryToolbar } from "@/components/entries/EntryToolbar";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { filterEntries } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

export default function Home() {
    const { entries, isLoading, hasError } = useEntriesContext();
    const { filters } = useEntryFilters();
    const visibleEntries = filterEntries(entries, filters);

    return (
        <Stack gap="md">
            <EntryToolbar />
            <EntryGrid entries={visibleEntries} isLoading={isLoading} hasError={hasError} />
        </Stack>
    );
}