import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay";
import { renderHook, waitFor } from "@testing-library/react";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const mockPizza = {
  id: "Pepperoni Delight",
  name: "A classic pizza with pepperoni and cheese.",
  category: "Meat",
  description: "A classic pizza with pepperoni and cheese.",
  image: "/public/pizza/pepperoni.jpg",
  size: { S: 12.25, M: 16.25, L: 20.25 },
};

test("gives null when first rendered", async () => {
  fetch.mockResponseOnce(JSON.stringify(mockPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current.pizzaOfTheDay).toBeNull();
});

test("to call the API and return pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(mockPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(() => {
    expect(result.current.pizzaOfTheDay).toEqual(mockPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
