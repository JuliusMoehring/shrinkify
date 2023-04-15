import type { Accessor, Component, JSX } from 'solid-js';
import { createEffect } from 'solid-js';
import type { z } from 'zod';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    name: string;
    error: Accessor<z.ZodError<any> | undefined>;
};

export const Input: Component<InputProps> = ({ id, name, label, error, class: classNames, ...attributes }) => {
    let inputRef: HTMLInputElement;

    createEffect(() => {
        const inputErrors = error()?.formErrors.fieldErrors[name];

        if (inputErrors) {
            inputRef.setCustomValidity(inputErrors[0]);
        }
    });

    return (
        <div class={classNames}>
            <label for={id} class="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>

            <div class="mt-2">
                <input
                    ref={inputRef!}
                    id={id}
                    name={name}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:ring-2 invalid:ring-red-800 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    onInput={() => {
                        inputRef.setCustomValidity('');
                    }}
                    {...attributes}
                />
            </div>
        </div>
    );
};
