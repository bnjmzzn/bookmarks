// src/lib/jsend.ts
export type JSendSuccess<T> = {
    status: "success";
    data: T;
};

export type JSendFail = {
    status: "fail";
    data: Record<string, unknown>;
};

export type JSendError = {
    status: "error";
    message: string;
};

export type JSendResponse<T> = JSendSuccess<T> | JSendFail | JSendError;