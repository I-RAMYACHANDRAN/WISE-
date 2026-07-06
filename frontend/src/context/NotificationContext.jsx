import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getUnreadAnnouncements,
} from "../services/announcementService";

import {
  getProfile,
} from "../services/authService";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notificationCount, setNotificationCount] =
    useState(0);

  const [lastViewed, setLastViewed] =
    useState(null);

  const refreshNotifications = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("attendeeUser")
      );

      if (!user) return;

      const profile =
        await getProfile(user._id);

      setLastViewed(
        profile.user.lastAnnouncementViewedAt
      );

      const data =
        await getUnreadAnnouncements(
          user._id
        );

      setNotificationCount(data.count);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <NotificationContext.Provider
      value={{
        notificationCount,
        setNotificationCount,
        lastViewed,
        refreshNotifications,
      }}
    >

      {children}

    </NotificationContext.Provider>

  );

};

export const useNotifications = () =>
  useContext(NotificationContext);