import {
  getProduct,
  products,
  Product,
  Clothing,
  Appliance,
  loadProductsFetch,
} from "../../data/products.js";

describe("Test suite: getProduct", () => {
  let firstProduct;

  beforeEach(async () => {
    await loadProductsFetch();

    firstProduct = products[0];
  });

  it("Returns the matching product from products", () => {
    // check if the product's name is the same
    expect(getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6").name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );

    // check if the product's price is the same
    expect(
      getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6").priceCents
    ).toEqual(firstProduct.priceCents);
  });

  it("Handles edge cases (given a random id as an argument)", () => {
    // check if it returns undefined
    expect(getProduct("some-id")).toEqual(undefined);
  });
});

describe("Test suite: Product class", () => {
  let product;
  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });

  // check for id
  it("Has the correct id", () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });

  // check for image path
  it("Has the correct image", () => {
    expect(product.image).toEqual(
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
  });

  // check for name
  it("Has the correct name", () => {
    expect(product.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );
  });

  // check for stars rating
  it("Has the correct stars", () => {
    expect(product.rating.stars).toEqual(4.5);
  });

  // check for review count
  it("Has the correct review count", () => {
    expect(product.rating.count).toEqual(87);
  });

  // check for priceCents
  it("Has the correct priceCents", () => {
    expect(product.priceCents).toEqual(1090);
  });

  // check for getStarsUrl()
  it("Gets the correct stars url", () => {
    expect(product.getStarsUrl()).toEqual("images/ratings/rating-45.png");
  });

  // check for getPrice()
  it("Gets the correct price", () => {
    expect(product.getPrice()).toEqual("$10.90");
  });

  // check for extraInfoHTML()
  it("Doesn't display any extra info", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("Test suite: Clothing class", () => {
  let clothing;
  beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  // check for id
  it("Has the correct id", () => {
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
  });

  // check for image path
  it("Has the correct image", () => {
    expect(clothing.image).toEqual(
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    );
  });

  // check for name
  it("Has the correct name", () => {
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
  });

  // check for stars rating
  it("Has the correct stars", () => {
    expect(clothing.rating.stars).toEqual(4.5);
  });

  // check for review count
  it("Has the correct review count", () => {
    expect(clothing.rating.count).toEqual(56);
  });

  // check for priceCents
  it("Has the correct priceCents", () => {
    expect(clothing.priceCents).toEqual(799);
  });

  // check for getStarsUrl()
  it("Gets the correct stars url", () => {
    expect(clothing.getStarsUrl()).toEqual("images/ratings/rating-45.png");
  });

  // check for getPrice()
  it("Gets the correct price", () => {
    expect(clothing.getPrice()).toEqual("$7.99");
  });

  // check for extraInfoHTML()
  it("Displays an extra info", () => {
    expect(clothing.extraInfoHTML())
      .toContain(`<a href="images/clothing-size-chart.png" target="_blank">
        Size chart
      </a>`);
  });
});

describe("Test suite: Appliances class", () => {
  let appliance;
  beforeEach(() => {
    appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliances",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });

  // check for id
  it("Has the correct id", () => {
    expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
  });

  // check for image path
  it("Has the correct image", () => {
    expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
  });

  // check for name
  it("Has the correct name", () => {
    expect(appliance.name).toEqual("2 Slot Toaster - Black");
  });

  // check for stars rating
  it("Has the correct stars", () => {
    expect(appliance.rating.stars).toEqual(5);
  });

  // check for review count
  it("Has the correct review count", () => {
    expect(appliance.rating.count).toEqual(2197);
  });

  // check for priceCents
  it("Has the correct priceCents", () => {
    expect(appliance.priceCents).toEqual(1899);
  });

  // check for instructionsLink
  it("has the correct isntructions' link", () => {
    expect(appliance.instructionsLink).toEqual(
      "images/appliance-instructions.png"
    );
  });

  // check for warrantyLink
  it("has the correct warranty's link", () => {
    expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
  });

  // check for getStarsUrl()
  it("Gets the correct stars url", () => {
    expect(appliance.getStarsUrl()).toEqual("images/ratings/rating-50.png");
  });

  // check for getPrice()
  it("Gets the correct price", () => {
    expect(appliance.getPrice()).toEqual("$18.99");
  });

  // check for extraInfoHTML()
  it("Displays an extra info", () => {
    expect(appliance.extraInfoHTML()).toContain(`
      <a href="images/appliance-instructions.png" target="_blank">
        Instructions
      </a>
      <a href="images/appliance-warranty.png" target="_blank">
        Warranty
      </a>
    `);
  });
});
