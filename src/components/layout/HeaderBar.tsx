// src/components/layout/HeaderBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ActionIcon,
    Anchor,
    Box,
    Breadcrumbs,
    Burger,
    Group,
    Text,
    useMantineColorScheme,
} from "@mantine/core";
import { IconChevronRight, IconMoon, IconSun } from "@tabler/icons-react";
import { useEntriesContext } from "@/lib/client/EntriesContext";
import { useEntryFilters } from "@/lib/client/hooks/useEntryFilters";

type HeaderBarProps = {
    opened: boolean;
    onToggle: () => void;
};

type Crumb = {
    label: string;
    href: string | null;
};

export function HeaderBar({ opened, onToggle }: HeaderBarProps) {
    const pathname = usePathname();
    const { entries } = useEntriesContext();
    const { entryId } = useEntryFilters();
    const { toggleColorScheme } = useMantineColorScheme();

    const selectedEntry = entries.find((entry) => {
        return entry.id === entryId;
    });

    const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

    if (pathname === "/privacy") {
        crumbs.push({ label: "Privacy", href: null });
    }

    if (pathname === "/" && selectedEntry) {
        crumbs.push({ label: selectedEntry.title, href: null });
    }

    if (crumbs.length === 1) {
        crumbs[0] = { label: "Home", href: null };
    }

    return (
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
            <Group wrap="nowrap" gap="md">
                <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="md" />
                <Breadcrumbs
                    separator={<IconChevronRight size={16} stroke={1.5} />}
                    separatorMargin="xs"
                >
                    {crumbs.map((crumb) => {
                        if (crumb.href === null) {
                            return (
                                <Text key={crumb.label} size="lg" fw={600} lh={1.6} lineClamp={1}>
                                    {crumb.label}
                                </Text>
                            );
                        }

                        return (
                            <Anchor
                                key={crumb.label}
                                component={Link}
                                href={crumb.href}
                                size="lg"
                                fw={500}
                                lh={1.6}
                                c="dimmed"
                                underline="never"
                            >
                                {crumb.label}
                            </Anchor>
                        );
                    })}
                </Breadcrumbs>
            </Group>
            <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="md"
                onClick={toggleColorScheme}
                aria-label="Toggle color scheme"
            >
                <Box component="span" lightHidden>
                    <IconSun size={22} stroke={1.5} />
                </Box>
                <Box component="span" darkHidden>
                    <IconMoon size={22} stroke={1.5} />
                </Box>
            </ActionIcon>
        </Group>
    );
}