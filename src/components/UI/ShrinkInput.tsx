import { debounce } from '@solid-primitives/scheduled';
import classNames from 'classnames';
import type { Accessor, Component, JSX } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { z } from 'zod';

type ShrinkInputProps = JSX.HTMLAttributes<HTMLDivElement> & {
    error: Accessor<z.ZodError<any> | undefined>;
};

const GenerateOriginResponseSchema = z.object({
    origin: z.string(),
});

const generateOrigin = async () => {
    const result = await fetch(`${import.meta.env.PUBLIC_API_URL}/shrink/generate-origin`);

    const data = await result.json();

    const parsedData = GenerateOriginResponseSchema.safeParse(data);

    if (!parsedData.success) {
        throw new Error('Invalid response');
    }

    return parsedData.data.origin;
};

const checkOriginValidity = async (origin: string) => {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/shrink/validate-origin`, {
        method: 'POST',
        body: JSON.stringify({ origin }),
    });

    if (response.status === 200) {
        return true;
    }

    return false;
};

type OnInputEvent = InputEvent & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
};

const INPUT_NAME = 'origin';

export const ShrinkInput: Component<ShrinkInputProps> = ({ error, ...attributes }) => {
    let inputRef: HTMLInputElement;

    const [shrinkGenerating, setShrinkGenerating] = createSignal(false);
    const [shrinkError, setShrinkError] = createSignal<boolean>(false);

    createEffect(() => {
        const inputErrors = error()?.formErrors.fieldErrors[INPUT_NAME];

        if (inputErrors) {
            inputRef.setCustomValidity(inputErrors[0]);
            setShrinkError(true);
        }
    });

    const trigger = debounce(async (event: OnInputEvent) => {
        const value = event.target.value;

        const isValid = await checkOriginValidity(value);

        const customValidity = isValid ? '' : 'Invalid';

        event.target.setCustomValidity(customValidity);

        setShrinkError(!isValid);
    }, 1000);

    const handleGenerateRandom = async () => {
        setShrinkGenerating(true);
        const randomString = await generateOrigin();

        inputRef.value = randomString;
        inputRef.setCustomValidity('');

        setShrinkGenerating(false);
        setShrinkError(false);
    };

    return (
        <div {...attributes}>
            <label for={INPUT_NAME} class="block text-sm font-medium leading-6 text-gray-900">
                From
            </label>

            <div class="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                <div
                    class={classNames(
                        'flex w-full rounded-l-md',
                        {
                            'ring-2 ring-inset ring-red-800': shrinkError(),
                        },
                        {
                            'focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600': !shrinkError(),
                        },
                    )}
                >
                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">shrinkify.app/</span>

                    <input
                        ref={inputRef!}
                        type="text"
                        name={INPUT_NAME}
                        id={INPUT_NAME}
                        class="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="KsdRi3kO"
                        onInput={event => trigger(event)}
                    />
                </div>

                <button
                    type="button"
                    class="relative -ml-px inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleGenerateRandom}
                    disabled={shrinkGenerating()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={classNames('-ml-0.5 h-5 w-5 text-gray-400', { 'animate-spin': shrinkGenerating() })}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                        />
                    </svg>

                    <span class="first-letter:capitalize">
                        <span class="hidden sm:inline">Generate</span> random
                    </span>
                </button>
            </div>
        </div>
    );
};
