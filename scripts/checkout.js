import {
  cart,
  removeFromCart,
  calculateCartQty,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = ``;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = products.find((product) => product.id === productId);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
          alt="${matchingProduct.name}"
        />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span> Quantity: 
              <span 
                role="status"
                class="quantity-label js-quantity-label-${matchingProduct.id}">
                ${cartItem.quantity}
              </span> 
            </span>
            <button 
              type="button" 
              class="update-quantity-link link-primary link-primary-btn js-update-link" 
              data-product-id="${matchingProduct.id}"
              aria-label="Update quantity">
              Update
            </button>
            <form class="update-quantity-form js-update-quantity-form-${
              matchingProduct.id
            }">
              <input type="number"
              min="0" name="quantity" class="quantity-input" value="1" />

              <button 
                type="button" 
                class="save-quantity-link link-primary link-primary-btn js-save-quantity-link" 
                data-product-id="${matchingProduct.id}"
                aria-label="Save new quantity">
                Save
              </button>
            </form>

            <button 
              type="button" 
              class="delete-quantity-link link-primary link-primary-btn js-delete-link" 
              data-product-id="${matchingProduct.id}"
              aria-label="Delete product">
              Delete
            </button>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <label class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </label>
          <label class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </label>
          <label class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
    updateCartQtyHeader();
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const formEl = document.querySelector(
      `.js-update-quantity-form-${productId}`
    );
    const selectedItem = cart.find(
      (cartItem) => cartItem.productId === productId
    );
    formEl.elements["quantity"].value = selectedItem.quantity;

    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const formEl = document.querySelector(
      `.js-update-quantity-form-${productId}`
    );
    const newQty = Number(formEl.elements["quantity"].value);

    updateQuantity(productId, newQty);
    updateItemQty(productId, newQty);
    updateCartQtyHeader();

    container.classList.remove("is-editing-quantity");
  });
});

function updateCartQtyHeader() {
  const cartQty = calculateCartQty();

  document.querySelector(
    ".js-return-to-home-link"
  ).textContent = `${cartQty} Items`;
}

function updateItemQty(productId, newQty) {
  const selectedSpan = document.querySelector(
    `.js-quantity-label-${productId}`
  );
  selectedSpan.textContent = newQty;
}

updateCartQtyHeader();
