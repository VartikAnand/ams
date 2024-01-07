import AuthBanner from "./_components/authBanner";
import { Image } from "@nextui-org/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/main.svg')`,
      }}
      className="h-screen bg-cover bg-center p-0 m-0 pt-0 w-full bg-backgroundColor"
    >
      <div className="flex items-center backdrop-blur-0 justify-center opacity-95 bg-backgroundColor/30 lg:justify-start lg:pl-[8%]  h-full w-full lg:mb-20 lg:pr-32 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
