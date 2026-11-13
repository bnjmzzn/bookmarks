// src/lib/client/EntriesContext.tsx
"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useEntries } from "@/lib/client/hooks/useEntries";
import type { Entry } from "@/lib/client/types";

type EntriesState = {
    entries: Entry[];
    isLoading: boolean;
    hasError: boolean;
    refetch: () => void;
};

type EntriesProviderProps = {
    children: ReactNode;
};

const EntriesContext = createContext<EntriesState | null>(null);

export function EntriesProvider({ children }: EntriesProviderProps) {
    const state = useEntries();

    return <EntriesContext.Provider value={state}>{children}</EntriesContext.Provider>;
}

export function useEntriesContext() {
    const state = useContext(EntriesContext);

    if (state === null) {
        throw new Error("useEntriesContext must be used inside EntriesProvider");
    }

    return state;
}