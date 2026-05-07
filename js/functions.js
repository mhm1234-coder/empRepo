console.log("Pharmacy project running");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CATEGORY FUNCTION ================= */

function filterCategory(category) {
  let items = document.querySelectorAll(".product");

  items.forEach(item => {
    if (category === "all") {
      item.style.display = "block";
    } else {
      if (item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}
/* ================= CART FUNCTION ================= */

/**
 * Add item to shopping cart
 */
function addItem(name, price) {
  let item = { name, price };

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  showToast(name + " added to cart!");
}

/**
 * Show all cart items
 */
function showCart() {
  if (cart.length === 0) {
    showToast("Cart is empty!");
    return;
  }

  let message = "Cart Items:\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - Rs ${item.price}\n`;
  });

  message += "\nTotal: Rs " + getCartTotal();

  showToast(message);
}
function updateCartCount() {
  let cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
/* ================= LOGIN FUNCTION ================= */
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    showToast("Invalid credentials!");
    return false;
  }

  localStorage.setItem("isLoggedIn", true);

  showToast("Login successful!");

  setTimeout(() => {
    window.location.href = "../pages/dashboard.html";
  }, 1000);

  return true;
}



/* ================= SIGNUP FUNCTION ================= */
function signupUser(name, email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(u => u.email === email);

  if (exists) {
    showToast("User already exists!");
    return false;
  }

  users.push({
    name,
    email,
    password: btoa(password)
  });

  localStorage.setItem("users", JSON.stringify(users));

  showToast("Signup successful!");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);

  return true;
}


/* ================= CONTACT FORM ================= */
function handleContactForm(event){
  event.preventDefault();

  let name = event.target.name.value;
  let email = event.target.email.value;
  let message = event.target.message.value;

  if (!name || !email || !message) {
    showToast("Please fill all fields!");
    return false;
  }

  showToast("Message sent successfully!");
  event.target.reset();
}


/* ================= LOGIN  ================= */
function handleLogin(event){
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  return loginUser(email, password);
}
/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("isLoggedIn");
  showToast("Logged out successfully!");

  window.location.href = "../index.html";
}
/* ================= TOAST FUNCTION ================= */
function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) return;

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}
  /* ================= FOOTER FUNCTION ================= */
if (!document.querySelector("footer")) {
  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <p>Contact: pharmacy@gmail.com</p>
      <p>Phone: 0300-1234567</p>
    </footer>
  `);
};