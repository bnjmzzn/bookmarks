// src/app/(site)/privacy/page.tsx
import type { Metadata } from "next";
import { Stack, Text, Title } from "@mantine/core";

export const metadata: Metadata = {
    title: "Privacy",
};

export default function PrivacyPage() {
    return (
        <Stack gap="md" maw={700}>
            <Title order={2}>Privacy</Title>
            <Text>// TODO: write privacy statement</Text>
        </Stack>
    );
}