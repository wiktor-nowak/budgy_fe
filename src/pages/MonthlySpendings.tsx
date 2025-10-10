import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import Monthly from "../components/main/Monthly";
import SideBar from "../components/main/SideBar";

const MonthlySpendings = () => {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4 overflow-hidden">
          <Monthly />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MonthlySpendings;
