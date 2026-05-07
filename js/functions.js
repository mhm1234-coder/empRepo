console.log("Pharmacy project running");

// ================= GLOBAL CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// ================= CATEGORY FILTER =================
function filterCategory(category) {
  let items = document.querySelectorAll(".product");

  items.forEach(item => {
    if (category === "all") {
      item.style.display = "block";
    } else {
      item.style.display = item.classList.contains(category)
        ? "block"
        : "none";
    }
  });
}
function searchProducts() {
  let input = document.getElementById("searchBox").value.toLowerCase();

  let items = document.querySelectorAll(".product");

  items.forEach(item => {

    let name = item.querySelector("h3").innerText.toLowerCase();

    let category = item.className.toLowerCase();

    if (
      name.includes(input) ||
      category.includes(input)
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

  });
}
// ================= ADD TO CART =================
function addItem(name, price) {
  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showToast(`${name} added to cart`);
}

// ================= CART COUNT =================
function updateCartCount() {
  let cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// ================= CART TOTAL =================
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// ================= SHOW CART =================
function showCart() {
  if (cart.length === 0) {
    showToast("Cart is empty");
    return;
  }

  let msg = "Cart Items:\n";

  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name} - Rs ${item.price}\n`;
  });

  msg += "\nTotal: Rs " + getCartTotal();

  showToast(msg);
}

// ================= CLEAR CART =================
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  showToast("Cart cleared");
}

// ================= SIGNUP  =================
function handleSignup(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let email = event.target.email.value;
  let password = event.target.password.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(u => u.email === email);

  if (exists) {
    showToast("User already exists");
    return false;
  }

  users.push({
    name,
    email,
    password: password // simple (no btoa for stability)
  });

  localStorage.setItem("users", JSON.stringify(users));

  showToast("Signup successful");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);

  return false;
}

// ================= LOGIN =================
function handleLogin(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showToast("Invalid login");
    return false;
  }

  localStorage.setItem("isLoggedIn", "true");

  showToast("Login successful");

  setTimeout(() => {
    window.location.href = "../pages/dashboard.html";
  }, 1000);

  return false;
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("isLoggedIn");
  showToast("Logged out");

  window.location.href = "../index.html";
}

// ================= CONTACT FORM =================
function handleContactForm(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let email = event.target.email.value;
  let message = event.target.message.value;

  if (!name || !email || !message) {
    showToast("Fill all fields");
    return false;
  }

  showToast("Message sent");
  event.target.reset();

  return false;
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

// ================= FOOTER AUTO =================
if (!document.querySelector("footer")) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer>
      <p>Contact: pharmacy@gmail.com</p>
      <p>Phone: 0300-1234567</p>
    </footer>`
  );
}
window.onload = function () {
  updateCartCount();
};