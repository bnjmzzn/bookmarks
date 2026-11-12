// src/app/not-found.tsx
"use client"

import Link from "next/link";
import { Button, Stack, Text, Title } from "@mantine/core";

export default function NotFound() {
    return (
        <Stack align="center" gap="sm" py="xl">
            <Title order={2}>Page not found</Title>
            <Text c="dimmed">The page you are looking for does not exist.</Text>
            <Button component={Link} href="/" variant="default">
                Back to home
            </Button>
        </Stack>
    );
}