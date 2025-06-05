import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("Test suite: renderOrderSummary", () => {
  const existingProducts = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "1",
    },
  ];

  beforeEach(() => {
    // using this because the browser doesn't allow localStorage to be spied on
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

    document.querySelector(".js-test-container").innerHTML = `
      <header class="js-checkout-header"></header>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    localStorage.getItem.and.returnValue(JSON.stringify(existingProducts));

    loadFromStorage();

    renderOrderSummary();
  });

  it("Displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    // checking product 1
    expect(
      document.querySelector(
        `.js-product-quantity-${existingProducts[0].productId}`
      ).innerText
    ).toContain("Quantity: 2");

    // checking product 2
    expect(
      document.querySelector(
        `.js-product-quantity-${existingProducts[1].productId}`
      ).innerText
    ).toContain("Quantity: 1");

    // delete the html after testing
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("Removes a product", () => {
    // deleting the first product
    document
      .querySelector(`.js-delete-link-${existingProducts[0].productId}`)
      .click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    // check for product 1
    expect(
      document.querySelector(
        `.js-cart-item-container-${existingProducts[0].productId}`
      )
    ).toEqual(null);

    // check for product 2
    expect(
      document.querySelector(
        `.js-cart-item-container-${existingProducts[1].productId}`
      )
    ).not.toEqual(null);

    // check cart length after delete
    expect(cart.length).toEqual(1);

    // check if the item left in the cart is equal to the second item
    expect(cart[0].productId).toEqual(existingProducts[1].productId);

    // delete the html after testing
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
