import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const orders = [];

try {
  const savedOrders = JSON.parse(localStorage.getItem("orders"));

  if (Array.isArray(savedOrders)) {
    orders.length = 0;
    orders.push(...savedOrders);
  }
} catch (e) {
  orders.length = 0;
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
console.log(orders);

export function getDate(orderTime) {
  const date = dayjs(orderTime).format("MMMM D");
  return date;
}
