const MyTransactions = () => {
  const transactions = [
    {
      date: "2 June 2022 3:45PM",
      details: "Pension Payment",
      id: "#01998234097",
      amount: "$1298.202",
    },
    {
      date: "2 June 2022 3:45PM",
      details: "CBA AUD 2 Franked, 30%....",
      id: "#01998267983",
      amount: "$10000.00",
    },
    {
      date: "2 June 2022 3:45PM",
      details: "Developer Salary",
      id: "#01998234097",
      amount: "$12000.00",
    },
  ];

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Transactions
      </h2>
      <table className="w-full mt-4 text-sm text-left text-text-secondary dark:text-dark-text-secondary">
        <thead>
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Transaction Details</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b border-bg dark:border-dark-bg">
              <td className="p-2">{transaction.date}</td>
              <td className="p-2">{transaction.details}</td>
              <td className="p-2">{transaction.id}</td>
              <td className="p-2 text-accent">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTransactions;
