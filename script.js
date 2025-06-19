let productList = [];

function loadProducts() {
  const saved = localStorage.getItem("produk");
  productList = saved ? JSON.parse(saved) : [];
}

function saveProducts() {
  localStorage.setItem("produk", JSON.stringify(productList));
}

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const imageInput = document.getElementById("productImage");
  const image = imageInput.files[0];

  if (!name || !price || !image) {
    alert("Isi semua kolom sebelum menambahkan produk.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    loadProducts();
    const newProduct = {
      name,
      price,
      image: e.target.result
    };
    productList.push(newProduct);
    saveProducts();
    renderProducts(true);
    clearForm();
  };
  reader.readAsDataURL(image);
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
}

function renderProducts(isAdmin = false) {
  loadProducts();
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  productList.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" />
      <span>${product.name}</span>
      <span>Rp ${Number(product.price).toLocaleString("id-ID")}</span>
      ${isAdmin ? `
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Hapus</button>
      ` : ""}
      <button onclick="orderNow('${product.name}')">Beli</button>
    `;
    list.appendChild(div);
  });
}

function editProduct(index) {
  const newName = prompt("Nama baru:", productList[index].name);
  const newPrice = prompt("Harga baru:", productList[index].price);
  if (newName && newPrice) {
    productList[index].name = newName;
    productList[index].price = newPrice;
    saveProducts();
    renderProducts(true);
  }
}

function deleteProduct(index) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    productList.splice(index, 1);
    saveProducts();
    renderProducts(true);
  }
}

function orderNow(productName) {
  const phone = "628123456789"; // Ganti dengan nomor WA kamu
  const msg = `Halo, saya ingin membeli produk ${productName}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

function initPage(isAdmin) {
  renderProducts(isAdmin);
}
