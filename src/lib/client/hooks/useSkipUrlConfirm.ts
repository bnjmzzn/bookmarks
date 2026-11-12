// src/lib/client/hooks/useSkipUrlConfirm.ts
"use client";

import { useLocalStorage } from "@mantine/hooks";

export function useSkipUrlConfirm() {
    return useLocalStorage<boolean>({
        key: "PlzNoMoreUrlConfirmation",
        defaultValue: false,
        getInitialValueInEffect: false,
    });
}