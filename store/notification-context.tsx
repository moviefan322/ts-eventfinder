import React, { createContext, useState } from "react";

type Notification = {
  title: string;
  message: string;
  status: string;
};

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
};

type NotificationContextProviderProps = {
  children: React.ReactNode;
};

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(
  props: NotificationContextProviderProps
) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notificationData: Notification) => {
    setNotification(notificationData);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const contextValue: NotificationContextType = {
    notification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
