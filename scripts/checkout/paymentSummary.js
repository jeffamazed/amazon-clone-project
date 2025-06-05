import { cart, calculateCartQty } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  const productPriceCents = cart.reduce((sum, cartItem) => {
    const product = getProduct(cartItem.productId);
    return (sum += product.priceCents * cartItem.quantity);
  }, 0);

  const shippingPriceCents = cart.reduce((sum, cartItem) => {
    const chosenDeliveryOpt = getDeliveryOption(cartItem.deliveryOptionId);
    return (sum += chosenDeliveryOpt.priceCents);
  }, 0);

  const cartQty = calculateCartQty();

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <h2 class="payment-summary-title">Order Summary</h2>

    <dl>
      <div class="payment-summary-row">
        <dt>Items (${cartQty}):</dt>
        <dd class="payment-summary-money">
          $${formatCurrency(productPriceCents)}
        </dd>
      </div>

      <div class="payment-summary-row">
        <dt>Shipping &amp; handling:</dt>
        <dd 
          class="payment-summary-money
          js-payment-summary-shipping"
        >
          $${formatCurrency(shippingPriceCents)}
        </dd>
      </div>

      <div class="payment-summary-row subtotal-row">
        <dt>Total before tax:</dt>
        <dd 
          class="payment-summary-money"
        >
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
        <dd 
          class="payment-summary-money
          js-payment-summary-total"
        >
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
