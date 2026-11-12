// src/components/entries/EntryCardSkeleton.tsx
"use client";

import { Box, Card, Group, Skeleton, Stack } from "@mantine/core";

const TILE_SIZE = 88;
const TAG_COUNT = 3;
const tagKeys = Array.from({ length: TAG_COUNT }, (_, index) => {
    return String(index);
});

export function EntryCardSkeleton() {
    return (
        <Card withBorder radius="md" padding="sm" h="100%">
            <Group wrap="nowrap" align="center" gap="md">
                <Skeleton w={TILE_SIZE} h={TILE_SIZE} radius="md" style={{ flexShrink: 0 }} />
                <Stack gap={6} miw={0} style={{ flex: 1 }}>
                    <Box h={25}>
                        <Skeleton height={17} mt={4} width="65%" />
                    </Box>
                    <Stack gap={8} h={43}>
                        <Skeleton height={13} />
                        <Skeleton height={13} width="85%" />
                    </Stack>
                    <Group gap={4} wrap="nowrap" h={26}>
                        {tagKeys.map((key) => {
                            return <Skeleton key={key} height={26} width={72} radius="sm" />;
                        })}
                    </Group>
                </Stack>
            </Group>
        </Card>
    );
}