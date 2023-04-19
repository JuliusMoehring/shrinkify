import { Accessor, Component, Match, Setter, Switch } from 'solid-js';
import { getURLFromShrink } from './ShrinkDialog';
import { Button } from './UI/Button';
import { LinkButton } from './UI/LinkButton';

const createShrinkQRCode = async (shrink?: string) => {
    if (!shrink) {
        return;
    }

    const qrCode = await fetch(`${import.meta.env.PUBLIC_API_URL}/shrink/generate-qr-code`, {
        method: 'POST',
        body: JSON.stringify({ shrink }),
    });

    return qrCode.blob();
};

type QRCodeButtonProps = {
    shrink: Accessor<string | undefined>;
    qrCode: Accessor<Blob | undefined>;
    setQRCode: Setter<Blob | undefined>;
};

export const QRCodeButton: Component<QRCodeButtonProps> = ({ shrink, qrCode, setQRCode }) => {
    return (
        <Switch>
            <Match when={!qrCode()}>
                <Button
                    design="secondary"
                    onClick={async () => {
                        const qrCode = await createShrinkQRCode(getURLFromShrink(shrink));

                        setQRCode(qrCode);
                    }}
                >
                    Create QR code
                </Button>
            </Match>
            <Match when={qrCode()}>
                <LinkButton
                    design="primary"
                    href={URL.createObjectURL(qrCode() || new Blob())}
                    download
                    class="flex items-center justify-center gap-2"
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
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                    Download QR code
                </LinkButton>
            </Match>
        </Switch>
    );
};
