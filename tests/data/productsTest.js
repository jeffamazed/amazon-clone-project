import { getProduct, products } from "../../data/products.js";

describe("Test suite: getProduct", () => {
  const firstProduct = products[0];

  it("Returns the matching product from products", () => {
    // check if the product's name is the same
    expect(getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6").name).toEqual(
      firstProduct.name
    );

    // check if the product's price is the same
    expect(
      getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6").priceCents
    ).toEqual(firstProduct.priceCents);
  });
});
