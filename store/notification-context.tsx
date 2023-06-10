import React, { createContext, useState, useEffect } from "react";

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
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(
  props: NotificationContextProviderProps
) {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const showNotificationHandler = (notificationData: Notification) => {
    setNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setNotification(null);
  };

  const context: NotificationContextType = {
    notification: notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
