// src/components/common/UrlConfirm.tsx
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Anchor, Button, Checkbox, Group, Modal, Text } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";

type UrlConfirmProps = {
    url: string;
    children: (visit: () => void) => ReactNode;
};

export function UrlConfirm({ url, children }: UrlConfirmProps) {
    const [isOpen, { open, close }] = useDisclosure(false);
    const [skipConfirm, setSkipConfirm] = useLocalStorage<boolean>({
        key: "PlzNoUrlConfirm",
        defaultValue: false,
    });
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const visit = () => {
        if (skipConfirm) {
            window.open(url, "_blank", "noopener,noreferrer");
            return;
        }
        open();
    };

    const handleContinue = () => {
        if (dontShowAgain) {
            setSkipConfirm(true);
        }
        close();
    };

    return (
        <>
            {children(visit)}
            <Modal
                opened={isOpen}
                onClose={close}
                title="Leaving this site"
                centered
                overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}
            >
                <Text>
                    You will be redirected to{" "}
                    <Anchor
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleContinue}
                        style={{ wordBreak: "break-all" }}
                    >
                        {url}
                    </Anchor>
                </Text>
                <Checkbox
                    mt="md"
                    label="Don't show this again"
                    checked={dontShowAgain}
                    onChange={(event) => setDontShowAgain(event.currentTarget.checked)}
                />
                <Group justify="flex-end" mt="lg">
                    <Button variant="default" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </Group>
            </Modal>
        </>
    );
}