import classNames from 'classnames';
import type { Accessor, JSX, ParentComponent } from 'solid-js';
import { createEffect } from 'solid-js';

type ClickEvent = MouseEvent & {
    currentTarget: HTMLDialogElement;
    target: Element;
};

const isClickOutside = (event: ClickEvent) => {
    const { top, right, bottom, left } = event.currentTarget.getBoundingClientRect();

    const { clientX, clientY } = event;

    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        return true;
    }

    return false;
};

type DialogProps = Omit<JSX.DialogHtmlAttributes<HTMLDialogElement>, 'open'> & {
    open: Accessor<boolean>;
};

export const Dialog: ParentComponent<DialogProps> = ({ open, children, class: className, ...attributes }) => {
    let dialogRef: HTMLDialogElement;

    createEffect(() => {
        if (open()) {
            dialogRef.showModal();
        }
    });

    return (
        <dialog
            ref={dialogRef!}
            {...attributes}
            class={classNames(
                className,
                'gap-2 rounded-lg outline-none backdrop:bg-black backdrop:opacity-50 backdrop:backdrop-blur',
            )}
            onClick={event => {
                if (isClickOutside(event)) {
                    dialogRef.close();
                }
            }}
        >
            <div class="flex items-center justify-end">
                <button
                    type="button"
                    onClick={() => dialogRef.close()}
                    class="rounded p-1 text-gray-400 hover:scale-push hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {children}
        </dialog>
    );
};
