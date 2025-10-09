import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import MyTransactions from "../components/main/MyTransactions";
import SideBar from "../components/main/SideBar";

const Transactions = () => {
  return (
    <div className="flex h-screen bg-bg">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4">
          <MyTransactions />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Transactions;
