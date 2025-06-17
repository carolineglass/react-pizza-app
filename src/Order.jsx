import { useState } from "react";
import Pizza from "./Pizza";

export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
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
              <option value="pepperoni">Pepperoni</option>
              <option value="hawaiian">Hawaiian</option>
              <option value="big_meat">Big Meat</option>
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
        <div className="order-pizza">
          <Pizza
            name="pepperoni"
            description="Mozzarella Cheese, Pepperoni"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}
