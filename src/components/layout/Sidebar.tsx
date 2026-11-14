// src/components/layout/Sidebar.tsx
"use client";

import { AppShell, ScrollArea } from "@mantine/core";
import { SidebarLinks } from "./SidebarLinks";
import { SidebarTags } from "./SidebarTags";

interface SidebarProps {
    onNavigate: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
    return (
        <AppShell.Section grow component={ScrollArea} scrollbars="y" type="never">
            <SidebarLinks onNavigate={onNavigate} />
            <SidebarTags onNavigate={onNavigate} />
        </AppShell.Section>
    );
}