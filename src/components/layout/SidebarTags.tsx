// src/components/layout/SidebarTags.tsx
"use client";

import { Loader, NavLink, Text } from "@mantine/core";
import { IconHash, IconTags } from "@tabler/icons-react";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { getTagCounts } from "@/lib/client/filterEntries";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

export function SidebarTags() {
    const { entries, isLoading } = useEntriesContext();
    const { selectTag } = useEntryFilters();
    const tagCounts = getTagCounts(entries);

    return (
        <NavLink
            label="Tags"
            leftSection={<IconTags size={20} stroke={2} />}
            rightSection={isLoading ? <Loader size={14} /> : undefined}
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
                        }}
                    />
                );
            })}
        </NavLink>
    );
}