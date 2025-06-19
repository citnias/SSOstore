let productList = [];

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
    const newProduct = {
      name: name,
      price: price,
      image: e.target.result
    };
    productList.push(newProduct);
    renderProducts();
    clearForm();
  };
  reader.readAsDataURL(image);
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  productList.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" />
      <span>${product.name}</span>
      <span>Rp ${Number(product.price).toLocaleString()}</span>
      <button onclick="editProduct(${index})">Edit</button>
      <button onclick="deleteProduct(${index})">Hapus</button>
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

function editProduct(index) {
  const newName = prompt("Nama produk baru:", productList[index].name);
  const newPrice = prompt("Harga baru:", productList[index].price);
  if (newName && newPrice) {
    productList[index].name = newName;
    productList[index].price = newPrice;
    renderProducts();
  }
}

function deleteProduct(index) {
  if (confirm("Hapus produk ini?")) {
    productList.splice(index, 1);
    renderProducts();
  }
}

function orderNow(name) {
  const phone = "628123456789"; // Ganti dengan nomor WA kamu
  const message = `Halo! Saya ingin memesan produk ${name}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}
