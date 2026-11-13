// src/app/api/docs/route.ts
import { ApiReference } from "@scalar/nextjs-api-reference";

export const GET = ApiReference({
    url: "/api/openapi",
    theme: "default",
    layout: "modern",
    showSidebar: true,
    defaultOpenFirstTag: false,
    expandAllParameters: true,
    expandAllSchemaProperties: true,
    expandAllResponses: true,
    hideClientButton: true,
    hideDarkModeToggle: true,
    hideModels: false,
    hideSearch: true,
    showOperationId: false,
    hideTestRequestButton: true,
    operationTitleSource: "summary",
    persistAuth: false,
    telemetry: false,
    documentDownloadType: "both",
    withDefaultFonts: true,
    defaultOpenAllTags: false,
    expandAllModelSections: false,
    maxVisibleRequestBodyProperties: 12,
    orderSchemaPropertiesBy: "alpha",
    orderRequiredPropertiesFirst: true,
});