import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

export function mockLocalStorageWith(data) {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jasmine
        .createSpy("getItem")
        .and.returnValue(JSON.stringify(data)),
      setItem: jasmine.createSpy("setItem"),
      removeItem: jasmine.createSpy("removeItem"),
      clear: jasmine.createSpy("clear"),
    },
    writable: true,
  });
}

const existingItem = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: "1",
  },
];

describe("Test suite: addToCart", () => {
  beforeEach(() => {
    // using this because the browser doesnt allow localstorage to be spied on
    mockLocalStorageWith([]);
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

describe("Test suite: removeFromCart", () => {
  beforeEach(() => {
    // using this because the browser doesn't allow localStorage to be spied on
    mockLocalStorageWith(existingItem);

    loadFromStorage();
  });

  it("Removes a product that is in the cart based on productId", () => {
    // remove item with the same id
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // test if the cart updates correctly
    expect(cart.length).toEqual(0);

    // test if setItem is called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // test for checking if localStorage sets the same item
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([])
    );
  });

  it("Removes a product that is not in the cart based on productId", () => {
    //remove item with different id
    removeFromCart("definitely-not-the-product");

    // test if the product in cart is not removed by productId
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart[0].quantity).toEqual(1);

    // test if setItem is called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

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
});

describe("Test suite: updateDeliveryOption", () => {
  beforeEach(() => {
    // using this because the browser doesn't allow localStorage to be spied on
    mockLocalStorageWith(existingItem);

    loadFromStorage();
  });

  it("Updates the delivery option of a product in the cart", () => {
    const firstItemId = existingItem[0].productId;

    updateDeliveryOption(firstItemId, "3");

    // check if the item is correct
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // check if the item's quantity is correct
    expect(cart[0].quantity).toEqual(1);

    // check if the delivery option's first item in the cart has changed
    expect(cart[0].deliveryOptionId).toEqual("3");

    // check if the length of the cart is correct
    expect(cart.length).toEqual(1);

    // check if localStorage.setItem is called once and w/ correct args
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ])
    );
  });

  it("Handles edge cases well (incorrect product id passed as an argument)", () => {
    updateDeliveryOption("weird-id", "3");

    // check if the item in cart's content still the same
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(cart.length).toEqual(1);

    // check if localStorage.setItem is not called
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("Handles edge cases well (incorrect delivery option id passed as an argument", () => {
    const firstItemId = existingItem[0].productId;

    updateDeliveryOption(firstItemId, "nowhere-id");

    // check if the item cart's content still the same
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(cart.length).toEqual(1);

    // check if localStorage.setItem is not called
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
