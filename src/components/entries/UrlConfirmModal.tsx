// src/components/entries/UrlConfirmModal.tsx
"use client";

import { Button, Group, Modal, Text } from "@mantine/core";

type UrlConfirmModalProps = {
    opened: boolean;
    url: string;
    onClose: () => void;
};

export function UrlConfirmModal({ opened, url, onClose }: UrlConfirmModalProps) {
    const hostname = new URL(url).hostname;

    return (
        <Modal opened={opened} onClose={onClose} title="Leaving this site" centered>
            <Text>You will be redirected to {hostname}.</Text>
            <Group justify="flex-end" mt="lg">
                <Button variant="default" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                >
                    Continue
                </Button>
            </Group>
        </Modal>
    );
}