import Content from "../components/main/Content";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import SideBar from "../components/main/SideBar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4">
          <Content />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
