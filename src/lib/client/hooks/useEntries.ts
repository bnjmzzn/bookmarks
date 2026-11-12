// src/lib/client/hooks/useEntries.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/client/api";
import type { Entry } from "@/lib/client/types";

export function useEntries() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await api.entries.list(controller.signal);
                setEntries(data);
                setIsLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }

                setHasError(true);
                setIsLoading(false);
                notifications.show({
                    color: "red",
                    message: "Failed to load",
                });
            }
        }

        load();

        return () => {
            controller.abort();
        };
    }, []);

    return { entries, isLoading, hasError };
}