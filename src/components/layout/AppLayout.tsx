// src/components/layout/AppLayout.tsx
"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderBar } from "./HeaderBar";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
    children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 260,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderBar opened={opened} onToggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Suspense fallback={null}>{children}</Suspense>
            </AppShell.Main>
        </AppShell>
    );
}