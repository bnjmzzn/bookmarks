// src/components/common/StateMessage.tsx
"use client";

import type { ReactNode } from "react";
import { Stack, Text, ThemeIcon, Title } from "@mantine/core";

type StateMessageProps = {
    icon: ReactNode;
    title: string;
    description: string;
    color?: string;
    action?: ReactNode;
};

export function StateMessage({
    icon,
    title,
    description,
    color = "gray",
    action,
}: StateMessageProps) {
    return (
        <Stack align="center" gap="xs" maw={360} ta="center">
            {icon}
            <Title order={3} mt="md">
                {title}
            </Title>
            <Text c="dimmed" size="md">
                {description}
            </Text>
            {action}
        </Stack>
    );
}