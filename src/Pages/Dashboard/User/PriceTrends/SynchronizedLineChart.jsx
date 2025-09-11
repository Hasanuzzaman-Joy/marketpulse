import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ZoomIn from "../../../shared/ZoomIn";

const SynchronizedLineChart = ({ data }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <ZoomIn>
      <div className="w-full h-[250px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "2px",
                color: "#ffffff",
                fontWeight: "500",
              }}
              itemStyle={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#a8b324"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ZoomIn>
  );
};

export default SynchronizedLineChart;
