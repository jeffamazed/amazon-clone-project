import { calculateCartQty } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQty = calculateCartQty();
  const html = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img
            class="amazon-logo"
            src="images/amazon-logo.png"
            alt="Amazon logo"
          />
          <img
            class="amazon-mobile-logo"
            src="images/amazon-mobile-logo.png"
            alt="Amazon logo"
          />
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (
        <a
          class="return-to-home-link js-return-to-home-link"
          href="amazon.html"
        >
          ${cartQty} Items </a
        >)
      </div>

      <div class="checkout-header-right-section">
        <img
          src="images/icons/checkout-lock-icon.png"
          alt="Secure checkout"
        />
      </div>
    </div>`;

  document.querySelector(".js-checkout-header").innerHTML = html;
}
