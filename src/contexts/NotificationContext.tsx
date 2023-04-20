import { debounce } from '@solid-primitives/scheduled';
import type { ParentComponent } from 'solid-js';
import { Show, createContext, createSignal, useContext } from 'solid-js';
import { Portal } from 'solid-js/web';
import type { NotificationProps } from '../components/Notification';
import { Notification } from '../components/Notification';

export type Notification = Omit<NotificationProps, 'handleClose'>;

const NotificationContext = createContext<(notification: Notification) => Promise<void>>();

export const NotificationProvider: ParentComponent = props => {
    const [showNotification, setShowNotification] = createSignal(false);
    const [notification, setNotification] = createSignal<Notification>();

    const debouceCloseNotification = debounce(async () => {
        setShowNotification(false);
    }, 5_000);

    const hideNotification = async () => {
        return new Promise(resolve => {
            setShowNotification(false);
            setTimeout(resolve, 250);
        });
    };

    const newNotification = async (notification: Notification) => {
        if (showNotification()) {
            await hideNotification();
        }

        setNotification(notification);
        setShowNotification(true);
        debouceCloseNotification();
    };

    return (
        <NotificationContext.Provider value={newNotification}>
            {props.children}

            <Show when={showNotification()}>
                <Portal>
                    <div
                        aria-live="assertive"
                        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                    >
                        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <Notification
                                handleClose={() => setShowNotification(false)}
                                title={notification()?.title}
                                message={notification()?.message}
                            />
                        </div>
                    </div>
                </Portal>
            </Show>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }

    return context;
};
