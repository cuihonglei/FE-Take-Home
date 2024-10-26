import { PieChart, Pie, Cell, Tooltip } from "recharts";

export interface JarData {
  [id: string]: {
    name: string;
    count: number;
    calories: number;
  };
}

interface JarProps {
  data: JarData;
  onRemoveFruit: (id: string) => void;
  onClearJar: () => void;
}

const Jar: React.FC<JarProps> = ({ data, onRemoveFruit, onClearJar }) => {

  // Check if the jar is empty
  const isEmpty = Object.keys(data).length === 0;

  // Calculate total calories in the jar
  const totalCalories = Object.values(data).reduce(
    (total, { count, calories }) => total + count * calories,
    0
  );

  // Prepare data for the pie chart
  const pieChartData = Object.entries(data).map(([, { name, count, calories }]) => ({
    name,
    calories: count * calories,
  }));

  // Colors for each fruit segment
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56"];

  return (
    <div className="w-1/2 h-full bg-white p-4 overflow-y-auto">

      {/* Total Calories */}
      <h3 className="text-lg font-semibold text-center">
        {isEmpty ? "No fruits in the jar yet!" : `Total Calories: ${totalCalories}`}
      </h3>

      {/* Show a tip message when the jar is empty */}
      {isEmpty ? (
        <p className="text-center text-gray-500 mt-6">
          Your jar is empty. Add some fruits to track their calories!
        </p>
      ) : (
        <>
          {/* The Pie Chart */}
          <PieChart width={400} height={360} className="mx-auto">
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
          </PieChart>

          {/* Clear Button */}
          <button
            onClick={onClearJar}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Jar
          </button>

          {/* Added Fruits */}
          <ul className="mt-4">
            {Object.entries(data).map(([id, { name, count, calories }]) => (
              <li key={id} className="flex justify-between items-center border-b py-2">
                <div>
                  <span className="text-gray-700">{name}</span>
                  <span className="text-gray-500 ml-2">
                    {count} ({count * calories} calories)
                  </span>
                </div>
                <button
                  onClick={() => onRemoveFruit(id)}
                  className="ml-4 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Jar;
