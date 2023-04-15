import classNames from 'classnames';
import type { JSX, ParentComponent } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    design?: 'primary' | 'secondary';
};

export const Button: ParentComponent<ButtonProps> = ({
    design = 'primary',
    type = 'button',
    children,
    ...attributes
}) => {
    return (
        <button
            type={type}
            {...attributes}
            class={classNames(
                attributes.class,
                'cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm shadow-sm hover:scale-push',
            )}
            classList={{
                'bg-primary-600 font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600':
                    design === 'primary',
                'bg-white font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50':
                    design === 'secondary',
            }}
        >
            {children}
        </button>
    );
};
