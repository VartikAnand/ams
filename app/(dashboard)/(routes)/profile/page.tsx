"use client";
import React from "react";
import { UserProfile } from "@clerk/nextjs";
const Profile = () => {
  return (
    <div className=" py-5 flex flex-col justify-center items-center ">
      <UserProfile />
    </div>
  );
};

export default Profile;
