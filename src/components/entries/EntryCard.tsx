// src/components/entries/EntryCard.tsx
"use client";

import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import type { Entry } from "@/lib/client/types";

type EntryCardProps = {
    entry: Entry;
};

export function EntryCard({ entry }: EntryCardProps) {
    const hostname = new URL(entry.url).hostname;

    return (
        <Card withBorder padding="md" h="100%">
            <Stack gap="xs" h="100%">
                <Text fw={600} lineClamp={2}>
                    {entry.title}
                </Text>
                <Text size="xs" c="dimmed">
                    {hostname}
                </Text>
                <Text size="sm" lineClamp={3}>
                    {entry.description}
                </Text>
                <Group gap={4} mt="auto">
                    {entry.tags.map((tag) => {
                        return (
                            <Badge key={tag} variant="light" size="sm">
                                {tag}
                            </Badge>
                        );
                    })}
                </Group>
            </Stack>
        </Card>
    );
}