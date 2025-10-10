// import { useEffect } from "react";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import SideBar from "../components/main/SideBar";

const TestPage = () => {
  return (
    <div className="flex h-screen bg-bg">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4">
          <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
            <div className="mt-4">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-0.5 flex justify-center space-x-6">
                  <button
                    type="button"
                    className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none active"
                    id="tabs-with-card-item-1"
                    data-hs-tab="#tabs-with-card-1"
                    aria-controls="tabs-with-card-1"
                    role="tab"
                  >
                    Tab 1
                  </button>
                  <button
                    type="button"
                    className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    id="tabs-with-card-item-2"
                    data-hs-tab="#tabs-with-card-2"
                    aria-controls="tabs-with-card-2"
                    role="tab"
                  >
                    Tab 2
                  </button>
                  <button
                    type="button"
                    className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    id="tabs-with-card-item-3"
                    data-hs-tab="#tabs-with-card-3"
                    aria-controls="tabs-with-card-3"
                    role="tab"
                  >
                    Tab 3
                  </button>
                </nav>
              </div>

              <div className="mt-3">
                <div
                  id="tabs-with-card-1"
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-1"
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    This is the{" "}
                    <em className="font-semibold text-gray-800 dark:text-gray-200">
                      first
                    </em>{" "}
                    item's tab body.
                  </p>
                </div>
                <div
                  id="tabs-with-card-2"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-2"
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    This is the{" "}
                    <em className="font-semibold text-gray-800 dark:text-gray-200">
                      second
                    </em>{" "}
                    item's tab body.
                  </p>
                </div>
                <div
                  id="tabs-with-card-3"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="tabs-with-card-item-3"
                >
                  <p className="text-gray-500 dark:text-gray-400">
                    This is the{" "}
                    <em className="font-semibold text-gray-800 dark:text-gray-200">
                      third
                    </em>{" "}
                    item's tab body.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TestPage;
