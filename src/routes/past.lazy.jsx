import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/past")({
  component: PastOrders,
});

function PastOrders() {
  return <div>Past Orders</div>;
}
