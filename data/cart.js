export let cart = [];

try {
  const savedCartData = JSON.parse(localStorage.getItem("cart"));

  if (Array.isArray(savedCartData)) {
    cart.length = 0;
    cart.push(...savedCartData);
  } else {
    cart.length = 0;
  }
} catch (e) {
  cart.length = 0;
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const filteredCart = cart.filter(
    (cartItem) => cartItem.productId !== productId
  );

  cart.splice(0, cart.length, ...filteredCart);

  saveToStorage();
}

export function calculateCartQty() {
  let cartQty = 0;

  cart.forEach((cartItem) => {
    cartQty += cartItem.quantity;
  });

  return cartQty;
}

export function updateQty(productId, newQty) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  matchingItem.quantity = newQty;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
