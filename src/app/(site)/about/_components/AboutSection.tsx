// src/app/(site)/about/_components/AboutSection.tsx
"use client"

import { Anchor, Code, List, ListItem, Stack, Text, Title } from "@mantine/core";
import { UrlConfirm } from "@/components/common/UrlConfirm";

type AboutSectionProps = {
    repoUrl: string;
};

export function AboutSection({ repoUrl }: AboutSectionProps) {
    return (
        <Stack gap="xl">
            <Title order={2}>About</Title>

            <Stack gap="xs">
                <Title order={3}>What this is</Title>
                <Text>
                    This site is a curated list of useful websites. It is not a
                    browser bookmark manager, just a plain list of links that
                    anyone can browse. Each entry has tags, so the list can be
                    filtered by what a site is for.
                </Text>
                <Text>
                    From a developer perspective, it exists to learn Mantine UI, Neon database, ORMs like Drizzle, and to generally practice full stack design.
                </Text>
                <Text>
                    The list is also available as a public API for anyone who
                    wants to fetch it and use it elsewhere. (More info on the Github Repository)
                </Text>
            </Stack>



            <Stack gap="xs">
                <Title order={3}>What to expect</Title>
                <Text>
                    Every entry meets a set of standards. At the moment, these
                    are the minimum:
                </Text>
                <List spacing="xs">
                    <ListItem>Only websites are listed. Not installable apps, APKs, etc. </ListItem>
                    <ListItem>
                        Free to use, or free to get started with.
                    </ListItem>
                    <ListItem>
                        No sign up needed to start. Sites that offer optional
                        sign ups are still allowed.
                    </ListItem>
                </List>
                <Text>
                    More standards may be added over time, so this list is the
                    floor, not the ceiling.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Maintenance and suggestions</Title>
                <Text>
                    This site is run and maintained by a single person. It may
                    go down or break, whether from free tier limits on the
                    backend or for other reasons. An effort is made to keep it
                    running, but there are no promises.
                </Text>
                <Text>
                    The project does not accept suggestions. The maintainer adds a site at their own discretion.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Source and tech</Title>
                <Text>
                    This project is open source:{" "}
                    <UrlConfirm url={repoUrl}>
                        {(visit) => (
                            <Anchor component="button" type="button" fz="inherit" onClick={visit}>
                                {repoUrl}
                            </Anchor>
                        )}
                    </UrlConfirm>
                </Text>
                <Text>
                    It is built with Next.js and Mantine UI, hosted on Vercel,
                    with Neon database accessed through Drizzle, and JSend
                    formatted API responses.
                </Text>
            </Stack>
        </Stack>
    );
}   