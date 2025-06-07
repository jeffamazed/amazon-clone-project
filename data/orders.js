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
