// src/components/entries/EntryDetail.tsx
"use client";

import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Entry } from "@/lib/client/types";
import { UrlConfirmModal } from "./UrlConfirmModal";

type EntryDetailProps = {
    entry: Entry;
    onBack: () => void;
};

export function EntryDetail({ entry, onBack }: EntryDetailProps) {
    const [isModalOpen, { open, close }] = useDisclosure(false);
    const hostname = new URL(entry.url).hostname;
    const createdLabel = new Date(entry.createdAt).toLocaleDateString();

    return (
        <Stack gap="md">
            <Group>
                <Button variant="default" size="xs" onClick={onBack}>
                    Back
                </Button>
            </Group>
            <Card withBorder padding="lg">
                <Stack gap="sm">
                    <Title order={2}>{entry.title}</Title>
                    <Text size="sm" c="dimmed">
                        {hostname} · Added {createdLabel}
                    </Text>
                    <Text>{entry.description}</Text>
                    <Group gap={4}>
                        {entry.tags.map((tag) => {
                            return (
                                <Badge key={tag} variant="light">
                                    {tag}
                                </Badge>
                            );
                        })}
                    </Group>
                    <Group>
                        <Button onClick={open}>Visit link</Button>
                    </Group>
                </Stack>
            </Card>
            <UrlConfirmModal opened={isModalOpen} url={entry.url} onClose={close} />
        </Stack>
    );
}