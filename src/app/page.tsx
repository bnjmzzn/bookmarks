// src/app/page.tsx
// DEBUG
"use client";

import { useEffect } from "react";
import { Stack } from "@mantine/core";
import { EntryDetail } from "@/components/entries/EntryDetail";
import { EntryGrid } from "@/components/entries/EntryGrid";
import { EntryToolbar } from "@/components/entries/EntryToolbar";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { filterEntries } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

export default function Home() {
    const { entries, isLoading, hasError } = useEntriesContext();
    const { filters, entryId, openEntry, closeEntry } = useEntryFilters();
    const visibleEntries = filterEntries(entries, filters);
    const selectedEntry = entries.find((entry) => {
        return entry.id === entryId;
    });
    const selectedId = selectedEntry?.id;

    useEffect(() => {
        if (selectedId === undefined) {
            return;
        }

        window.scrollTo({ top: 0 });
    }, [selectedId]);

    if (selectedEntry) {
        return <EntryDetail entry={selectedEntry} onBack={closeEntry} />;
    }

    return (
        <Stack gap="md">
            <EntryToolbar />
            <EntryGrid
                entries={visibleEntries}
                isLoading={isLoading}
                hasError={hasError}
                onOpen={openEntry}
            />
        </Stack>
    );
}