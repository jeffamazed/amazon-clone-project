import { cart, addToCart, calculateCartQty } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${
          product.rating.count
        }</div>
      </div>

      <div class="product-price">$${formatCurrency(product.priceCents)}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div 
        class="added-to-cart js-added-to-cart-${product.id}"
        aria-describedby="cart-announce"
      >
        <img src="images/icons/checkmark.png" alt="" aria-hidden="true" />
        <span >Added</span>
      </div>

      <button 
        type="button" 
        class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}" 
        aria-label="Add ${product.name} to cart"
      >
          Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQty() {
  const cartQty = calculateCartQty();

  document.querySelector(".js-cart-quantity").textContent = cartQty;
}

// for toggling "Added" msg
const addedMsgTimeouts = {};
function handleAddedMsg(productId) {
  const addedMsgContainer = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  addedMsgContainer.classList.add("added-to-cart-visible");

  // check for previous timeouts
  const prevTimeout = addedMsgTimeouts[productId];
  if (prevTimeout) {
    clearTimeout(prevTimeout);
  }

  const timeoutId = setTimeout(() => {
    addedMsgContainer.classList.remove("added-to-cart-visible");
  }, 2000);
  addedMsgTimeouts[productId] = timeoutId;
}

// timeout collections based on id

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const qtySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(qtySelector.value);

    addToCart(productId, quantity);
    updateCartQty();
    handleAddedMsg(productId);
  });
});

updateCartQty();
