// src/components/layout/Sidebar.tsx
"use client";

import { AppShell, ScrollArea } from "@mantine/core";
import { SidebarLinks } from "./SidebarLinks";
import { SidebarTags } from "./SidebarTags";

export function Sidebar() {
    return (
        <AppShell.Section grow component={ScrollArea} scrollbars="y" type="never">
            <SidebarLinks />
            <SidebarTags />
        </AppShell.Section>
    );
}