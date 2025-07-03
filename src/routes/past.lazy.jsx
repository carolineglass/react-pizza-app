import { useState, Suspense, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import useCurrency from "../hooks/useCurrency";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../components/Modal";
import { Link } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  const [page, setPage] = useState(1);
  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 300000,
  }).promise;
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error("ErrorBoundary caught an error", error, errorInfo);
      }}
    >
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading past orders...</h2>
          </div>
        }
      >
        <PastOrders
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrders({ loadedPromise, page, setPage }) {
  const [focusedOrder, setFocusedOrder] = useState(null);
  const data = use(loadedPromise);

  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds
    enabled: !!focusedOrder,
  });

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder && (
        <Modal isOpen={!!focusedOrder} title={`Order #${focusedOrder}`}>
          {isLoadingPastOrder ? (
            <p>Loading...</p>
          ) : (
            <div className="past-order-details">
              <h2>Order #{focusedOrder}</h2>
              <table>
                <thead>
                  <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Size</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {pastOrderData.orderItems.map((pizza) => (
                    <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                      <td>
                        <img src={pizza.image} alt={pizza.name} width="50" />
                      </td>
                      <td>{pizza.name}</td>
                      <td>{pizza.size}</td>
                      <td>{pizza.quantity}</td>
                      <td>{useCurrency(pizza.price)}</td>
                      <td>{useCurrency(pizza.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            className="close-button"
            onClick={() => setFocusedOrder(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
