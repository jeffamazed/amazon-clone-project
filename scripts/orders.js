import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { getDate } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { cart } from "../data/cart-class.js";
import { updateCartQty } from "./utils/updateCartQty.js";

function renderOrderHeader(order) {
  const date = getDate(order.orderTime);

  return `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <p class="order-header-label">Order Placed:</p>
          <span>${date}</span>
        </div>
        <div class="order-total">
          <p class="order-header-label">Total:</p>
          <span>$${formatCurrency(order.totalCostCents)}</span>
        </div>
      </div>

      <div class="order-header-right-section">
        <p class="order-header-label">Order ID:</p>
        <span>${order.id}</span>
      </div>
    </div>
  `;
}

function renderOrderedProducts(orderedProducts, order) {
  const orderedProductsHTML = orderedProducts.reduce((html, orderedProduct) => {
    const matchingProduct = getProduct(orderedProduct.productId);
    const date = getDate(orderedProduct.estimatedDeliveryTime);

    return (html += `
      <div class="product-image-container">
        <img
          src="${matchingProduct.image}"
          alt="${matchingProduct.name}"
        />
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">Arriving on: ${date}</div>
        <div class="product-quantity">
          Quantity: ${orderedProduct.quantity}
        </div>
        <button
          type="button"
          class="buy-again-button 
          js-buy-again-button
          button-primary"
          data-product-id="${orderedProduct.productId}"
          aria-label="Buy item again"
        >
          <img
            class="buy-again-icon"
            src="images/icons/buy-again.png"
            alt="Buy again icon"
          />
          <span class="buy-again-message">
            Buy it again
          </span>
        </button>
      </div>

      <div class="product-actions">
        <a 
          href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}"
        >
          <button
            type="button"
            class="track-package-button button-secondary"
            aria-label="Track package"
          >
            Track package
          </button>
        </a>
      </div>
    `);
  }, "");

  return orderedProductsHTML;
}

async function loadPage(ordersInstance = orders) {
  await loadProductsFetch();
  let ordersHTML = "";

  // check if there are no orders
  if (ordersInstance.length === 0) {
    ordersHTML += `
      <div class="order-container">
        <p>There are currently no active orders.</p>
      </div>
    `;
  }

  ordersInstance.forEach((order) => {
    ordersHTML += `
      <div class="order-container">
        ${renderOrderHeader(order)}
        <div class="order-details-grid">
          ${renderOrderedProducts(order.products, order)}
        </div>
      </div>
    `;
  });

  // render the HTML
  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;

  // listeners for buy again button

  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    let timeoutId;

    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId, 1);

      button.innerHTML = "Added";

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        button.innerHTML = `
          <img
            class="buy-again-icon"
            src="images/icons/buy-again.png"
            alt="Buy again icon"
          />
          <span class="buy-again-message">
            Buy it again
          </span>
        `;
      }, 1500);

      updateCartQty();
    });
  });

  updateCartQty();
}

loadPage();
// console.log(orders);
console.log(cart.cartItems);
