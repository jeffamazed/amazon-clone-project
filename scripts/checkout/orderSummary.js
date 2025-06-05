import {
  cart,
  removeFromCart,
  calculateCartQty,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = ``;
  const today = dayjs();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const chosenDeliveryOpt = getDeliveryOption(deliveryOptionId);

    const deliveryDate = today.add(chosenDeliveryOpt.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date" role="status">
        Delivery date: ${dateString}
      </div>

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

            <div class="update-quantity-container">
              <input 
                type="number"
                min="1" 
                class="quantity-input js-quantity-input-${matchingProduct.id}" 
                value="${cartItem.quantity}" 
                data-product-id="${matchingProduct.id}"
              />

              <button 
                id="js-save-btn-${matchingProduct.id}"
                type="button" 
                class="save-quantity-link link-primary link-primary-btn js-save-quantity-link" 
                data-product-id="${matchingProduct.id}"
                aria-label="Save new quantity">
                Save
              </button>
            </div>

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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  // adding product's html dynamically
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //For delete buttons
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      updateCartQtyHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // For update buttons
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add("is-editing-quantity");
    });
  });

  // For save buttons
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const qtyInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQty = Number(qtyInput.value);

      if (newQty <= 0 || newQty >= 1000) {
        alert("Quantity must be at least 1 and less than 1000.");
        return;
      }

      updateQuantity(productId, newQty);
      updateItemQty(productId, newQty);
      updateCartQtyHeader();
      renderPaymentSummary();

      container.classList.remove("is-editing-quantity");
    });
  });

  // For quantity input with enter key
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      const productId = input.dataset.productId;
      const saveBtn = document.getElementById(`js-save-btn-${productId}`);

      if (e.key === "Enter") {
        saveBtn.click();
      }
    });
  });

  // For radio inputs
  document.querySelectorAll(".js-delivery-option").forEach((label) => {
    label.addEventListener("click", () => {
      const { productId, deliveryOptionId } = label.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderPaymentSummary();
      renderOrderSummary();
    });
  });

  updateCartQtyHeader();
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  const today = dayjs();

  // this updates the date based on dayjs()
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <label 
        class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id=${deliveryOption.id}
      >
        <input
          ${isChecked ? "checked" : ""}
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </label>
    `;
  });
  return html;
}

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
