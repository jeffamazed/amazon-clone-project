import { deliveryOptions } from "./deliveryOptions.js";

export class Cart {
  #localStorageKey;

  constructor(localStorageKey) {
    this.cartItems = [];
    this.#localStorageKey = localStorageKey;

    this.#loadFromStorage();
  }

  #loadFromStorage() {
    try {
      const savedCartData = JSON.parse(
        localStorage.getItem(this.#localStorageKey)
      );

      if (Array.isArray(savedCartData)) {
        this.cartItems.length = 0;
        this.cartItems.push(...savedCartData);
      }
    } catch (e) {
      this.cartItems.length = 0;
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const filteredCart = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.cartItems.splice(0, this.cartItems.length, ...filteredCart);

    this.saveToStorage();
  }

  calculateCartQty() {
    const cartQty = this.cartItems.reduce(
      (qtys, curr) => qtys + curr.quantity,
      0
    );

    return cartQty;
  }

  updateQty(productId, newQty) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    matchingItem.quantity = newQty;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (!matchingItem) return;
    if (!deliveryOptions.some((option) => option.id === deliveryOptionId))
      return;

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  emptyCart() {
    this.cartItems.length = 0;
    this.saveToStorage();
  }
}

export const cart = new Cart("cart-class");

export async function loadCartFetch() {
  const res = await fetch("http://supersimplebackend.dev/cart");
  const text = await res.text();
  console.log(text);

  return text;
}
