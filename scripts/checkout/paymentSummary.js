import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const chosenDeliveryOpt = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += chosenDeliveryOpt.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <h2 class="payment-summary-title">Order Summary</h2>

    <dl>
      <div class="payment-summary-row">
        <dt>Items (3):</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(productPriceCents)}
        </dd>
      </div>

      <div class="payment-summary-row">
        <dt>Shipping &amp; handling:</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(shippingPriceCents)}
        </dd>
      </div>

      <div class="payment-summary-row subtotal-row">
        <dt>Total before tax:</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(totalBeforeTaxCents)}
        </dd>
      </div>

      <div class="payment-summary-row">
        <dt>Estimated tax (10%):</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(taxCents)}
        </dd>
      </div>

      <div class="payment-summary-row total-row">
        <dt>Order total:</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(totalCents)}
        </dd>
      </div>
    </dl>

    <button
      type="button"
      class="place-order-button button-primary"
      aria-label="Place order"
    >
      Place your order
    </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
