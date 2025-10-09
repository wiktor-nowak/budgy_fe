import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import MyExpenses from "../components/main/MyExpenses";
import SideBar from "../components/main/SideBar";

const Charts = () => {
  return (
    <div className="flex h-screen bg-bg">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4">
          <MyExpenses />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Charts;
