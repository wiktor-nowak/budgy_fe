interface Category {
  name: string;
  planned: number;
  spent: number;
}

interface MonthlyTableProps {
  categories: Category[];
}

const MonthlyTable = ({ categories }: MonthlyTableProps) => {
  return (
    <table className="text-sm text-left text-text-secondary dark:text-dark-text-secondary">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="p-2 font-bold">Category</th>
          <th className="p-2 text-right">Planned</th>
          <th className="p-2 text-right">Spent</th>
          <th className="p-2 text-right">Percent</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          const percent = (category.spent * 100) / category.planned;
          return (
            <tr key={index} className="border-b border-bg dark:border-dark-bg">
              <td className="p-2 font-bold">{category.name}</td>
              <td className="p-2 text-right">
                {category.planned.toFixed(2)} PLN
              </td>
              <td className={`p-2 text-right text-dark`}>
                {category.spent.toFixed(2)} PLN
              </td>
              <td
                className={`p-2 text-right ${
                  percent > 100 ? "text-warning" : ""
                }`}
              >
                {percent.toFixed(2)} %
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MonthlyTable;
