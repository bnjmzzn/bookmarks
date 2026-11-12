// src/components/common/TagBadge.tsx
import { Badge, type MantineSize } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";

type TagBadgeProps = {
    tag: string;
    size?: MantineSize;
};

type TagOverflowBadgeProps = {
    count: number;
    size?: MantineSize;
};

const ICON_SIZE = 12;
const ICON_STROKE = 3;

export function TagBadge({ tag, size = "md" }: TagBadgeProps) {
    return (
        <Badge
            variant="dot"
            radius="sm"
            size={size}
            fw={600}
        >
            {tag}
        </Badge>
    );
}

export function TagOverflowBadge({ count, size = "md" }: TagOverflowBadgeProps) {
    return (
        <Badge
            variant="dot"
            radius="sm"
            size={size}
            fw={600}
            style={{ flexShrink: 0 }}
        >
            +{count}
        </Badge>
    );
}