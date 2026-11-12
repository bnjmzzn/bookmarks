// src/components/entries/EntryDetail.tsx
"use client";

import { Anchor, Button, Card, Group, Stack, Text, Title, Typography } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaviconTile } from "@/components/common/FaviconTile";
import { TagBadge } from "@/components/common/TagBadge";
import type { Entry } from "@/lib/client/types";
import { getHostname, sortTags } from "@/lib/client/utils";
import { UrlConfirm } from "@/components/common/UrlConfirm";

const TILE_SIZE = 128;
const ICON_SIZE = 80;

type EntryDetailProps = {
    entry: Entry;
    onBack: () => void;
};

export function EntryDetail({ entry, onBack }: EntryDetailProps) {
    const [isModalOpen, { open, close }] = useDisclosure(false);
    const hostname = getHostname(entry.url);
    const createdLabel = new Date(entry.createdAt).toLocaleDateString();
    const updatedLabel = new Date(entry.editedAt).toLocaleDateString();

    return (
        <Stack gap="md">
            <Group>
                <Button
                    variant="subtle"
                    color="gray"
                    size="md"
                    leftSection={<IconArrowLeft size={20} stroke={2} />}
                    onClick={onBack}
                >
                    Back
                </Button>
            </Group>
            <Card withBorder padding="lg" radius="md">
                <Stack gap="lg">
                    <Group wrap="nowrap" align="center" gap="lg">
                        <FaviconTile hostname={hostname} size={TILE_SIZE} iconSize={ICON_SIZE} />
                        <Stack gap="xs" style={{ minWidth: 0 }}>
                            <Title order={2}>{entry.title}</Title>
                            <UrlConfirm url={entry.url}>
                                {(visit) => (
                                    <Anchor
                                        component="button"
                                        type="button"
                                        size="sm"
                                        ff="monospace"
                                        underline="always"
                                        onClick={visit}
                                        style={{ textAlign: "left", overflowWrap: "anywhere" }}
                                    >
                                        {entry.url}
                                    </Anchor>
                                )}
                            </UrlConfirm>
                            <Text size="sm" c="dimmed" ff="monospace" fw={700}>
                                Added {createdLabel} | Edited {updatedLabel}
                            </Text>
                            <Group gap={4}>
                                {sortTags(entry.tags).map((tag) => {
                                    return <TagBadge key={tag} tag={tag} />;
                                })}
                            </Group>
                        </Stack>
                    </Group>
                    <Group>
                        <UrlConfirm url={entry.url}>
                        {(visit) => (
                            <Button
                                leftSection={<IconExternalLink size={18} stroke={2} />}
                                onClick={visit}
                            >
                                Visit link
                            </Button>
                        )}
                        </UrlConfirm>
                    </Group>
                    <Typography>
                        <Markdown remarkPlugins={[remarkGfm]}>{entry.description}</Markdown>
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    );
}