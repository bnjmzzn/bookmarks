// src/components/layout/SidebarLinks.tsx
"use client";

import Link from "next/link";
import { NavLink } from "@mantine/core";
import { IconBrandGithub, IconHome, IconInfoCircle } from "@tabler/icons-react";

export function SidebarLinks() {
    return (
        <>
            <NavLink
                component={Link}
                href="/"
                label="Home"
                leftSection={<IconHome size={18} stroke={1.75} />}
            />
            <NavLink
                // TODO: create the about page
                component={Link}
                href="/about"
                label="About"
                leftSection={<IconInfoCircle size={18} stroke={1.75} />}
            />
            <NavLink
                component="a"
                href="https://github.com/bnjmzzn/bookmarks"
                target="_blank"
                rel="noopener noreferrer"
                label="GitHub Repository"
                leftSection={<IconBrandGithub size={18} stroke={1.75} />}
            />
        </>
    );
}