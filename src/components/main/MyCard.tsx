const MyCard = () => {
  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Card
      </h2>
      <div className="bg-forestgreen p-4 rounded-lg mt-4">
        <div className="flex justify-between items-center">
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="visa"
          />
          <p className="text-white font-bold">**** 9000</p>
        </div>
        <div className="mt-4">
          <p className="text-white text-sm">Joy Laroy</p>
          <p className="text-white text-sm">12/24</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Balance
          </p>
          <p className="text-text-primary dark:text-dark-text-primary">
            $101,129.12
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Gains/Losses
          </p>
          <p className="text-accent">$1298.202</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-text-primary dark:text-dark-text-primary text-md font-semibold">
          Quick Transfers
        </h3>
        <div className="flex justify-between items-center mt-2">
          <div className="flex -space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/79.jpg"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/78.jpg"
              alt=""
            />
          </div>
          <button className="text-accent">+</button>
        </div>
      </div>
      <div className="mt-4">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="mt-1 block w-full rounded-md bg-bg dark:bg-dark-bg border-transparent focus:border-forestgreen focus:ring-forestgreen sm:text-sm text-text-primary dark:text-dark-text-primary"
              />
            </div>
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="mt-1 block w-full rounded-md bg-bg dark:bg-dark-bg border-transparent focus:border-forestgreen focus:ring-forestgreen sm:text-sm text-text-primary dark:text-dark-text-primary"
              />
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="mt-1 block w-full rounded-md bg-bg dark:bg-dark-bg border-transparent focus:border-forestgreen focus:ring-forestgreen sm:text-sm text-text-primary dark:text-dark-text-primary"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="bg-forestgreen focus:ring-forestgreen text-bg font-bold py-2 px-4 rounded-lg"
            >
              Send Money
            </button>
            <button
              type="button"
              className="text-text-primary dark:text-dark-text-primary"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCard;
