// src/app/layout.tsx
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppLayout } from "@/components/layout/AppLayout";
import { theme } from "@/lib/client/theme";


const siteConfig = {
    name: "Bnjmzzn's Bookmarks",
    description: "A curated list of websites.",
    image: {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bnjmzzn's Bookmarks",
    },
};

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: "/",
        siteName: siteConfig.name,
        type: "website",
        images: [siteConfig.image],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.image.url],
    },
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