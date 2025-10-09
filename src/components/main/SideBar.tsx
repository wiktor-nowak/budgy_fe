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
  FiUser
} from "react-icons/fi";

const SideBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <div className="hs-accordion-group">
          <div className="hs-accordion" id="accordion-group">
            <button
              className="hs-accordion-toggle flex items-center w-full text-left text-sm font-medium rounded-md px-2 py-2 hover:bg-forestgreen cursor-pointer"
              aria-controls="accordion-group-body"
            >
              <FiUsers className="mr-3" />
              Group
              <svg className="hs-accordion-active:block hidden w-3 h-3 text-white group-hover:text-gray-500 ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11L8 5L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <svg className="hs-accordion-active:hidden block w-3 h-3 text-white group-hover:text-gray-500 ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div id="accordion-group-body" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
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
            </div>
          </div>
        </div>
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
      </div>
    </aside>
  );
};

export default SideBar;
