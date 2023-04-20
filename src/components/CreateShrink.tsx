import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { z } from 'zod';
import { useNotification } from '../contexts/NotificationContext';
import { AdvancedShrinkOptions } from './AdvancedShrinkOptions';
import { ShrinkDialog } from './ShrinkDialog';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { ShrinkInput } from './UI/ShrinkInput';

const CreateShrinkSchema = z.object({
    origin: z.string().min(1),
    target: z.string().url(),
    statusCode: z.string().pipe(z.coerce.number()).default('303'),
    expireDate: z.string().pipe(z.coerce.date()).optional(),
});

type CreateShrink = z.infer<typeof CreateShrinkSchema>;

const createShrink = async (shrink: CreateShrink) => {
    await fetch(`${import.meta.env.PUBLIC_API_URL}/shrink`, {
        method: 'POST',
        body: JSON.stringify(shrink),
    });
};

export const CreateShrink: Component = () => {
    const [createShrinkLoading, setCreateShrinkLoading] = createSignal(false);
    const [error, setError] = createSignal<z.ZodError>();
    const [shrink, setShrink] = createSignal<string>();

    const createNotification = useNotification();

    return (
        <>
            <form
                id="shrinkify"
                class="grid grid-cols-12 place-content-baseline gap-3 py-56"
                spellcheck={false}
                novalidate
                onSubmit={async event => {
                    event.preventDefault();
                    setCreateShrinkLoading(true);

                    const formData = new FormData(event.currentTarget);

                    const data = Object.fromEntries(formData);

                    const parsedData = CreateShrinkSchema.safeParse(data);

                    if (!parsedData.success) {
                        setError(parsedData.error);
                        setCreateShrinkLoading(false);

                        createNotification({
                            title: 'Shrink configuration invalid',
                            message: 'Please check your shrink configuration and try again',
                        });

                        return;
                    }

                    try {
                        await createShrink(parsedData.data);

                        setShrink(parsedData.data.origin);

                        event.currentTarget.reset();
                        event.currentTarget.reset();
                    } catch (error) {
                        createNotification({
                            title: 'Creation failed',
                            message: 'Could not create shrink. Please try again later.',
                        });
                    }

                    setCreateShrinkLoading(false);
                }}
            >
                <ShrinkInput class="col-span-12 lg:col-span-5" error={error} />

                <Input
                    id="target"
                    label="To"
                    name="target"
                    type="url"
                    placeholder="http://example.com"
                    class="col-span-12 lg:col-span-4"
                    error={error}
                />

                <div class="col-span-12 flex w-full items-end lg:col-span-3">
                    <Button class="w-full" type="submit" disabled={createShrinkLoading()}>
                        Create shrink
                    </Button>
                </div>

                <div class="col-span-12">
                    <AdvancedShrinkOptions />
                </div>
            </form>

            <ShrinkDialog shrink={shrink} />
        </>
    );
};
