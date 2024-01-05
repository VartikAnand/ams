"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Badge,
  Divider,
} from "@nextui-org/react";
import { BellDot, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface NotificationPageProps {
  notificationData: NotificationData[];
}
export default function PopoverBox({ data }: NotificationPageProps) {
  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const onSubmit = async (notification) => {
    try {
      const currentDate = new Date();

      await axios.patch(`/api/notification/${notification.notiId}`, {
        readTime: currentDate,
        isRead: true,
        readByUuid: user.id,
        readByName: user.username,
      });
      toast.success("Marked as Read");
      router.refresh();
    } catch (error) {
      toast.error("Unable to marked as read");
    }
  };

  const currentDate = new Date();

  const filteredNotifications = data.filter((notification) => {
    const notificationDate = new Date(notification.notiDate);
    const isToday =
      notificationDate.toDateString() === currentDate.toDateString();
    const isTodayOrPast = notificationDate <= currentDate;

    return (
      (!notification.isRead && isTodayOrPast) ||
      (notification.isRead && isToday)
    );
  });

  const sortedReadNotifications = filteredNotifications
    .filter((notification) => notification.isRead)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB; // Sorts read notifications by date in descending order
    })
    .reverse();

  const sortedUnreadNotifications = filteredNotifications
    .filter((notification) => !notification.isRead)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sorts unread notifications by date in descending order
    });

  const finalSortedNotifications = [
    ...sortedReadNotifications,
    ...sortedUnreadNotifications,
  ];

  const unreadNotifications = filteredNotifications.filter(
    (notification) => !notification.isRead
  );

  return (
    <div className="flex flex-wrap gap-4">
      <Popover
        radius="lg"
        showArrow
        offset={10}
        placement="bottom"
        backdrop="transparent"
        triggerType="tree"
      >
        <PopoverTrigger>
          <div className="cursor-pointer p-1">
            <Badge
              isInvisible={unreadNotifications.length > 0 ? false : true}
              content={`${unreadNotifications.length}`}
              shape="circle"
              color="danger"
            >
              <BellDot className="h-6 w-6 text-primary" />
            </Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 w-80  pb-4 h-96 overflow-y-auto overflow-hidden">
            <div className="mt-2  flex  flex-col">
              <h2 className="font-medium text-xl text-primary ">
                Notification&apos;s
              </h2>
              <p className="text-xs text-primary/60 font-light">
                Check out your latest notifications
              </p>
              <Divider className="my-1 mt-2 " />
            </div>
            {filteredNotifications.map((notification, index) => (
              <>
                <div key={notification.notiId}>
                  <Button
                    onClick={() => onSubmit(notification)}
                    color="primary"
                    isDisabled={notification.isRead}
                    variant="flat"
                    className="flex h-full  cursor-pointer w-full m-0 py-2 align-middle gap-2 px-2 overflow-y-auto overflow-hidden"
                  >
                    <div className="w-full text-start">
                      <p class="text-sm font-medium">
                        {notification?.notiTitle}
                      </p>
                      <p
                        className="font-light text-xs overflow-auto"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {notification?.notiDesc}
                      </p>
                      <span className="flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        <p class="text-xs font-light text-end over">
                          {notification?.notiDate
                            ? new Date(
                                notification.notiDate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : "DD-MM-YYYY"}
                        </p>
                      </span>
                    </div>
                  </Button>
                </div>
              </>
            ))}
            {filteredNotifications.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center align-middle gap-2 w-72  h-96">
                  <Clock className="w-1/2 h-1/2 text-primary/60" />
                  <p
                    className="text-center pl-1
                  font-base"
                  >
                    No Notification
                  </p>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
