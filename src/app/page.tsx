// src/app/page.tsx
// DEBUG
"use client";

import { EntryGrid } from "@/components/entries/EntryGrid";
import { filterEntries } from "@/lib/client/filterEntries";
import { useEntries } from "@/lib/client/hooks/useEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

export default function Home() {
    const { entries, isLoading, hasError } = useEntries();
    const { filters } = useEntryFilters();
    const visibleEntries = filterEntries(entries, filters);

    return <EntryGrid entries={visibleEntries} isLoading={isLoading} hasError={hasError} />;
}