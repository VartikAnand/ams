import Sidebar from "./_components/sidebar";
import NavBar from "./_components/navBar";
import { db } from "@/lib/db";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const Notification = await db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="h-full">
      <div className="h-[60px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar Notidata={Notification} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <main className="md:pl-56 pt-[60px]  h-screen ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
