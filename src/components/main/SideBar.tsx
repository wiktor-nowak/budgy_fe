import { useState, useEffect } from "react";
import {
  FiHome,
  FiShoppingCart,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
  FiSun,
  FiMoon,
  FiUsers,
  FiTool,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-48 bg-darkgreen text-text flex flex-col fixed top-0 left-0 h-full text-light">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Budgy</h1>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <a
          href="/home"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiHome className="mr-3" />
          Home
        </a>
        <a
          href="/spendings"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiShoppingCart className="mr-3" />
          Monthly Spendings
        </a>
        <a
          href="/transactions"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiCreditCard className="mr-3" />
          Transactions
        </a>
        <a
          href="/charts"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiBarChart2 className="mr-3" />
          Charts
        </a>
        <a
          href="/test"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiHome className="mr-3" />
          Test
        </a>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <FiUsers className="mr-3" />
              Group
            </AccordionTrigger>
            <AccordionContent>
              <a
                href="/home"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen pl-8"
              >
                <FiUser className="mr-3" />
                Karo
              </a>
              <a
                href="/home"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen pl-8"
              >
                <FiUser className="mr-3" />
                Somsiad
              </a>
              <a
                href="/group-management"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen pl-8"
              >
                <FiTool className="mr-3" />
                Manage group
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
      <div className="p-2 mt-auto">
        <a
          href="#"
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen"
        >
          <FiSettings className="mr-3" />
          Settings
        </a>
        <button
          onClick={toggleDarkMode}
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen cursor-pointer w-full"
        >
          {isDarkMode ? (
            <FiSun className="mr-3" />
          ) : (
            <FiMoon className="mr-3" />
          )}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-forestgreen cursor-pointer w-full"
        >
          <FiLogOut className="mr-3" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
