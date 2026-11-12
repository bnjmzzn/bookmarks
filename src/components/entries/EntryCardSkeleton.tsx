// src/components/entries/EntryCardSkeleton.tsx
"use client";

import { Card, Skeleton, Stack } from "@mantine/core";

export function EntryCardSkeleton() {
    return (
        <Card withBorder padding="md">
            <Stack gap="xs">
                <Skeleton height={20} width="70%" />
                <Skeleton height={12} width="40%" />
                <Skeleton height={14} />
                <Skeleton height={14} width="90%" />
                <Skeleton height={20} width="50%" />
            </Stack>
        </Card>
    );
}