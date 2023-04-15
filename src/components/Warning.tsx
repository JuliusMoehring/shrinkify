import type { Component } from 'solid-js';
import { Show, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';

export const Warning: Component = () => {
    const [showWarning, setShowWarning] = createSignal(true);

    return (
        <Transition exitActiveClass="opacity-0 translate-y-8 duration-200">
            <Show when={showWarning()}>
                <div class="pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8">
                    <div class="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary-800 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                        <p class="text-sm leading-6 text-white">
                            ⚠️ Since this is a private project, there is no guarantee that the generated short links
                            will work forever. If you need to be certain, that the generated short link will work
                            forever, please use the service of one of the big short link companies. ⚠️
                        </p>

                        <button
                            type="button"
                            class="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]"
                            onClick={() => setShowWarning(false)}
                        >
                            <span class="sr-only">Dismiss</span>
                            <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </Show>
        </Transition>
    );
};
