import type { Component } from 'solid-js';
import { NotificationProvider } from '../contexts/NotificationContext';
import { CreateShrink } from './CreateShrink';

export const App: Component = () => {
    return (
        <NotificationProvider>
            <CreateShrink />
        </NotificationProvider>
    );
};
