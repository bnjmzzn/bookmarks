// src/components/common/FaviconTile.tsx
"use client";

import { Box, Loader } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { getFaviconUrl } from "@/lib/client/utils";

type FaviconTileProps = {
    hostname: string;
    size: number;
    iconSize: number;
};

export function FaviconTile({ hostname, size, iconSize }: FaviconTileProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <Box
            style={{
                width: size,
                height: size,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: "var(--mantine-radius-md)",
                border: "1px solid var(--mantine-color-default-border)",
                backgroundColor: "var(--mantine-color-default)",
            }}
        >
            {hasError && <IconWorld size={iconSize / 2} stroke={1.5} />}
            {!hasError && !isLoaded && <Loader size="lg" style={{ position: "absolute" }} />}
            {!hasError && (
                <img
                    ref={imageRef}
                    src={getFaviconUrl(hostname)}
                    alt=""
                    width={iconSize}
                    height={iconSize}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 200ms ease",
                    }}
                />
            )}
        </Box>
    );
}