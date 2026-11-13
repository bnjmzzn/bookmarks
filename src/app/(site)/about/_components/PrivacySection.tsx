// src/app/(site)/about/_components/PrivacySection.tsx
"use client";

import { Anchor, List, ListItem, Stack, Text, Title } from "@mantine/core";
import { UrlConfirm } from "@/components/common/UrlConfirm";

const LAST_UPDATED = "2026-11-13";

type PrivacySectionProps = {
    repoUrl: string;
};

export function PrivacySection({ repoUrl }: PrivacySectionProps) {
    return (
        <Stack gap="xl">
            <Title order={2}>Privacy</Title>

            <Text c="dimmed">
                Last updated: {LAST_UPDATED} | This policy may change over time
            </Text>

            <Stack gap="xs">
                <Title order={3}>The short version</Title>
                <Text>
                    There is no login, no account, and no tracking of your own
                    on this site. Everything on it is free to use. The site
                    itself does not collect personal information from visitors.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>What is stored</Title>
                <Text>
                    The database only holds the list itself, meaning the
                    websites and their tags. No visitor data or analytics is stored.
                </Text>
                <Text>
                    Your browser stores your light or dark color
                    scheme choice, using local storage. It stays on your device
                    and is only used to remember your preference.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Third party services</Title>
                <Text>
                    The site relies on a few services that have their own
                    policies, and what they do is outside the scope of this
                    project.
                </Text>
                <List spacing="xs">
                    <ListItem>
                        Hosting is provided by Vercel. Vercel may collect
                        technical data about requests, such as through its
                        default analytics, and it handles rate limiting for the
                        site. See{" "}
                        <UrlConfirm url="https://vercel.com/legal/privacy-policy">
                            {(visit) => (
                                <Anchor component="button" type="button" fz="inherit" onClick={visit}>
                                    Vercel's privacy policy
                                </Anchor>
                            )}
                        </UrlConfirm>
                        .
                    </ListItem>
                    <ListItem>
                        The database is hosted on Neon, and it only contains the
                        list entries.
                    </ListItem>
                    <ListItem>
                        Website icons are loaded from a favicon service, favicondl.com, which
                        may receive requests when icons are displayed. It may in turn use other
                        icon services such as Google or DuckDuckGo. See{" "}
                        <UrlConfirm url="https://favicondl.com/privacy.html">
                            {(visit) => (
                                <Anchor component="button" type="button" fz="inherit" onClick={visit}>
                                    favicondl's privacy policy
                                </Anchor>
                            )}
                        </UrlConfirm>
                        .
                    </ListItem>
                </List>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Linked websites</Title>
                <Text>
                    Every entry links to a website that this project does not
                    own or control. Once you visit one, its own privacy policy
                    applies, not this one.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Credits and removal requests</Title>
                <Text>
                    Entries are curated by the maintainer. If someone's
                    recommendation led to an entry, they may be credited by name
                    with their consent. No suggester information is stored
                    beyond that credit.
                </Text>
                <Text>
                    A credited person can contact the maintainer at any time to
                    have their name removed. Credits are not a way to remove an
                    entry, since the list is curated by the maintainer. The
                    exception is the owner of a listed website, who can reach
                    out to request its removal.
                </Text>
            </Stack>

            <Stack gap="xs">
                <Title order={3}>Contact</Title>
                <Text>
                    For privacy concerns, name removals, or site owner
                    requests, open an issue on GitHub:{" "}
                    <UrlConfirm url={repoUrl}>
                        {(visit) => (
                            <Anchor component="button" type="button" fz="inherit" onClick={visit}>
                                {repoUrl}
                            </Anchor>
                        )}
                    </UrlConfirm>
                </Text>
            </Stack>
        </Stack>
    );
}