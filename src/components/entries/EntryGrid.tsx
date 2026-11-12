// src/components/entries/EntryGrid.tsx
"use client";

import { SimpleGrid } from "@mantine/core";
import type { Entry } from "@/lib/client/types";
import { EntryCard } from "./EntryCard";
import { EntryCardSkeleton } from "./EntryCardSkeleton";

type EntryGridProps = {
    entries: Entry[];
    isLoading: boolean;
    hasError: boolean;
};

const skeletonKeys = ["1", "2", "3", "4", "5", "6"];

export function EntryGrid({ entries, isLoading, hasError }: EntryGridProps) {
    if (hasError) {
        return null;
    }

    if (isLoading) {
        return (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {skeletonKeys.map((key) => {
                    return <EntryCardSkeleton key={key} />;
                })}
            </SimpleGrid>
        );
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
            {entries.map((entry) => {
                return <EntryCard key={entry.id} entry={entry} />;
            })}
        </SimpleGrid>
    );
}