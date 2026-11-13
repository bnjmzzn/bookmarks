// src/components/entries/EntryEmpty.tsx
"use client";

import { IconMoodSad } from "@tabler/icons-react";
import { StateMessage } from "@/components/common/StateMessage";

export function EntryEmpty() {
    return (
        <StateMessage
            icon={<IconMoodSad size={50} />}
            title="No entries found"
            description="Try a different keyword or remove some filters"
        />
    );
}