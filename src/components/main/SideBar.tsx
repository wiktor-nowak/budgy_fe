import {
  FiHome,
  FiShoppingCart,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";

const SideBar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Budgy</h1>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700">
          <FiHome className="mr-3" />
          Home
        </a>
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700">
          <FiShoppingCart className="mr-3" />
          Spendings
        </a>
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700">
          <FiCreditCard className="mr-3" />
          Transactions
        </a>
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700">
          <FiBarChart2 className="mr-3" />
          Charts
        </a>
      </nav>
      <div className="p-2 mt-auto">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700">
          <FiSettings className="mr-3" />
          Settings
        </a>
      </div>
    </aside>
  );
};

export default SideBar;
