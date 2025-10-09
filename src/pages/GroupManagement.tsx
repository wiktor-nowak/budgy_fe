import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import SideBar from "../components/main/SideBar";

const GroupManagement = () => {
  return (
    <div className="flex h-screen bg-bg">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4">
          <p>It is management settings page</p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default GroupManagement;
