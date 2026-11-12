// src/components/entries/EntryCard.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, Group, Image, Loader, Stack, Text, UnstyledButton } from "@mantine/core";
import { useHover, useMediaQuery, useReducedMotion } from "@mantine/hooks";
import { IconWorld } from "@tabler/icons-react";
import { TagBadge, TagOverflowBadge } from "@/components/common/TagBadge";
import { getEntrySummary, getFaviconUrl, getHostname, sortTags } from "@/lib/client/utils";
import type { Entry } from "@/lib/client/types";


type EntryCardProps = {
    entry: Entry;
    onOpen: (id: string) => void;
};

const MAX_TAGS = 2;
const MAX_TAGS_COMPACT = 1;
const COMPACT_QUERY = "(max-width: 480px)";
const TILE_SIZE = 88;
const ICON_SIZE = 56;
const HOVER_TRANSITION = "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease";
const PRESS_TRANSITION = "transform 80ms ease";
const ICON_TRANSITION = "transform 200ms ease, opacity 200ms ease";

export function EntryCard({ entry, onOpen }: EntryCardProps) {
    const { hovered, ref } = useHover<HTMLButtonElement>();
    const [isPressed, setIsPressed] = useState(false);
    const [hasIconError, setHasIconError] = useState(false);
    const isReducedMotion = useReducedMotion();

    const hostname = getHostname(entry.url);
    const summary = getEntrySummary(entry.description);

    const isCompact = useMediaQuery(COMPACT_QUERY);
    const maxTags = isCompact ? MAX_TAGS_COMPACT : MAX_TAGS;
    const sortedTags = sortTags(entry.tags);
    const visibleTags = sortedTags.slice(0, maxTags);
    const hiddenTagCount = sortedTags.length - visibleTags.length;
    const hasHiddenTags = hiddenTagCount > 0;

    const isLifted = hovered && !isReducedMotion;
    const isScaledDown = isPressed && !isReducedMotion;

    let cardTransform = "none";
    if (isScaledDown) {
        cardTransform = "scale(0.98)";
    } else if (isLifted) {
        cardTransform = "translateY(-4px)";
    }

    const iconTransform = isLifted ? "scale(1.08)" : "none";
    const borderColor = hovered ? "var(--mantine-primary-color-filled)" : undefined;
    const boxShadow = hovered ? "var(--mantine-shadow-md)" : "none";
    const transition = isPressed ? PRESS_TRANSITION : HOVER_TRANSITION;

    const handleClick = () => {
        onOpen(entry.id);
    };

    const handlePressStart = () => {
        setIsPressed(true);
    };

    const handlePressEnd = () => {
        setIsPressed(false);
    };

    const handleIconError = () => {
        setHasIconError(true);
    };

    // loader for favicons
    const imageRef = useRef<HTMLImageElement>(null);
    const [isIconLoaded, setIsIconLoaded] = useState(false);

    useEffect(() => {
        const image = imageRef.current;
        if (!image) {
            return;
        }
        const isAlreadyLoaded = image.complete && image.naturalWidth > 0;
        if (isAlreadyLoaded) {
            setIsIconLoaded(true);
        }
    }, []);

    const handleIconLoad = () => {
        setIsIconLoaded(true);
    };

    const isIconLoading = !isIconLoaded && !hasIconError;

    return (
        <UnstyledButton
            ref={ref}
            display="block"
            w="100%"
            h="100%"
            style={{ borderRadius: "var(--mantine-radius-md)" }}
            onClick={handleClick}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
        >
            <Card
                withBorder
                radius="md"
                padding="sm"
                h="100%"
                style={{ transform: cardTransform, borderColor, boxShadow, transition }}
            >
                <Group wrap="nowrap" align="center" gap="md">
                <Box
                    w={TILE_SIZE}
                    h={TILE_SIZE}
                    style={{
                        position: "relative",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "var(--mantine-radius-md)",
                        background: "var(--mantine-color-default-hover)",
                        border: "1px solid var(--mantine-color-default-border)",
                    }}
                >
                    {isIconLoading && <Loader size={40} style={{ position: "absolute" }} />}
                    {hasIconError ? (
                        <IconWorld size={32} stroke={1.5} />
                    ) : (
                        <Image
                            ref={imageRef}
                            src={getFaviconUrl(hostname)}
                            alt=""
                            w={ICON_SIZE}
                            h={ICON_SIZE}
                            fit="contain"
                            onLoad={handleIconLoad}
                            onError={handleIconError}
                            style={{
                                opacity: isIconLoaded ? 1 : 0,
                                transform: iconTransform,
                                transition: ICON_TRANSITION,
                            }}
                        />
                    )}
                </Box>
                    <Stack gap={6} miw={0} style={{ flex: 1 }}>
                        <Text fw={600} lineClamp={1} mih="1.55em">
                            {entry.title}
                        </Text>
                        <Text size="sm" c="dimmed" lineClamp={2} mih="3.1em">
                            {summary}
                        </Text>
                        <Group gap={4} wrap="nowrap" h={26} style={{ overflow: "hidden" }}>
                            {visibleTags.map((tag) => {
                                return <TagBadge key={tag} tag={tag} />;
                            })}
                            {hasHiddenTags && <TagOverflowBadge count={hiddenTagCount} />}
                        </Group>
                    </Stack>
                </Group>
            </Card>
        </UnstyledButton>
    );
}