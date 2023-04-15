import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { z } from 'zod';
import { ShrinkDialog } from './ShrinkDialog';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { ShrinkInput } from './UI/ShrinkInput';

const CreateShrinkSchema = z.object({
    origin: z.string().min(1),
    target: z.string().url(),
    status: z.number(),
});

type CreateShrink = z.infer<typeof CreateShrinkSchema>;

const createShrink = async (shrink: CreateShrink) => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/shrink`, {
        method: 'POST',
        body: JSON.stringify(shrink),
    });
};

export const CreateShrink: Component = () => {
    const [createShrinkLoading, setCreateShrinkLoading] = createSignal(false);
    const [error, setError] = createSignal<z.ZodError>();
    const [shrink, setShrink] = createSignal<string>();

    return (
        <>
            <form
                id="shrinkify"
                class="grid grid-cols-12 place-content-baseline gap-3 py-56"
                spellcheck={false}
                novalidate
                onSubmit={async event => {
                    setCreateShrinkLoading(true);
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);

                    const data = Object.fromEntries(formData);

                    const parsedData = CreateShrinkSchema.safeParse({
                        ...data,
                        status: 303,
                    });

                    if (!parsedData.success) {
                        setError(parsedData.error);
                        setCreateShrinkLoading(false);
                        return;
                    }

                    await createShrink(parsedData.data);

                    setShrink(parsedData.data.origin);

                    event.currentTarget.reset();

                    setError(undefined);
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
            </form>

            <ShrinkDialog shrink={shrink} />
        </>
    );
};
