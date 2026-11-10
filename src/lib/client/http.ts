// src/lib/client/http.ts
import axios, { type AxiosRequestConfig } from "axios";
import type { JSendResponse } from "@/lib/jsend";
import { ClientError } from "@/lib/client/errors";

type Scope = "public" | "admin";

const baseUrls: Record<Scope, string> = {
    public: "/api",
    admin: "/api/admin",
};

const instance = axios.create({
    timeout: 10000,
    validateStatus: () => true,
});

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
    unauthorizedHandler = handler;
}

function isJSendBody(value: unknown): value is JSendResponse<unknown> {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const status = (value as { status?: unknown }).status;
    return status === "success" || status === "fail" || status === "error";
}

function parseBody<Data>(status: number, body: unknown): Data {
    if (!isJSendBody(body)) {
        throw new ClientError(status, "Request failed", null);
    }

    if (body.status === "error") {
        throw new ClientError(status, body.message, null);
    }

    if (body.status === "fail") {
        const hasMessage = typeof body.data.message === "string";
        const message = hasMessage ? String(body.data.message) : "Request failed";
        throw new ClientError(status, message, body.data);
    }

    const isOk = status >= 200 && status < 300;

    if (!isOk) {
        throw new ClientError(status, "Request failed", null);
    }

    return body.data as Data;
}

async function send(scope: Scope, config: AxiosRequestConfig) {
    try {
        return await instance.request({ ...config, baseURL: baseUrls[scope] });
    } catch (error) {
        if (axios.isCancel(error)) {
            throw error;
        }

        throw new ClientError(0, "Network error", null);
    }
}

export async function request<Data>(scope: Scope, config: AxiosRequestConfig) {
    const response = await send(scope, config);
    const isUnauthorized = scope === "admin" && response.status === 401;

    if (isUnauthorized) {
        unauthorizedHandler?.();
    }

    return parseBody<Data>(response.status, response.data);
}