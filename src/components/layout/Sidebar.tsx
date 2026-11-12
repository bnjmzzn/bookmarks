// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { NavLink, Stack } from "@mantine/core";

export function Sidebar() {
    return (
        <Stack gap="xs" justify="space-between" h="100%">
            <Stack gap="xs" />
            <Stack gap={0}>
                <NavLink component={Link} href="/privacy" label="Privacy" />
                <NavLink
                    component="a"
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    label="GitHub"
                />
            </Stack>
        </Stack>
    );
}