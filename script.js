let productList = [];

function loadProducts() {
  const saved = localStorage.getItem("produk");
  if (saved) {
    productList = JSON.parse(saved);
  } else {
    productList = [];
  }
}

function saveProducts() {
  localStorage.setItem("produk", JSON.stringify(productList));
}

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageInput = document.getElementById("productImage");
  const image = imageInput.files[0];

  if (!name || !price || !image) {
    alert("Lengkapi semua data!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    // 👉 load dulu agar tidak timpa data lama
    loadProducts();

    const newProduct = {
      name: name,
      price: price,
      image: e.target.result
    };
    productList.push(newProduct);

    // 👉 simpan ke localStorage
    saveProducts();

    // 👉 render ulang
    renderProducts(true);
    clearForm();
  };
  reader.readAsDataURL(image);
}

function editProduct(index) {
  const newName = prompt("Nama produk baru:", productList[index].name);
  const newPrice = prompt("Harga baru:", productList[index].price);
  if (newName && newPrice) {
    productList[index].name = newName;
    productList[index].price = newPrice;
    saveProducts();
    renderProducts(true);
  }
}

function deleteProduct(index) {
  if (confirm("Hapus produk ini?")) {
    productList.splice(index, 1);
    saveProducts();
    renderProducts(true);
  }
}

function orderNow(name) {
  const phone = "628123456789"; // Ganti dengan nomor WA kamu
  const message = `Halo! Saya ingin membeli produk ${name}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

function renderProducts(isAdmin = false) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  loadProducts();

  productList.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" />
      <span>${product.name}</span>
      <span>Rp ${Number(product.price).toLocaleString()}</span>
      ${isAdmin ? `
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Hapus</button>
      ` : ""}
      <button onclick="orderNow('${product.name}')">Beli</button>
    `;
    list.appendChild(div);
  });
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
}

// Fungsi inisialisasi khusus tiap halaman
function initAdmin() {
  loadProducts();
  renderProducts(true);
}
function initCustomer() {
  loadProducts();
  renderProducts(false);
}
