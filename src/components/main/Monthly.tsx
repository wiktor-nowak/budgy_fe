import { monthlyData } from "../../data/monthlyData";
import MonthlyChart from "./MonthlyChart";
import MonthlyTable from "./MonthlyTable";

const Monthly = () => {
  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg h-full">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        Monthly Spendings
      </h2>
      <div className="mt-4">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-0.5 flex justify-center space-x-6">
            {monthlyData.map((data, index) => (
              <button
                key={index}
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-forestgreen hs-tab-active:text-forestgreen py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-forestgreen focus:outline-none focus:text-forestgreen disabled:opacity-50 disabled:pointer-events-none active"
                id={`pills-with-brand-color-item-${index}`}
                data-hs-tab={`#pills-with-brand-color-${index}`}
                aria-controls={`pills-with-brand-color-${index}`}
                role="tab"
              >
                {data.month}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-3 h-fill">
          {monthlyData.map((data, index) => (
            <div
              key={index}
              id={`pills-with-brand-color-${index}`}
              className={`${index === 0 ? "" : "hidden"}`}
              role="tabpanel"
              aria-labelledby={`pills-with-brand-color-item-${index}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MonthlyTable categories={data.categories} />
                <MonthlyChart categories={data.categories} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monthly;
