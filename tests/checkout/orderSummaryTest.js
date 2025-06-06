import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { Cart } from "../../data/cart-class.js";
import { mockLocalStorageWith } from "../data/cartTest.js";

import { loadProductsFetch } from "../../data/products.js";

describe("Test suite: renderOrderSummary", () => {
  let testCart;
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

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <header class="js-checkout-header"></header>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    // using this because the browser doesn't allow localStorage to be spied on
    mockLocalStorageWith([]);

    localStorage.getItem.and.returnValue(JSON.stringify(existingProducts));

    testCart = new Cart("cart-class");

    renderOrderSummary(testCart);
  });

  afterEach(() => {
    // delete the html after testing
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("Displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    // check if product 1 exists
    expect(
      document.querySelector(
        `.js-product-quantity-${existingProducts[0].productId}`
      ).innerText
    ).toContain("Quantity: 2");

    // check if product 2 exists
    expect(
      document.querySelector(
        `.js-product-quantity-${existingProducts[1].productId}`
      ).innerText
    ).toContain("Quantity: 1");

    // test if the name matches for product 1
    expect(
      document.querySelector(
        `.js-product-name-${existingProducts[0].productId}`
      ).innerText
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");

    // test if the name matches for product 2
    expect(
      document.querySelector(
        `.js-product-name-${existingProducts[1].productId}`
      ).innerText
    ).toContain("Intermediate Size Basketball");

    // test if the price matches for product 1
    expect(
      document.querySelector(
        `.js-product-price-${existingProducts[0].productId}`
      ).innerText
    ).toContain("$10.90");

    // test if the price matches for product 2
    expect(
      document.querySelector(
        `.js-product-price-${existingProducts[1].productId}`
      ).innerText
    ).toContain("$20.95");
  });

  it("Removes a product", () => {
    // deleting the first product

    document
      .querySelector(`.js-delete-link-${existingProducts[0].productId}`)
      .click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    // check if product 1 exists
    expect(
      document.querySelector(
        `.js-cart-item-container-${existingProducts[0].productId}`
      )
    ).toEqual(null);

    // check if product 2 exists
    expect(
      document.querySelector(
        `.js-cart-item-container-${existingProducts[1].productId}`
      )
    ).not.toEqual(null);

    // test if the name matches for product 2
    expect(
      document.querySelector(
        `.js-product-name-${existingProducts[1].productId}`
      ).innerText
    ).toContain("Intermediate Size Basketball");

    // test if the price matches for product 2
    expect(
      document.querySelector(
        `.js-product-price-${existingProducts[1].productId}`
      ).innerText
    ).toContain("$20.95");

    // check cart length after delete
    expect(testCart.cartItems.length).toEqual(1);

    // check if the item left in the cart is equal to the second item
    expect(testCart.cartItems[0].productId).toEqual(
      existingProducts[1].productId
    );
  });

  it("Updates the delivery option", () => {
    const firstItemId = existingProducts[0].productId;

    document.querySelector(`.js-delivery-option-${firstItemId}-3`).click();

    // test if the first product in the cart is checked with the 3rd delivery opt
    expect(
      document.querySelector(`.js-delivery-option-input-${firstItemId}-3`)
        .checked
    ).toEqual(true);

    // test if the cart length is correct
    expect(testCart.cartItems.length).toEqual(2);

    // test if the first product is correct
    expect(testCart.cartItems[0].productId).toEqual(firstItemId);

    // test if the delivery option for the first product in the cart is correct
    expect(testCart.cartItems[0].deliveryOptionId).toEqual("3");

    // test if the shipping price and total price are correct
    expect(
      document.querySelector(".js-payment-summary-shipping").innerText
    ).toEqual("$9.99");
    expect(
      document.querySelector(".js-payment-summary-total").innerText
    ).toEqual("$58.01");
  });
});
