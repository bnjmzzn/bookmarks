// src/app/layout.tsx
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppLayout } from "@/components/layout/AppLayout";
import { theme } from "@/lib/client/theme";

export const metadata: Metadata = {
    title: "Bookmarks",
    description: "Bookmarks",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <Notifications />
                    <AppLayout>{children}</AppLayout>
                </MantineProvider>
            </body>
        </html>
    );
}