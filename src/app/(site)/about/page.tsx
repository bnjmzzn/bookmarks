// src/app/(site)/about/page.tsx
import { Container, Divider, Stack } from "@mantine/core";
import { AboutSection } from "./_components/AboutSection";
import { PrivacySection } from "./_components/PrivacySection";

const REPO_URL = "https://github.com/bnjmzzn/bookmarks";

export default function AboutPage() {
    return (
        <Container size="sm" py="xl">
            <Stack gap="xl">
                <AboutSection repoUrl={REPO_URL} />
                <Divider />
                <PrivacySection repoUrl={REPO_URL} />
            </Stack>
        </Container>
    );
}