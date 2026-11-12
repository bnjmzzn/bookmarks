// src/lib/client/utils.ts
const FAVICON_API = "https://favicondl.com/api/favicon";
const FAVICON_SIZE = 128;

export function getHostname(url: string): string {
    return new URL(url).hostname.replace(/^www\./, "");
}

export function getFaviconUrl(hostname: string): string {
    return `${FAVICON_API}?url=${encodeURIComponent(hostname)}&size=${FAVICON_SIZE}&format=redirect`;
}

export function getEntrySummary(description: string): string {
    const [firstLine] = description.trim().split("\n");
    return firstLine?.trim() ?? "";
}

export function sortTags(tags: string[]): string[] {
    return [...tags].sort((first, second) => {
        return first.localeCompare(second);
    });
}