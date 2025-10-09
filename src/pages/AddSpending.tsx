import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import SideBar from "../components/main/SideBar";

const AddSpending = () => {
  const categories = ["Home", "Food", "Car", "Other"];
  const splitWith = ["Karo", "Somsiad", "no split"];

  return (
    <div className="flex h-screen bg-bg">
      <SideBar />
      <div className="flex flex-col flex-1 ml-48">
        <Header />
        <main className="flex-1 p-4">
          <div className="bg-bg-light p-4 rounded-lg">
            <h2 className="text-text-primary text-lg font-semibold">
              Add Spending
            </h2>
            <form className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forestgreen focus:ring-forestgreen sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forestgreen focus:ring-forestgreen sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="split_with"
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Split with
                  </label>
                  <select
                    id="split_with"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forestgreen focus:ring-forestgreen sm:text-sm"
                  >
                    {splitWith.map((person) => (
                      <option key={person}>{person}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-forestgreen focus:ring-forestgreen sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-forestgreen text-bg font-bold py-2 px-4 rounded-lg"
                >
                  Add Spending
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AddSpending;
