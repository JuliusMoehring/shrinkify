import type { Component, JSX } from 'solid-js';

type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export const Checkbox: Component<CheckboxProps> = ({ id, name, label, ...attributes }) => {
    return (
        <div class="relative flex items-start">
            <div class="flex h-6 items-center">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    {...attributes}
                    class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                />
            </div>
            <div class="ml-3 text-sm leading-6">
                <label for={id} class="font-medium text-gray-900">
                    {label}
                </label>
            </div>
        </div>
    );
};
