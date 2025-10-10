import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

const data = [
  { name: "Shopping", uv: 31.47, pv: 2400, fill: "#00f59a" },
  { name: "Entertainment", uv: 26.69, pv: 4567, fill: "#83a6ed" },
  { name: "Food", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
  { name: "Miscellaneous", uv: 8.22, pv: 9800, fill: "#82ca9d" },
];

const Charts = () => {
  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Expenses
      </h2>
      <div className="flex justify-center">
        <RadialBarChart
          width={500}
          height={300}
          cx={150}
          cy={150}
          innerRadius={20}
          outerRadius={140}
          barSize={10}
          data={data}
        >
          <RadialBar background dataKey="uv" />
          <Legend
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }}
            itemStyle={{ color: "#1a1a1a" }}
          />
        </RadialBarChart>
      </div>
    </div>
  );
};

export default Charts;
