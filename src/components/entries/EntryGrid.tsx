// src/components/entries/EntryGrid.tsx
"use client";

import { Center, SimpleGrid } from "@mantine/core";
import type { Entry } from "@/lib/client/types";
import { EntryCard } from "./EntryCard";
import { EntryCardSkeleton } from "./EntryCardSkeleton";
import { EntryEmpty } from "./EntryEmpty";
import { EntryError } from "./EntryError";

type EntryGridProps = {
    entries: Entry[];
    isLoading: boolean;
    hasError: boolean;
    onOpen: (id: string) => void;
    onRetry: () => void;
};

const skeletonKeys = ["1", "2", "3", "4", "5", "6"];
const STATE_MIN_HEIGHT = 320;

export function EntryGrid({ entries, isLoading, hasError, onOpen, onRetry }: EntryGridProps) {
    if (hasError) {
        return (
            <Center mih={STATE_MIN_HEIGHT}>
                <EntryError onRetry={onRetry} />
            </Center>
        );
    }

    if (isLoading) {
        return (
            <SimpleGrid cols={{ base: 1, lg: 2, xl: 3 }}>
                {skeletonKeys.map((key) => {
                    return <EntryCardSkeleton key={key} />;
                })}
            </SimpleGrid>
        );
    }

    const hasNoEntries = entries.length === 0;

    if (hasNoEntries) {
        return (
            <Center mih={STATE_MIN_HEIGHT}>
                <EntryEmpty />
            </Center>
        );
    }

    return (
        <SimpleGrid cols={{ base: 1, lg: 2, xl: 3 }}>
            {entries.map((entry) => {
                return <EntryCard key={entry.id} entry={entry} onOpen={onOpen} />;
            })}
        </SimpleGrid>
    );
}