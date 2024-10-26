import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export interface JarData {
  [id: string]: {
    name: string;
    count: number;
    calories: number;
  };
}

interface JarProps {
  data: JarData;
}

const Jar: React.FC<JarProps> = ({ data }) => {

  // Calculate total calories in the jar
  const totalCalories = Object.values(data).reduce(
    (total, { count, calories }) => total + count * calories,
    0
  );

  // Prepare data for the pie chart
  const pieChartData = Object.entries(data).map(([id, { name, count, calories }]) => ({
    name,
    calories: count * calories,
  }));

  // Colors for each fruit segment
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56"];

  return (
    <div>
      <h2>Jar</h2>
      <ul>
        {Object.entries(data).map(([id, { name, count, calories }]) => (
          <li key={id}>
            {name}: {count} ({count * calories} calories)
          </li>
        ))}
      </ul>
      <h3>Total Calories: {totalCalories}</h3>

      <PieChart width={400} height={300} className="mt-6">
        <Pie
          data={pieChartData}
          dataKey="calories"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {pieChartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Jar;
