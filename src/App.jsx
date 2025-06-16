import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
    return (
      <div>
        <h1>Pizza Menu</h1>
        <Pizza name="Pepperoni" description="Mozzarella Cheese, Pepperoni" />
        <Pizza
          name="The Hawaiian Pizza"
          description="Sliced Ham, Pineapple, Mozzarella Cheese"
        />
        <Pizza
          name="The Big Meat Pizza"
          description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
        />
      </div>
    );
  };
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
