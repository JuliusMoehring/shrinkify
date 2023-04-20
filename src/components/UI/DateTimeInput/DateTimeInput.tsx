import type { Component, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { NonTouchDateTimeInput } from './NonTouchDateTimeInput';
import { TouchDateTimeInput } from './TouchDateTimeInput';

type DeviceType = 'touch' | 'non-touch';

const getDeviceType = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return 'touch';
    }

    return 'non-touch';
};

type DateTimeInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export const DateTimeInput: Component<DateTimeInputProps> = ({ id, name, label, ...attributes }) => {
    const dateTimeInputs: Record<DeviceType, Component> = {
        touch: () => <TouchDateTimeInput id={id} name={name} label={label} {...attributes} />,
        'non-touch': () => <NonTouchDateTimeInput id={id} name={name} label={label} {...attributes} />,
    };

    return <Dynamic component={dateTimeInputs[getDeviceType()]} />;
};
