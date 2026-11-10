// src/lib/server/http/jsend.ts
import { NextResponse } from "next/server";
import type { JSendError, JSendFail, JSendSuccess } from "@/lib/jsend";

export function jsendSuccess<T>(data: T, status = 200) {
    const body: JSendSuccess<T> = {
        status: "success",
        data,
    };

    return NextResponse.json(body, { status });
}

export function jsendFail(data: Record<string, unknown>, status = 400) {
    const body: JSendFail = {
        status: "fail",
        data,
    };

    return NextResponse.json(body, { status });
}

export function jsendError(message: string, status = 500) {
    const body: JSendError = {
        status: "error",
        message,
    };

    return NextResponse.json(body, { status });
}