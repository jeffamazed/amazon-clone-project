import { updateCartQty } from "./utils/updateCartQty.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import { getDateString } from "./utils/getDateString.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
console.log(orders);

function calcProgressPercent(currentTime, deliveryTime, orderTime) {
  const elapsed = currentTime.diff(orderTime);
  const total = deliveryTime.diff(orderTime);

  const progress = (elapsed / total) * 100;
  const progressPercent = Math.min(Math.max(Math.round(progress), 0), 100);

  return progressPercent;
}

async function loadTrackingPage() {
  await loadProductsFetch();
  const container = document.querySelector(".js-main");

  const trackingUrl = new URL(window.location.href);
  const orderId = trackingUrl.searchParams.get("orderId");
  const productId = trackingUrl.searchParams.get("productId");
  const correctOrder = orders.find((order) => order.id === orderId);
  if (!correctOrder) {
    container.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      <p>Order not found.</p>
    `;
    return;
  }

  const correctProduct = correctOrder.products.find(
    (product) => product.productId === productId
  );
  if (!correctProduct) {
    container.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      <p>Product not found in order.</p>
    `;
    return;
  }

  const product = getProduct(productId);

  const currentTime = dayjs();
  const deliveryTime = dayjs(correctProduct.estimatedDeliveryTime);
  const orderTime = dayjs(correctOrder.orderTime);

  const dateString = getDateString(deliveryTime, 0, "dddd, MMMM D");

  const progressPercent = calcProgressPercent(
    currentTime,
    deliveryTime,
    orderTime
  );

  const trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <h1 class="delivery-date">
        Arriving on ${dateString}
      </h1>

      <p class="product-info">
        ${product.name}
      </p>

      <p class="product-info">
        Quantity: ${correctProduct.quantity}
      </p>

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
      />

      <div class="progress-labels-container">
        <span 
          class="progress-label ${progressPercent < 50 ? "current-status" : ""}"
        >
          Preparing
        </span>
        <span 
          class="progress-label ${
            progressPercent >= 50 && progressPercent < 100
              ? "current-status"
              : ""
          }"
        >
          Shipped
        </span>
        <span 
          class="progress-label ${
            progressPercent >= 100 ? "current-status" : ""
          }"
        >
          Delivered
        </span>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar"></div>
      </div>
    </div>
  `;

  container.innerHTML = trackingHTML;

  // change progress bar's width

  document.querySelector(
    ".js-progress-bar"
  ).style.width = `${progressPercent}%`;

  updateCartQty();
}

loadTrackingPage();
