// src/components/entries/EntryDetail.tsx
"use client";

import { Anchor, Button, Card, Group, Stack, Text, Title, Typography } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaviconTile } from "@/components/common/FaviconTile";
import { TagBadge } from "@/components/common/TagBadge";
import { UrlConfirm } from "@/components/common/UrlConfirm";
import type { Entry } from "@/lib/client/types";
import { getHostname, sortTags } from "@/lib/client/utils";

const DESKTOP_TILE_SIZE = 128;
const DESKTOP_ICON_SIZE = 80;
const MOBILE_TILE_SIZE = 72;
const MOBILE_ICON_SIZE = 48;
const MOBILE_QUERY = "(max-width: 48em)";

type EntryDetailProps = {
    entry: Entry;
    onBack: () => void;
};

function getTileSizes(isMobile: boolean) {
    if (isMobile) {
        return { tileSize: MOBILE_TILE_SIZE, iconSize: MOBILE_ICON_SIZE };
    }

    return { tileSize: DESKTOP_TILE_SIZE, iconSize: DESKTOP_ICON_SIZE };
}

export function EntryDetail({ entry, onBack }: EntryDetailProps) {
    const isMobile = useMediaQuery(MOBILE_QUERY, false);
    const { tileSize, iconSize } = getTileSizes(Boolean(isMobile));
    const hostname = getHostname(entry.url);
    const createdLabel = new Date(entry.createdAt).toLocaleDateString();
    const updatedLabel = new Date(entry.editedAt).toLocaleDateString();
    const description = entry.description.replace(/\n/g, "  \n");

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
            <Card withBorder p={{ base: "md", sm: "lg" }} radius="md">
                <Stack gap="lg">
                    <Group wrap="wrap" align="flex-start" gap="lg">
                        <FaviconTile hostname={hostname} size={tileSize} iconSize={iconSize} />
                        <Stack gap="xs" style={{ flex: "1 1 240px", minWidth: 0 }}>
                            <Title
                                order={2}
                                fz={{ base: "h3", sm: "h2" }}
                                style={{ overflowWrap: "anywhere" }}
                            >
                                {entry.title}
                            </Title>
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
                            <Group gap="md" wrap="wrap">
                                <Text size="sm" c="dimmed" ff="monospace" fw={700}>
                                    Added {createdLabel}
                                </Text>
                                <Text size="sm" c="dimmed" ff="monospace" fw={700}>
                                    Edited {updatedLabel}
                                </Text>
                            </Group>
                            <Group gap={4} wrap="wrap">
                                {sortTags(entry.tags).map((tag) => {
                                    return <TagBadge key={tag} tag={tag} />;
                                })}
                            </Group>
                        </Stack>
                    </Group>
                    <UrlConfirm url={entry.url}>
                        {(visit) => (
                            <Button
                                w={{ base: "100%", sm: "auto" }}
                                leftSection={<IconExternalLink size={18} stroke={2} />}
                                onClick={visit}
                            >
                                Visit link
                            </Button>
                        )}
                    </UrlConfirm>
                    <Typography style={{ overflowWrap: "anywhere" }}>
                        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    );
}