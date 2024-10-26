import React, { useState } from "react";
import Fruit from "../types/Fruit";

interface FruitListProps {
  fruits: Fruit[];
  addFruit: (fruit: Fruit) => void;
  addGroup: (group: Fruit[]) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, addFruit, addGroup }) => {
  const [groupBy, setGroupBy] = useState("None");
  const [view, setView] = useState("List");

  // Helper function to group fruits
  const groupFruits = (fruits: Fruit[], groupBy: string) => {
    if (groupBy === "None") return { None: fruits };

    return fruits.reduce((groups: { [key: string]: Fruit[] }, fruit) => {
      const groupKey = fruit[groupBy.toLowerCase() as keyof Fruit] as string;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(fruit);
      return groups;
    }, {});
  };

  // Group fruits based on the groupBy state
  const groupedFruits = groupFruits(fruits, groupBy);

  // Function to render the fruits
  const renderFruits = () => {
    return Object.entries(groupedFruits).map(([group, items]) => (
      <div key={group} className="mb-4">
        {groupBy !== "None" && (
          <div className="flex items-center justify-between">
            <h3 className="p-2 font-semibold bg-gray-200 rounded-md">{group}</h3>
            <button
              onClick={() => addGroup(items)}
              className="text-sm text-blue-500 hover:underline"
            >
              Add All to Jar
            </button>
          </div>
        )}
        {view === "List" ? (
          <ul className="ml-4 mt-2">
            {items.map((fruit) => (
              <li key={fruit.id} className="flex justify-between items-center">
                <div>
                  {fruit.name} ({fruit.nutritions.calories} cal)
                </div>
                <button
                  onClick={() => addFruit(fruit)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Name</th>
                <th className="text-left p-2 border-b">Family</th>
                <th className="text-left p-2 border-b">Order</th>
                <th className="text-left p-2 border-b">Genus</th>
                <th className="text-left p-2 border-b">Calories</th>
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((fruit) => (
                <tr key={fruit.id} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{fruit.name}</td>
                  <td className="p-2 border-b">{fruit.family}</td>
                  <td className="p-2 border-b">{fruit.order}</td>
                  <td className="p-2 border-b">{fruit.genus}</td>
                  <td className="p-2 border-b">{fruit.nutritions.calories}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => addFruit(fruit)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    ));
  };

  return (
    <div className="w-1/2 h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Fruit List</h2>

      <div className="flex justify-between mb-4">
        {/* Group By Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="groupBy">
            Group by
          </label>
          <select
            id="groupBy"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="None">None</option>
            <option value="Family">Family</option>
            <option value="Order">Order</option>
            <option value="Genus">Genus</option>
          </select>
        </div>

        {/* View Toggle Buttons */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">View</label>
          <div className="flex space-x-2">
            <button
              onClick={() => setView("List")}
              className={`p-2 rounded-lg ${view === "List" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              List
            </button>
            <button
              onClick={() => setView("Table")}
              className={`p-2 rounded-lg ${view === "Table" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {renderFruits()}
    </div>
  );
};

export default FruitList;
