export default async function getPastOrder(orderId) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/api/past-order/${orderId}`);
  const data = await response.json();
  return data;
}
