// src/components/layout/SidebarLinks.tsx
"use client";

import Link from "next/link";
import { NavLink } from "@mantine/core";
import { IconBrandGithub, IconHome, IconInfoCircle } from "@tabler/icons-react";
import { UrlConfirm } from "@/components/common/UrlConfirm";

interface SidebarLinksProps {
    onNavigate: () => void;
}

export function SidebarLinks({ onNavigate }: SidebarLinksProps) {
    return (
        <>
            <NavLink
                component={Link}
                href="/"
                label="Home"
                leftSection={<IconHome size={18} stroke={1.75} />}
                onClick={onNavigate}
            />
            <NavLink
                component={Link}
                href="/about"
                label="About"
                leftSection={<IconInfoCircle size={18} stroke={1.75} />}
                onClick={onNavigate}
            />
            <UrlConfirm url={"https://github.com/bnjmzzn/bookmarks"}>
                {(visit) => (
                    <NavLink
                        label="GitHub Repository"
                        leftSection={<IconBrandGithub size={18} stroke={1.75} />}
                        onClick={() => {
                            visit();
                            onNavigate();
                        }}
                    />
                )}
            </UrlConfirm>
        </>
    );
}