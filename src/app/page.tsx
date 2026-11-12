// src/app/page.tsx
// DEBUG
"use client";

import { EntryGrid } from "@/components/entries/EntryGrid";
import { useEntries } from "@/lib/client/hooks/useEntries";

export default function Home() {
    const { entries, isLoading, hasError } = useEntries();

    return <EntryGrid entries={entries} isLoading={isLoading} hasError={hasError} />;
}