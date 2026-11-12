// src/components/entries/UrlConfirmModal.tsx
"use client";

import { useState } from "react";
import { Anchor, Button, Checkbox, Group, Modal, Text } from "@mantine/core";
import { useSkipUrlConfirm } from "@/lib/client/hooks/useSkipUrlConfirm";

type UrlConfirmModalProps = {
    opened: boolean;
    url: string;
    onClose: () => void;
};

export function UrlConfirmModal({ opened, url, onClose }: UrlConfirmModalProps) {
    const hostname = new URL(url).hostname;

    const [, setSkipConfirm] = useSkipUrlConfirm();
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleContinue = () => {
        if (dontShowAgain) {
            setSkipConfirm(true);
        }
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Leaving this site"
            centered
            overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}
        >
            <Text>
                You will be redirected to{" "}
                <Anchor href={url} target="_blank" rel="noopener noreferrer" onClick={handleContinue} style={{ wordBreak: "break-all" }}>
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
            <Button variant="default" onClick={onClose}>
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
    );
}