export default async function getPastOrder(orderId) {
  const response = await fetch(`/api/past-order/${orderId}`);
  const data = await response.json();
  return data;
}
