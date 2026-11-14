// src/app/page.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { Stack } from "@mantine/core";
import { EntryDetail } from "@/components/entries/EntryDetail";
import { EntryGrid } from "@/components/entries/EntryGrid";
import { EntryToolbar } from "@/components/entries/EntryToolbar";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { filterEntries } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

export default function Home() {
    const { entries, isLoading, hasError, refetch } = useEntriesContext();
    const { filters, entryId, openEntry, closeEntry } = useEntryFilters();
    const visibleEntries = filterEntries(entries, filters);
    const selectedEntry = entries.find((entry) => {
        return entry.id === entryId;
    });
    const selectedId = selectedEntry?.id;

    const savedScrollY = useRef(0);
    const wasSelected = useRef(false);

    const handleOpen = (id: string) => {
        savedScrollY.current = window.scrollY;
        openEntry(id);
    };

    useLayoutEffect(() => {
        const isSelected = selectedId !== undefined;
        const wasPreviouslySelected = wasSelected.current;
        wasSelected.current = isSelected;

        if (isSelected) {
            window.scrollTo({ top: 0 });
            return;
        }

        if (!wasPreviouslySelected) {
            return;
        }

        window.scrollTo({ top: savedScrollY.current });
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
                onOpen={handleOpen}
                onRetry={refetch}
            />
        </Stack>
    );
}