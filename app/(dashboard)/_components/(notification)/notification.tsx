"use client";
import React, { useState, useEffect } from "react";
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

interface NotificationPageProps {
  notificationData: NotificationData[];
}
export default function PopoverBox({ data }: NotificationPageProps) {
  const [notifications, setNotifications] = useState([]);

  // console.log(data);
  const currentDate = new Date();
  const filteredNotifications = data.filter((notification) => {
    return notification.createdAt <= currentDate;
  });

  const unreadNotifications = filteredNotifications.filter(
    (notification) => !notification.isRead
  );

  return (
    <div className="flex flex-wrap gap-4">
      <Popover
        radius="lg"
        // showArrow
        offset={10}
        placement="bottom"
        backdrop="transparent"
        triggerType="tree"
      >
        <PopoverTrigger>
          <div className="cursor-pointer p-1">
            <Badge
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
                <div className="mt-2  flex  flex-col">
                  <h2 className="font-medium text-xl text-primary ">
                    Notification&apos;s
                  </h2>
                  <p className="text-default-400/70 text-xs">
                    Check out your latest notifications
                  </p>
                  <Divider className="my-1 mt-2 " />
                </div>
                <div className="flex flex-col items-center justify-center align-middle gap-2 w-72  h-96">
                  <Clock className="w-1/2 h-1/2" />
                  <p>No Notification</p>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}