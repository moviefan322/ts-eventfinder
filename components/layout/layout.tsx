import React, { useContext } from "react";
import Header from "./header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

type layoutProps = {
  children: React.ReactNode;
};

function Layout(props: layoutProps) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <Header />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
