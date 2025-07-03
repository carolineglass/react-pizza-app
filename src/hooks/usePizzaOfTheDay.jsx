import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPizzaOfTheDay = async () => {
    try {
      const resp = await fetch(`${apiUrl}/api/pizza-of-the-day`);
      const data = await resp.json();
      setPizzaOfTheDay(data);
    } catch (error) {
      console.error("Error fetching pizza of the day:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzaOfTheDay();
  }, []);

  return { pizzaOfTheDay, loading };
};
