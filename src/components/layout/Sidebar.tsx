// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { Badge, NavLink, Skeleton, Stack } from "@mantine/core";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { getTagCounts } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

const skeletonKeys = ["1", "2", "3"];

export function Sidebar() {
    const { entries, isLoading } = useEntriesContext();
    const { selectTag } = useEntryFilters();
    const tagCounts = getTagCounts(entries);

    return (
        <Stack gap="xs" justify="space-between" h="100%">
            <Stack gap={0}>
                {isLoading &&
                    skeletonKeys.map((key) => {
                        return <Skeleton key={key} height={28} mb="xs" />;
                    })}
                {!isLoading &&
                    tagCounts.map((item) => {
                        return (
                            <NavLink
                                key={item.tag}
                                label={item.tag}
                                rightSection={<Badge variant="light">{item.count}</Badge>}
                                onClick={() => {
                                    selectTag(item.tag);
                                }}
                            />
                        );
                    })}
            </Stack>
            <Stack gap={0}>
                <NavLink component={Link} href="/privacy" label="Privacy" />
                <NavLink
                    // TODO: add gh profile
                    component="a"
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    label="GitHub"
                />
            </Stack>
        </Stack>
    );
}