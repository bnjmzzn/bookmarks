// src/components/layout/AppLayout.tsx
"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EntriesProvider } from "@/lib/client/EntriesContext";
import { HeaderBar } from "./HeaderBar";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
    children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <EntriesProvider>
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
                    <Suspense fallback={null}>
                        <HeaderBar opened={opened} onToggle={toggle} />
                    </Suspense>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <Suspense fallback={null}>
                        <Sidebar onNavigate={close} />
                    </Suspense>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Suspense fallback={null}>{children}</Suspense>
                </AppShell.Main>
            </AppShell>
        </EntriesProvider>
    );
}