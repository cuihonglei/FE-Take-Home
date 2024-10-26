"use client";

import { useEffect, useState } from "react";

import Jar, { JarData } from "./components/Jar";
import Fruit from "./types/Fruit";


// TODO Use environment variable for this.
const endPoint = 'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws/';


export default function Home() {

  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [groupBy, setGroupBy] = useState<string>("None");
  const [view, setView] = useState<"List" | "Table">("List");
  const [jar, setJar] = useState<JarData>({});

  // Function to fetch data through the API
  const fetchFruits = async () => {
    try {
      const response = await fetch(endPoint, { mode: 'no-cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFruits(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching fruits:", error);
    }
  };

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

  const addFruitToJar = (fruit: Fruit) => {
    setJar((prevJar) => ({
      ...prevJar,
      [fruit.id]: {
        name: fruit.name,
        count: (prevJar[fruit.id]?.count || 0) + 1,
        calories: fruit.nutritions.calories,
      },
    }));
  };

  const addGroupToJar = (group: Fruit[]) => {
    const newJar = { ...jar };
    group.forEach((fruit) => {
      if (newJar[fruit.id]) {
        // If the fruit is already in the jar, increment the count
        newJar[fruit.id].count += 1;
      } else {
        // If the fruit is not in the jar, add it with a count of 1
        newJar[fruit.id] = {
          name: fruit.name,
          count: 1,
          calories: fruit.nutritions.calories, // Assuming `calories` is part of the Fruit type
        };
      }
    });
    setJar(newJar);
  };

  useEffect(() => {
    // TODO CORS error...
    //fetchFruits();
    setFruits([{ "name": "Persimmon", "id": 52, "family": "Ebenaceae", "order": "Rosales", "genus": "Diospyros", "nutritions": { "calories": 81, "fat": 0, "sugar": 18, "carbohydrates": 18, "protein": 0 } }, { "name": "Strawberry", "id": 3, "family": "Rosaceae", "order": "Rosales", "genus": "Fragaria", "nutritions": { "calories": 29, "fat": 0.4, "sugar": 5.4, "carbohydrates": 5.5, "protein": 0.8 } }, { "name": "Banana", "id": 1, "family": "Musaceae", "order": "Zingiberales", "genus": "Musa", "nutritions": { "calories": 96, "fat": 0.2, "sugar": 17.2, "carbohydrates": 22, "protein": 1 } }, { "name": "Tomato", "id": 5, "family": "Solanaceae", "order": "Solanales", "genus": "Solanum", "nutritions": { "calories": 74, "fat": 0.2, "sugar": 2.6, "carbohydrates": 3.9, "protein": 0.9 } }, { "name": "Pear", "id": 4, "family": "Rosaceae", "order": "Rosales", "genus": "Pyrus", "nutritions": { "calories": 57, "fat": 0.1, "sugar": 10, "carbohydrates": 15, "protein": 0.4 } }, { "name": "Durian", "id": 60, "family": "Malvaceae", "order": "Malvales", "genus": "Durio", "nutritions": { "calories": 147, "fat": 5.3, "sugar": 6.75, "carbohydrates": 27.1, "protein": 1.5 } }, { "name": "Blackberry", "id": 64, "family": "Rosaceae", "order": "Rosales", "genus": "Rubus", "nutritions": { "calories": 40, "fat": 0.4, "sugar": 4.5, "carbohydrates": 9, "protein": 1.3 } }, { "name": "Lingonberry", "id": 65, "family": "Ericaceae", "order": "Ericales", "genus": "Vaccinium", "nutritions": { "calories": 50, "fat": 0.34, "sugar": 5.74, "carbohydrates": 11.3, "protein": 0.75 } }, { "name": "Kiwi", "id": 66, "family": "Actinidiaceae", "order": "Struthioniformes", "genus": "Apteryx", "nutritions": { "calories": 61, "fat": 0.5, "sugar": 9, "carbohydrates": 15, "protein": 1.1 } }, { "name": "Lychee", "id": 67, "family": "Sapindaceae", "order": "Sapindales", "genus": "Litchi", "nutritions": { "calories": 66, "fat": 0.44, "sugar": 15, "carbohydrates": 17, "protein": 0.8 } }, { "name": "Pineapple", "id": 10, "family": "Bromeliaceae", "order": "Poales", "genus": "Ananas", "nutritions": { "calories": 50, "fat": 0.12, "sugar": 9.85, "carbohydrates": 13.12, "protein": 0.54 } }, { "name": "Fig", "id": 68, "family": "Moraceae", "order": "Rosales", "genus": "Ficus", "nutritions": { "calories": 74, "fat": 0.3, "sugar": 16, "carbohydrates": 19, "protein": 0.8 } }, { "name": "Gooseberry", "id": 69, "family": "Grossulariaceae", "order": "Saxifragales", "genus": "Ribes", "nutritions": { "calories": 44, "fat": 0.6, "sugar": 0, "carbohydrates": 10, "protein": 0.9 } }, { "name": "Passionfruit", "id": 70, "family": "Passifloraceae", "order": "Malpighiales", "genus": "Passiflora", "nutritions": { "calories": 97, "fat": 0.7, "sugar": 11.2, "carbohydrates": 22.4, "protein": 2.2 } }, { "name": "Plum", "id": 71, "family": "Rosaceae", "order": "Rosales", "genus": "Prunus", "nutritions": { "calories": 46, "fat": 0.28, "sugar": 9.92, "carbohydrates": 11.4, "protein": 0.7 } }, { "name": "Orange", "id": 2, "family": "Rutaceae", "order": "Sapindales", "genus": "Citrus", "nutritions": { "calories": 43, "fat": 0.2, "sugar": 8.2, "carbohydrates": 8.3, "protein": 1 } }, { "name": "GreenApple", "id": 72, "family": "Rosaceae", "order": "Rosales", "genus": "Malus", "nutritions": { "calories": 21, "fat": 0.1, "sugar": 6.4, "carbohydrates": 3.1, "protein": 0.4 } }, { "name": "Raspberry", "id": 23, "family": "Rosaceae", "order": "Rosales", "genus": "Rubus", "nutritions": { "calories": 53, "fat": 0.7, "sugar": 4.4, "carbohydrates": 12, "protein": 1.2 } }, { "name": "Watermelon", "id": 25, "family": "Cucurbitaceae", "order": "Cucurbitales", "genus": "Citrullus", "nutritions": { "calories": 30, "fat": 0.2, "sugar": 6, "carbohydrates": 8, "protein": 0.6 } }, { "name": "Lemon", "id": 26, "family": "Rutaceae", "order": "Sapindales", "genus": "Citrus", "nutritions": { "calories": 29, "fat": 0.3, "sugar": 2.5, "carbohydrates": 9, "protein": 1.1 } }, { "name": "Mango", "id": 27, "family": "Anacardiaceae", "order": "Sapindales", "genus": "Mangifera", "nutritions": { "calories": 60, "fat": 0.38, "sugar": 13.7, "carbohydrates": 15, "protein": 0.82 } }, { "name": "Blueberry", "id": 33, "family": "Rosaceae", "order": "Rosales", "genus": "Fragaria", "nutritions": { "calories": 29, "fat": 0.4, "sugar": 5.4, "carbohydrates": 5.5, "protein": 0 } }, { "name": "Apple", "id": 6, "family": "Rosaceae", "order": "Rosales", "genus": "Malus", "nutritions": { "calories": 52, "fat": 0.4, "sugar": 10.3, "carbohydrates": 11.4, "protein": 0.3 } }, { "name": "Guava", "id": 37, "family": "Myrtaceae", "order": "Myrtales", "genus": "Psidium", "nutritions": { "calories": 68, "fat": 1, "sugar": 9, "carbohydrates": 14, "protein": 2.6 } }, { "name": "Apricot", "id": 35, "family": "Rosaceae", "order": "Rosales", "genus": "Prunus", "nutritions": { "calories": 15, "fat": 0.1, "sugar": 3.2, "carbohydrates": 3.9, "protein": 0.5 } }, { "name": "Melon", "id": 41, "family": "Cucurbitaceae", "order": "Cucurbitaceae", "genus": "Cucumis", "nutritions": { "calories": 34, "fat": 0, "sugar": 8, "carbohydrates": 8, "protein": 0 } }, { "name": "Tangerine", "id": 77, "family": "Rutaceae", "order": "Sapindales", "genus": "Citrus", "nutritions": { "calories": 45, "fat": 0.4, "sugar": 9.1, "carbohydrates": 8.3, "protein": 0 } }, { "name": "Pitahaya", "id": 78, "family": "Cactaceae", "order": "Caryophyllales", "genus": "Cactaceae", "nutritions": { "calories": 36, "fat": 0.4, "sugar": 3, "carbohydrates": 7, "protein": 1 } }, { "name": "Lime", "id": 44, "family": "Rutaceae", "order": "Sapindales", "genus": "Citrus", "nutritions": { "calories": 25, "fat": 0.1, "sugar": 1.7, "carbohydrates": 8.4, "protein": 0.3 } }, { "name": "Pomegranate", "id": 79, "family": "Lythraceae", "order": "Myrtales", "genus": "Punica", "nutritions": { "calories": 83, "fat": 1.2, "sugar": 13.7, "carbohydrates": 18.7, "protein": 1.7 } }, { "name": "Dragonfruit", "id": 80, "family": "Cactaceae", "order": "Caryophyllales", "genus": "Selenicereus", "nutritions": { "calories": 60, "fat": 1.5, "sugar": 8, "carbohydrates": 9, "protein": 9 } }, { "name": "Grape", "id": 81, "family": "Vitaceae", "order": "Vitales", "genus": "Vitis", "nutritions": { "calories": 69, "fat": 0.16, "sugar": 16, "carbohydrates": 18.1, "protein": 0.72 } }, { "name": "Morus", "id": 82, "family": "Moraceae", "order": "Rosales", "genus": "Morus", "nutritions": { "calories": 43, "fat": 0.39, "sugar": 8.1, "carbohydrates": 9.8, "protein": 1.44 } }, { "name": "Feijoa", "id": 76, "family": "Myrtaceae", "order": "Myrtoideae", "genus": "Sellowiana", "nutritions": { "calories": 44, "fat": 0.4, "sugar": 3, "carbohydrates": 8, "protein": 0.6 } }, { "name": "Avocado", "id": 84, "family": "Lauraceae", "order": "Laurales", "genus": "Persea", "nutritions": { "calories": 160, "fat": 14.66, "sugar": 0.66, "carbohydrates": 8.53, "protein": 2 } }, { "name": "Kiwifruit", "id": 85, "family": "Actinidiaceae", "order": "Ericales", "genus": "Actinidia", "nutritions": { "calories": 61, "fat": 0.5, "sugar": 8.9, "carbohydrates": 14.6, "protein": 1.14 } }, { "name": "Cranberry", "id": 87, "family": "Ericaceae", "order": "Ericales", "genus": "Vaccinium", "nutritions": { "calories": 46, "fat": 0.1, "sugar": 4, "carbohydrates": 12.2, "protein": 0.4 } }, { "name": "Cherry", "id": 9, "family": "Rosaceae", "order": "Rosales", "genus": "Prunus", "nutritions": { "calories": 50, "fat": 0.3, "sugar": 8, "carbohydrates": 12, "protein": 1 } }, { "name": "Peach", "id": 86, "family": "Rosaceae", "order": "Rosales", "genus": "Prunus", "nutritions": { "calories": 39, "fat": 0.25, "sugar": 8.4, "carbohydrates": 9.5, "protein": 0.9 } }, { "name": "Jackfruit", "id": 94, "family": "Moraceae", "order": "Rosales", "genus": "Artocarpus", "nutritions": { "calories": 95, "fat": 0, "sugar": 19.1, "carbohydrates": 23.2, "protein": 1.72 } }, { "name": "Horned Melon", "id": 95, "family": "Cucurbitaceae", "order": "Cucurbitales", "genus": "Cucumis", "nutritions": { "calories": 44, "fat": 1.26, "sugar": 0.5, "carbohydrates": 7.56, "protein": 1.78 } }, { "name": "Hazelnut", "id": 96, "family": "Betulaceae", "order": "Fagales", "genus": "Corylus", "nutritions": { "calories": 628, "fat": 61, "sugar": 4.3, "carbohydrates": 17, "protein": 15 } }, { "name": "Pomelo", "id": 98, "family": "Rutaceae", "order": "Sapindales", "genus": "Citrus", "nutritions": { "calories": 37, "fat": 0, "sugar": 8.5, "carbohydrates": 9.67, "protein": 0.82 } }, { "name": "Mangosteen", "id": 99, "family": "Clusiaceae", "order": "Malpighiales", "genus": "Garcinia", "nutritions": { "calories": 73, "fat": 0.58, "sugar": 16.11, "carbohydrates": 17.91, "protein": 0.41 } }, { "name": "Pumpkin", "id": 100, "family": "Cucurbitaceae", "order": "Cucurbitales", "genus": "Cucurbita", "nutritions": { "calories": 25, "fat": 0.3, "sugar": 3.3, "carbohydrates": 4.6, "protein": 1.1 } }, { "name": "Japanese Persimmon", "id": 101, "family": " Ebenaceae", "order": " Ericales", "genus": "Diospyros", "nutritions": { "calories": 70, "fat": 0.2, "sugar": 13, "carbohydrates": 19, "protein": 0.6 } }, { "name": "Papaya", "id": 42, "family": "Caricaceae", "order": "Brassicales", "genus": "Carica", "nutritions": { "calories": 39, "fat": 0.3, "sugar": 4.4, "carbohydrates": 5.8, "protein": 0.5 } }, { "name": "Annona", "id": 103, "family": "Annonaceae", "order": "Rosales", "genus": "Annonas", "nutritions": { "calories": 92, "fat": 0.29, "sugar": 3.4, "carbohydrates": 19.1, "protein": 1.5 } }, { "name": "Ceylon Gooseberry", "id": 104, "family": "Salicaceae", "order": "Malpighiales", "genus": "Dovyalis", "nutritions": { "calories": 47, "fat": 0.3, "sugar": 8.1, "carbohydrates": 9.6, "protein": 1.2 } }]);
  }, []);

  const groupedFruits = groupFruits(fruits, groupBy);


  return (
    <div className="flex h-screen p-8 bg-gray-100">
      {/* Left Section: Fruit List */}
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

        {Object.entries(groupedFruits).map(([group, items]) => (
          <div key={group} className="mb-4">
            {groupBy !== "None" && (
              <div className="flex items-center justify-between">
                <h3 className="p-2 font-semibold bg-gray-200 rounded-md">{group}</h3>
                <button
                  onClick={() => addGroupToJar(items)}
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
                      onClick={() => addFruitToJar(fruit)}
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
                          onClick={() => addFruitToJar(fruit)}
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
        ))}
      </div>

      {/* Right Section: Jar Contents */}
      <Jar data={jar} />
    </div>
  );
}
