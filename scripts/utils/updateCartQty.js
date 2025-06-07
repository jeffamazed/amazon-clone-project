import { cart } from "../../data/cart-class.js";

export function updateCartQty(cartInstance = cart) {
  const cartQty = cartInstance.calculateCartQty();

  document.querySelector(".js-cart-quantity").textContent = cartQty;
}
