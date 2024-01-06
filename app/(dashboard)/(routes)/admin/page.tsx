"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Image } from "@nextui-org/react";

const AdminDashboard = () => {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && (userId || sessionId)) {
      router.push("/admin/mainEntry");
    } else {
      setLoading(false);
    }
  }, [isLoaded, userId, sessionId, router]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          width={400}
          height={400}
          alt="NextUI hero Image"
          src="/wait.gif"
        />
        <h1 className="font-bold text-lg font-mono">
          Hold a sec, taking you to dashboard...
        </h1>{" "}
      </div>
    );
  }

  return <div>None</div>;
};

export default AdminDashboard;
