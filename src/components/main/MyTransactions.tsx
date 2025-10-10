import { FiCreditCard, FiDollarSign, FiCheck, FiX, FiChevronDown } from "react-icons/fi";

const MyTransactions = () => {
  const transactions = [
    {
      date: new Date("2024-05-01"),
      category: "Food",
      amount: -50.0,
      method: "card",
      splitted: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      date: new Date("2024-05-02"),
      category: "Salary",
      amount: 5000.0,
      method: "cash",
      splitted: false,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      date: new Date("2024-05-03"),
      category: "Car",
      amount: -200.0,
      method: "card",
      splitted: true,
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      date: new Date("2024-05-04"),
      category: "Home",
      amount: -1000.0,
      method: "cash",
      splitted: false,
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      date: new Date("2024-05-05"),
      category: "Bonus",
      amount: 1000.0,
      method: "card",
      splitted: false,
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  ];

  const handleIconClick = (method: string) => {
    console.log(`Clicked on ${method} icon`);
  };

  const handleDateClick = (date: Date) => {
    console.log(`Clicked on date: ${date}`);
  };

  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on category: ${category}`);
  };

  const handleRowClick = (index: number) => {
    console.log(`Clicked on row ${index}`);
  };

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Transactions
      </h2>
      <table className="w-full mt-4 text-sm text-left text-text-secondary dark:text-dark-text-secondary">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2 text-right pr-4">Amount</th>
            <th className="p-2 text-center">Method</th>
            <th className="p-2 text-center">Splitted</th>
            <th className="p-2">Details</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b border-bg dark:border-dark-bg">
              <td className="p-2"><span className="cursor-pointer" onClick={() => handleDateClick(transaction.date)}>{transaction.date.toLocaleDateString("en-GB")}</span></td>
              <td className="p-2"><span className="cursor-pointer" onClick={() => handleCategoryClick(transaction.category)}>{transaction.category.substring(0, 30)}</span></td>
              <td className={`p-2 text-right pr-4 ${transaction.amount > 0 ? "text-success" : "text-warning"}`}>
                {transaction.amount.toFixed(2)} PLN
              </td>
              <td className="p-2 text-center">
                <span className="cursor-pointer" onClick={() => handleIconClick(transaction.method)}>
                  {transaction.method === "card" ? <FiCreditCard className="mx-auto" /> : <FiDollarSign className="mx-auto" />}
                </span>
              </td>
              <td className="p-2 text-center">
                <span className="cursor-pointer" onClick={() => handleIconClick(transaction.splitted ? "splitted" : "not splitted")}>
                  {transaction.splitted ? <FiCheck className="mx-auto" /> : <FiX className="mx-auto" />}
                </span>
              </td>
              <td className="p-2">{transaction.description.substring(0, 50)}{transaction.description.length > 50 && "..."}</td>
              <td className="p-2 text-right">
                <FiChevronDown className="cursor-pointer" onClick={() => handleRowClick(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTransactions;
