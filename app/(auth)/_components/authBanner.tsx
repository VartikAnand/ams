import React from "react";
import { Image } from "@nextui-org/react";
const AuthBanner = () => {
  return (
    <div className="h-90%">
      <Image
        isBlurred
        //   width={300}
        //   height={200}
        src="/authBanner.png"
        alt="Auth Banner"
        classNames="h-full w-full"
      />
    </div>
  );
};

export default AuthBanner;
