"use client";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Badge,
} from "@nextui-org/react";
import { BellDot } from "lucide-react";

export default function PopoverBox() {
  const [notifications, setNotifications] = useState([]);

  // Simulating fetching notifications from an API
  useEffect(() => {
    // Replace this with your actual API call to fetch notifications
    // For demonstration purposes, using dummy data
    const fetchNotifications = async () => {
      try {
        // Simulated API call
        // const response = await fetch("/api/notifications");
        // const data = await response.json();
        // setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <Popover
        radius="md"
        showArrow
        offset={10}
        placement="bottom"
        backdrop="transparent"
        triggerType="listbox"
      >
        <PopoverTrigger>
          <div className="cursor-pointer p-1">
            <Badge content="10" shape="circle" color="danger">
              <BellDot className="h-6 w-6 text-primary" />
            </Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 w-64">
            {notifications.map((notification, index) => (
              <p key={index}>{notification.message}</p>
              // Render your notification data here
              // You might display notification message, employee name, amount, etc.
            ))}
            {notifications.length === 0 && (
              <div className="w-32 h-56 ">No notifications</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
