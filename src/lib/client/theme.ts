// src/lib/client/theme.ts
import { createTheme, MantineColorsTuple, NavLink } from "@mantine/core";

const dark: MantineColorsTuple = [
    "#d4d4d4",
    "#b8b8b8",
    "#8a8a8a",
    "#6b6b6b",
    "#333333",
    "#262626",
    "#1a1a1a",
    "#121212",
    "#0b0b0b",
    "#050505",
];

export const theme = createTheme({
    primaryColor: "blue", // TODO: ui
    colors: {
        dark,
    },
    white: "#f4f5f7",
    black: "#1c1e21",
    components: {
        NavLink: {
            styles: {
                label: {
                    fontSize: "var(--mantine-font-size-sm)",
                    fontWeight: 500,
                },
            },
        },
    },
});