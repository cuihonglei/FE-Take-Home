"use client";

import { useEffect, useState } from "react";

import FruitList from "./components/FruitList";
import Jar, { JarData } from "./components/Jar";
import Fruit from "./types/Fruit";


// Created the end point inside this project instead of the provided one because of the CORS problem.
// Check this for reference: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT!;


export default function Home() {

  const [fruits, setFruits] = useState<Fruit[]>([]); // The fruit list
  const [jar, setJar] = useState<JarData>({}); // The jar data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Function to fetch data through the API
  const fetchFruits = async () => {
    try {
      const response = await fetch(endPoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFruits(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching fruits:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
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
    fetchFruits();
  }, []);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {loading ? ( // Conditional rendering based on loading state
        <div className="flex items-center justify-center w-full">
          <p className="text-xl">Loading fruits...</p> {/* Loading message */}
        </div>
      ) : (
        <>
          {/* Left Section: Fruit List */}
          <FruitList fruits={fruits} addFruit={addFruitToJar} addGroup={addGroupToJar} />

          {/* Right Section: Jar Contents */}
          <Jar data={jar} />
        </>
      )}
    </div>
  );
}
