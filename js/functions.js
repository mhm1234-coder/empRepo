console.log("PharmaCare Functions.js loaded");

/* =========================
   CART SYSTEM
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            qty: 1
        });
    }

    saveCart();
    loadCart();
    updateCartCount();   // ✅ FIX ADDED
    alert(name + " added to cart");
}

/* SAVE */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* CART COUNT */
function updateCartCount() {

    let count = cart.reduce((sum, item) => sum + item.qty, 0);

    let el = document.getElementById("cartCount");

    if (el) {
        el.innerText = count;
    }
}

/* LOAD CART */
function loadCart() {

    let table = document.getElementById("cartTable");
    if (!table) return;

    table.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center;">Cart Empty</td></tr>`;
        setTotal(0);
        updateCartCount();
        return;
    }

    cart.forEach((item, i) => {

        let itemTotal = item.price * item.qty;
        total += itemTotal;

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${itemTotal}</td>
                <td><button onclick="removeItem(${i})">Remove</button></td>
            </tr>
        `;
    });

    setTotal(total);
    updateCartCount();
}

/* TOTAL */
function setTotal(val) {
    let el = document.getElementById("totalBill");
    if (el) el.innerText = val;
}

/* REMOVE */
function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    loadCart();
    updateCartCount();
    alert("Item removed from cart");
}

/* CLEAR CART */
function clearCart() {
    cart = [];
    saveCart();
    loadCart();
    updateCartCount();
    alert("Cart cleared");
}

/* CHECKOUT */
function checkout() {

    if (cart.length === 0) {
        alert("Cart empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];
    saveCart();
    loadCart();
    updateCartCount();
}

/* =========================
   SEARCH
========================= */

function searchProducts(keyword) {

    let cards = document.querySelectorAll(".card");

    keyword = keyword.toLowerCase().trim();

    cards.forEach(card => {

        let text = card.innerText.toLowerCase();

        if (text.includes(keyword) || keyword === "") {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}

/* =========================
   INIT
========================= */

window.addEventListener("DOMContentLoaded", function () {
    loadCart();
    updateCartCount();
});