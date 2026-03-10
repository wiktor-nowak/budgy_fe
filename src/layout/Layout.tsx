import SideBar from "../components/main/SideBar";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset className="rounded-xl overflow-hidden">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
