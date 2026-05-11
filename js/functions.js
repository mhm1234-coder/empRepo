console.log("Pharmacy project running");

// ================= CART STORAGE =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// global cart
let cart = getCart();

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});

// ================= SEARCH =================
function searchProducts() {
  let input = document.getElementById("searchBox");

  if (!input) return;

  let value = input.value.toLowerCase().trim();
  let items = document.querySelectorAll(".product-card");

  items.forEach(item => {
    let text = item.textContent.toLowerCase();
    item.style.display = text.includes(value) ? "inline-block" : "none";
  });
}

// ================= ADD TO CART =================
function addItem(name, price) {
  let cart = getCart();

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);

  updateCartCount();
  showToast(`${name} added to cart`);
}

// ================= CART COUNT =================
function updateCartCount() {
  let cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  let cart = getCart();

  let totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  cartCount.innerText = totalItems;
}

// ================= CART TOTAL =================
function getCartTotal() {
  let cart = getCart();

  return cart.reduce((sum, item) => {
    return sum + item.price * (item.qty || 1);
  }, 0);
}
// ================= RENDER CART =================
function renderCart() {
  let table = document.querySelector(".cart-table");

  if (!table) return;

  let cart = getCart();

  let html = `
    <tr>
      <th>Medicine</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
      <th>Action</th>
    </tr>
  `;

  cart.forEach((item, index) => {
    let qty = item.qty || 1;
    let total = item.price * qty;

    html += `
      <tr>
        <td>${item.name}</td>
        <td>Rs ${item.price}</td>
        <td>${qty}</td>
        <td>Rs ${total}</td>
        <td>
          <button onclick="removeItem(${index})">Remove</button>
        </td>
      </tr>
    `;
  });

  table.innerHTML = html;

  let summary = document.querySelector(".cart-summary h3");

  if (summary) {
    summary.innerText = "Total: Rs " + getCartTotal();
  }
}

// ================= CLEAR CART =================
function clearCart() {
  localStorage.removeItem("cart");

  updateCartCount();
  renderCart();

  showToast("Cart cleared");
}

// ================= SIGNUP =================
function handleSignup(event) {
  event.preventDefault();

  let form = event.target;

  let name = form.name.value.trim();
  let email = form.email.value.trim();
  let password = form.password.value.trim();

  if (!name || !email || !password) {
    return showToast("All fields are required");
  }

  if (!email.includes("@")) {
    return showToast("Enter valid email");
  }

  if (password.length < 6) {
    return showToast("Password must be at least 6 characters");
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(u => u.email === email);

  if (exists) {
    return showToast("User already exists");
  }

  users.push({ name, email, password });

  localStorage.setItem("users", JSON.stringify(users));

  showToast("Signup successful");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

// ================= LOGIN =================
function handleLogin(event) {
  event.preventDefault();

  let email = document.getElementById("email")?.value.trim();
  let password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    return showToast("Fill all fields");
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return showToast("Invalid email or password");
  }

  localStorage.setItem("isLoggedIn", "true");

  showToast("Login successful");

  setTimeout(() => {
    window.location.href = "../pages/dashboard.html";
  }, 1000);
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("isLoggedIn");

  showToast("Logged out");

  window.location.href = "../index.html";
}

// ================= CONTACT =================
function handleContactForm(event) {
  event.preventDefault();

  let form = event.target;

  let name = form.name.value.trim();
  let email = form.email.value.trim();
  let message = form.message.value.trim();

  if (!name || !email || !message) {
    return showToast("Fill all fields");
  }

  showToast("Message sent successfully");

  form.reset();
}

// ================= TOAST =================
function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) return;

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// ================= INIT AGAIN =================
window.addEventListener("load", () => {
  updateCartCount();
  renderCart();
});