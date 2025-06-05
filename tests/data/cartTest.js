import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  const existingItem = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1",
    },
  ];

  beforeEach(() => {
    // using this because the browser doesnt allow localstorage to be spied on
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

  it("Adds a new product to the cart", () => {
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    // test if the length is 1 from added item
    expect(cart.length).toEqual(1);

    // test if setItem is called during loadFromStorage()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // test if the item is the expected item
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // test if the qty is 1
    expect(cart[0].quantity).toEqual(1);

    // test for checking if localStorage sets the same item
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("Adds an existing product to the cart", () => {
    localStorage.getItem.and.returnValue(JSON.stringify(existingItem));

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    // test for if there's item in the cart
    expect(cart.length).toEqual(1);

    // test if setItem it called during loadFromStorage()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // test if the item is the same
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // tst if the item quantity is the same
    expect(cart[0].quantity).toEqual(2);

    // test for checking if localStorage sets the same item with added qty
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});
