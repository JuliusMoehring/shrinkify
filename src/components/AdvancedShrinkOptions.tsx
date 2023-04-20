import type { Component } from 'solid-js';
import { Show, createSignal } from 'solid-js';
import { Checkbox } from './UI/Checkbox';
import { DateTimeInput } from './UI/DateTimeInput/DateTimeInput';

const createFutureDate = (years: number) => {
    const date = new Date();
    return new Date(date.setFullYear(date.getFullYear() + years));
};

export const AdvancedShrinkOptions: Component = () => {
    const [showAdvancedOptions, setShowAdvancedOptions] = createSignal(false);

    let expireDateInputRef: HTMLInputElement;

    return (
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 flex justify-center">
                <button
                    type="button"
                    onClick={() => setShowAdvancedOptions(prev => !prev)}
                    class="flex gap-4 rounded-md px-6 py-2 text-gray-500 hover:scale-push hover:bg-gray-50 "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 transition-transform duration-150"
                        classList={{ 'rotate-180': showAdvancedOptions() }}
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    Advanced shrink options
                </button>
            </div>

            <Show when={showAdvancedOptions()}>
                <div class="col-span-12 grid grid-cols-12 gap-3">
                    <div class="col-span-12">
                        <Checkbox
                            id="should-expire"
                            name="should-expire"
                            label="Shrink should expire"
                            onChange={event => {
                                expireDateInputRef.disabled = !event.target.checked;
                            }}
                        />
                    </div>

                    <div class="col-span-12 lg:col-span-5">
                        <DateTimeInput
                            ref={expireDateInputRef!}
                            id="expire-date"
                            name="expireDate"
                            label="Expires at"
                            min={new Date().toISOString().slice(0, 16)}
                            value={createFutureDate(1).toISOString().slice(0, 16)}
                            disabled
                        />
                    </div>

                    <div class="col-span-12 lg:col-span-4">
                        <label for="status-code" class="block text-sm font-medium leading-6 text-gray-900">
                            HTTP Status Code
                        </label>
                        <select
                            id="status-code"
                            name="statusCode"
                            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                        >
                            <option value="301">301 (Moved Permanently)</option>
                            <option value="302">302 (Found)</option>
                            <option selected value="303">
                                303 (See Other)
                            </option>
                            <option value="304">304 (Not Modified)</option>
                            <option value="307">307 (Temporary Redirect)</option>
                            <option value="308">308 (Permanent Redirect)</option>
                        </select>
                    </div>
                </div>
            </Show>
        </div>
    );
};
