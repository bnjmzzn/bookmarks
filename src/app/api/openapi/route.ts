// src/app/api/openapi/route.ts
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { entries } from "@/db/schema";
import {
    entryCreateSchema,
    entryDeleteSchema,
    entryUpdateSchema,
} from "@/lib/validation";

const entrySchema = createSelectSchema(entries);

function toSchema(schema: z.ZodType, io: "input" | "output") {
    return z.toJSONSchema(schema, {
        io,
        unrepresentable: "any",
        override: (context) => {
            if (context.zodSchema._zod.def.type !== "date") {
                return;
            }

            context.jsonSchema.type = "string";
            context.jsonSchema.format = "date-time";
        },
    });
}

function successEnvelope(data: object) {
    return {
        type: "object",
        required: ["status", "data"],
        properties: {
            status: { type: "string", enum: ["success"] },
            data,
        },
    };
}

function jsonContent(schema: object) {
    return {
        "application/json": { schema },
    };
}

function errorResponse(description: string, schemaName: string) {
    return {
        description,
        content: jsonContent({ $ref: `#/components/schemas/${schemaName}` }),
    };
}

const entryOutput = toSchema(entrySchema, "output");

const adminResponses = {
    "400": errorResponse("Validation failed", "JSendFail"),
    "401": errorResponse("Unauthorized", "JSendError"),
    "500": errorResponse("Server error", "JSendError"),
};

const spec = {
    openapi: "3.1.0",
    info: {
        title: "Bookmarks API",
        version: "1.0.0",
    },
    paths: {
        "/api/entries": {
            get: {
                summary: "List entries",
                responses: {
                    "200": {
                        description: "Entries",
                        content: jsonContent(
                            successEnvelope({
                                type: "array",
                                items: entryOutput,
                            }),
                        ),
                    },
                    "500": errorResponse("Server error", "JSendError"),
                },
            },
        },
        "/api/admin/entries": {
            post: {
                summary: "Create entry",
                security: [{ science: [] }],
                requestBody: {
                    required: true,
                    content: jsonContent(toSchema(entryCreateSchema, "input")),
                },
                responses: {
                    "201": {
                        description: "Created",
                        content: jsonContent(successEnvelope(entryOutput)),
                    },
                    ...adminResponses,
                },
            },
            patch: {
                summary: "Update entry",
                security: [{ science: [] }],
                requestBody: {
                    required: true,
                    content: jsonContent(toSchema(entryUpdateSchema, "input")),
                },
                responses: {
                    "200": {
                        description: "Updated",
                        content: jsonContent(successEnvelope(entryOutput)),
                    },
                    ...adminResponses,
                },
            },
            delete: {
                summary: "Delete entry",
                security: [{ science: [] }],
                requestBody: {
                    required: true,
                    content: jsonContent(toSchema(entryDeleteSchema, "input")),
                },
                responses: {
                    "200": {
                        description: "Deleted",
                        content: jsonContent(successEnvelope({ type: "null" })),
                    },
                    ...adminResponses,
                },
            },
        },
    },
    components: {
        securitySchemes: {
            science: {
                type: "apiKey",
                in: "header",
                name: "x-science",
            },
        },
        schemas: {
            JSendFail: {
                type: "object",
                required: ["status", "data"],
                properties: {
                    status: { type: "string", enum: ["fail"] },
                    data: { type: "object", additionalProperties: true },
                },
            },
            JSendError: {
                type: "object",
                required: ["status", "message"],
                properties: {
                    status: { type: "string", enum: ["error"] },
                    message: { type: "string" },
                },
            },
        },
    },
};

export function GET() {
    return Response.json(spec);
}