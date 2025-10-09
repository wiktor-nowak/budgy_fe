import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "01", uv: 4000, pv: 2400, amt: 2400 },
  { name: "02", uv: 3000, pv: 1398, amt: 2210 },
  { name: "03", uv: 2000, pv: 9800, amt: 2290 },
  { name: "04", uv: 2780, pv: 3908, amt: 2000 },
  { name: "05", uv: 1890, pv: 4800, amt: 2181 },
  { name: "06", uv: 2390, pv: 3800, amt: 2500 },
  { name: "07", uv: 3490, pv: 4300, amt: 2100 },
];

const MyFinances = () => {
  return (
    <div className="bg-bg-light p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Finances
      </h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#a3a3a3" />
        <XAxis dataKey="name" stroke="#a3a3a3" />
        <YAxis stroke="#a3a3a3" />
        <Tooltip
          contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }}
          itemStyle={{ color: "#1a1a1a" }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#00f59a"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default MyFinances;
