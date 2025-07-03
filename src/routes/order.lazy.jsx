import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../components/Pizza";
import Cart from "../components/Cart";
import { CartContext } from "../contexts";

const apiUrl = import.meta.env.VITE_API_URL;

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);

    await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
    alert("Order placed successfully!");
  }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = intl.format(selectedPizza?.sizes[pizzaSize] || 0);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    const pizzasRes = await fetch(`${apiUrl}/api/pizzas`);
    const pizzasJson = await pizzasRes.json();
    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
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
      {loading ? <h1>Loading...</h1> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}

export default Order;
