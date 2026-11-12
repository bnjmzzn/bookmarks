// src/components/layout/HeaderBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Anchor,
    Breadcrumbs,
    Burger,
    Button,
    Group,
    Text,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
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
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

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

    const handleToggleTheme = () => {
        const nextScheme = computedColorScheme === "light" ? "dark" : "light";
        setColorScheme(nextScheme);
    };

    return (
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
            <Group wrap="nowrap">
                <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="sm" />
                <Breadcrumbs>
                    {crumbs.map((crumb) => {
                        if (crumb.href === null) {
                            return (
                                <Text key={crumb.label} size="sm" lineClamp={1}>
                                    {crumb.label}
                                </Text>
                            );
                        }

                        return (
                            <Anchor key={crumb.label} component={Link} href={crumb.href} size="sm">
                                {crumb.label}
                            </Anchor>
                        );
                    })}
                </Breadcrumbs>
            </Group>
            <Button variant="default" size="xs" onClick={handleToggleTheme}>
                Toggle theme
            </Button>
        </Group>
    );
}