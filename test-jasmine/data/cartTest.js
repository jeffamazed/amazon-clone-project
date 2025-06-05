import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  // using this because the browser doesnt allow localstorage to be spied on
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jasmine
          .createSpy("getItem")
          .and.returnValue(JSON.stringify([])),
        setItem: jasmine.createSpy("setItem"),
        removeItem: jasmine.createSpy("removeItem"),
        clear: jasmine.createSpy("clear"),
      },
      writable: true,
    });
  });

  it("Adds an existing product to the cart", () => {
    const existingItem = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    localStorage.getItem.and.returnValue(JSON.stringify(existingItem));

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("Adds a new product to the cart", () => {
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
