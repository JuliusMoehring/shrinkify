import type { Accessor, Component } from 'solid-js';
import { Show, createEffect, createSignal } from 'solid-js';
import { QRCodeButton } from './QRCodeButton';
import { Button } from './UI/Button';
import { Dialog } from './UI/Dialog';

type ShrinkDialogProps = {
    shrink: Accessor<string | undefined>;
};

export const getURLFromShrink = (shrink: Accessor<string | undefined>) =>
    `${import.meta.env.PUBLIC_BASE_URL}/${shrink()}`;

export const ShrinkDialog: Component<ShrinkDialogProps> = ({ shrink }) => {
    const [open, setOpen] = createSignal(Boolean(shrink()));
    const [qrCode, setQRCode] = createSignal<Blob>();

    createEffect(() => {
        if (shrink()) {
            setOpen(true);
        }
    });

    return (
        <Dialog open={open} class="w-screen md:w-[608px]">
            <div class="flex flex-col gap-8 @container">
                <p class="text-center text-xl">🎉 Your shrink has been created! 🎉</p>

                <div class="flex flex-col gap-2">
                    <p>
                        You can now share this link with your friends:{' '}
                        <a
                            href={getURLFromShrink(shrink)}
                            target="_blank"
                            class="break-words font-bold text-primary-500"
                        >
                            {getURLFromShrink(shrink)}
                        </a>
                        .
                    </p>
                    <p>
                        Please remember that this link might not work forever. But for now, you are definitely good to
                        go!
                    </p>
                </div>

                <Show when={qrCode()}>
                    <div class="grid place-content-center">
                        <img
                            src={URL.createObjectURL(qrCode()!)}
                            class="max-w-xs p-4"
                            alt="QR code"
                            draggable={false}
                        />
                    </div>
                </Show>

                <div class="grid grid-cols-1 gap-4 @xl:grid-cols-2">
                    <QRCodeButton shrink={shrink} qrCode={qrCode} setQRCode={setQRCode} />

                    <Button
                        onClick={() => {
                            if (shrink()) {
                                navigator.clipboard.writeText(getURLFromShrink(shrink));
                            }
                        }}
                        class="flex items-center justify-center gap-2"
                        autofocus
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                        </svg>
                        Copy shrink to clipboard
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
