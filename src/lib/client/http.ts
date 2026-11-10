// src/lib/client/http.ts
import axios, { type AxiosResponse } from "axios";
import type { JSendResponse } from "@/lib/jsend";
import { ClientError } from "@/lib/client/types";

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

function unwrapResponse(response: AxiosResponse) {
    const body: unknown = response.data;

    if (isJSendBody(body) && body.status === "success") {
        response.data = body.data;
        return response;
    }

    throw new ClientError(response.status, "Unexpected response", null);
}

function toClientError(error: unknown) {
    if (axios.isCancel(error)) {
        return error;
    }

    if (!axios.isAxiosError(error)) {
        return error;
    }

    if (!error.response) {
        return new ClientError(0, "Network error", null);
    }

    const { status, data } = error.response;

    if (!isJSendBody(data)) {
        return new ClientError(status, "Request failed", null);
    }

    if (data.status === "error") {
        return new ClientError(status, data.message, null);
    }

    if (data.status === "fail") {
        const hasMessage = typeof data.data.message === "string";
        const message = hasMessage ? String(data.data.message) : "Request failed";
        return new ClientError(status, message, data.data);
    }

    return new ClientError(status, "Request failed", null);
}

function handlePublicError(error: unknown) {
    return Promise.reject(toClientError(error));
}

function handleAdminError(error: unknown) {
    const clientError = toClientError(error);
    const isUnauthorized = clientError instanceof ClientError && clientError.status === 401;

    if (isUnauthorized) {
        unauthorizedHandler?.();
    }

    return Promise.reject(clientError);
}

export const publicHttp = axios.create({
    baseURL: "/api",
    timeout: 10000,
});

export const adminHttp = axios.create({
    baseURL: "/api/admin",
    timeout: 10000,
});

publicHttp.interceptors.response.use(unwrapResponse, handlePublicError);
adminHttp.interceptors.response.use(unwrapResponse, handleAdminError);