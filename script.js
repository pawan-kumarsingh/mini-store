// 1. Products ki list (array of objects)
const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Headphones", price: 999 },
  { id: 3, name: "Backpack", price: 1299 },
  { id: 4, name: "Water Bottle", price: 299 },
];

// 2. Cart ko localStorage se uthao (nahi hai to khali list)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 3. Products screen par dikhao
function showProducts() {
  const box = document.getElementById("products");
  box.innerHTML = "";
  products.forEach(p => {
    box.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

// 4. Cart mein add karo
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;                       // pehle se hai to quantity badhao
  } else {
    const p = products.find(p => p.id === id);
    cart.push({ ...p, qty: 1 });      // naya item
  }
  saveCart();
  showCart();
}

// 5. Quantity badlo (+1 ya -1)
function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);   // 0 ho gaya to hata do
  }
  saveCart();
  showCart();
}

// 6. Cart screen par dikhao + total
function showCart() {
  const box = document.getElementById("cart");
  box.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Cart khali hai</p>";
  }

  cart.forEach(i => {
    total += i.price * i.qty;
    box.innerHTML += `
      <div class="cart-item">
        <span>${i.name} (₹${i.price})</span>
        <span>
          <button onclick="changeQty(${i.id}, -1)">-</button>
          ${i.qty}
          <button onclick="changeQty(${i.id}, 1)">+</button>
        </span>
      </div>`;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// 7. Cart save karo
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 8. Fake checkout
function checkout(event) {
  event.preventDefault();             // page reload rokta hai
  if (cart.length === 0) {
    alert("Pehle cart mein kuch add karo!");
    return;
  }
  const name = document.getElementById("name").value;
  cart = [];
  saveCart();
  showCart();
  document.getElementById("checkout-form").reset();
  document.getElementById("message").innerText =
    "✅ Thank you " + name + "! Order successful.";
}

// 9. Page khulte hi chalao
showProducts();
showCart();