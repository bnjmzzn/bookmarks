// src/components/layout/SidebarTags.tsx
"use client";

import { Loader, NavLink, Text } from "@mantine/core";
import { IconAlertCircle, IconHash, IconTags } from "@tabler/icons-react";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { getTagCounts } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

interface SidebarTagsProps {
    onNavigate: () => void;
}

export function SidebarTags({ onNavigate }: SidebarTagsProps) {
    const { entries, isLoading, hasError } = useEntriesContext();
    const { selectTag } = useEntryFilters();
    const tagCounts = getTagCounts(entries);
    const hasNoTags = tagCounts.length === 0;

    if (isLoading) {
        return (
            <NavLink
                label="Tags"
                leftSection={<IconTags size={20} stroke={2} />}
                rightSection={<Loader size={14} />}
            />
        );
    }

    if (hasError) {
        return (
            <NavLink
                label="Tags"
                leftSection={<IconTags size={20} stroke={2} />}
                rightSection={<IconAlertCircle size={18} stroke={2} color="var(--mantine-color-red-6)" />}
            />
        );
    }

    if (hasNoTags) {
        return <NavLink label="Tags" leftSection={<IconTags size={20} stroke={2} />} />;
    }

    return (
        <NavLink
            label="Tags"
            leftSection={<IconTags size={20} stroke={2} />}
            childrenOffset={28}
        >
            {tagCounts.map((item) => {
                return (
                    <NavLink
                        key={item.tag}
                        label={item.tag}
                        leftSection={<IconHash size={18} stroke={2} />}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {item.count}
                            </Text>
                        }
                        onClick={() => {
                            selectTag(item.tag);
                            onNavigate();
                        }}
                    />
                );
            })}
        </NavLink>
    );
}