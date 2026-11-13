// src/lib/client/hooks/useEntries.ts
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/client/api";
import type { Entry } from "@/lib/client/types";
import { ClientError } from "@/lib/client/errors";

export function useEntries() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const load = useCallback(async (signal?: AbortSignal) => {
        try {
            const data = await api.entries.list(signal);
            setEntries(data);
            setIsLoading(false);
        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            }

            let detail = "Unknown error";

            if (error instanceof ClientError) {
                detail = error.message;
            }

            setHasError(true);
            setIsLoading(false);
            notifications.show({
                color: "red",
                title: "Failed to load",
                message: detail,
            });
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        load(controller.signal);

        return () => {
            controller.abort();
        };
    }, [load]);

    const refetch = () => {
        setHasError(false);
        setIsLoading(true);
        load();
    };

    return { entries, isLoading, hasError, refetch };
}