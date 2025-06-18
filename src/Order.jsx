import { useState, useEffect } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const Order = () => {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = intl.format(selectedPizza?.sizes[pizzaSize] || 0);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzasRes.json();
    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <span>
              <input
                type="radio"
                id="pizza-s"
                name="pizza-size"
                value="S"
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "S"}
              />
              <label htmlFor="pizza-s">Small</label>
            </span>
            <span>
              <input
                type="radio"
                id="pizza-m"
                name="pizza-size"
                value="M"
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "M"}
              />
              <label htmlFor="pizza-m">Medium</label>
            </span>
            <span>
              <input
                type="radio"
                id="pizza-l"
                name="pizza-size"
                value="L"
                onChange={(e) => setPizzaSize(e.target.value)}
                checked={pizzaSize === "L"}
              />
              <label htmlFor="pizza-l">Large</label>
            </span>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading ? (
          <h1>Loading pizza</h1>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza?.name}
              description={selectedPizza?.description}
              image={selectedPizza?.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Order;
