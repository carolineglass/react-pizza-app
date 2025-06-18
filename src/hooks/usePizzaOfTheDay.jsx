import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPizzaOfTheDay = async () => {
    try {
      const resp = await fetch("/api/pizza-of-the-day");
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
