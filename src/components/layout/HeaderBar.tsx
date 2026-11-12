// src/components/layout/HeaderBar.tsx
"use client";

import { Burger, Button, Group } from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

type HeaderBarProps = {
    opened: boolean;
    onToggle: () => void;
};

export function HeaderBar({ opened, onToggle }: HeaderBarProps) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const handleToggleTheme = () => {
        const nextScheme = computedColorScheme === "light" ? "dark" : "light";
        setColorScheme(nextScheme);
    };

    return (
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="sm" />
            </Group>
            <Button variant="default" size="xs" onClick={handleToggleTheme}>
                Toggle theme
            </Button>
        </Group>
    );
}