// src/components/entries/EntryError.tsx
"use client";

import { Button } from "@mantine/core";
import { IconCloudOff, IconRefresh } from "@tabler/icons-react";
import { StateMessage } from "@/components/common/StateMessage";

type EntryErrorProps = {
    onRetry: () => void;
};

export function EntryError({ onRetry }: EntryErrorProps) {
    return (
        <StateMessage
            icon={<IconCloudOff size={40} stroke={1.5} />}
            color="red"
            title="Could not load entries"
            description="Check your connection and try again."
            action={
                <Button
                    variant="filled"
                    color="red"
                    mt="sm"
                    leftSection={<IconRefresh size={18} stroke={2} />}
                    onClick={onRetry}
                >
                    Retry
                </Button>
            }
        />
    );
}