import MyCard from "../components/main/MyCard";
import MyFinances from "../components/main/MyFinances";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-bg">
      <div className="lg:col-span-2">
        <MyFinances />
      </div>
      <MyCard />
    </div>
  );
};

export default Home;
