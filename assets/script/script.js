// Mendapatkan referensi ke elemen-elemen HTML
const containerMenu = document.getElementById("menu");
const containerKeranjang = document.getElementById("keranjang");
const tombolTambahKeranjang = document.getElementById("tombolTambahKeranjang");

// Daftar menu dengan informasi nama, harga, dan gambar
const daftarMenu = [
  {
    nama: "Nasi Goreng",
    harga: 12000,
    image: "assets/image/nasigoreng.jpeg",
    class: "menu",
  },
  {
    nama: "Mie Goreng",
    harga: 8000,
    image: "assets/image/miegoreng.jpeg",
    class: "menu",
  },
  {
    nama: "Mie Rebus",
    harga: 8000,
    image: "assets/image/mierebus.jpeg",
    class: "menu",
  },
  {
    nama: "Magelangan",
    harga: 14000,
    image: "assets/image/magelangan.jpeg",
    class: "menu",
  },
  {
    nama: "Es Teh",
    harga: 2000,
    image: "assets/image/esteh.jpeg",
    class: "menu",
  },
  {
    nama: "Es Jeruk",
    harga: 3000,
    image: "assets/image/esjeruk.jpeg",
    class: "menu",
  },
];

// Function to search for food items
function searchFood() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredFoods = daftarMenu.filter((food) =>
    food.nama.toLowerCase().includes(searchTerm)
  );
  tampilanMenu(filteredFoods);
}

// Function to sort food items
function sortFood() {
  const sortBy = document.getElementById("sort").value;
  let sortedFoods = [...daftarMenu];
  if (sortBy === "name_asc") {
    sortedFoods.sort((a, b) => a.nama.localeCompare(b.nama));
  } else if (sortBy === "name_desc") {
    sortedFoods.sort((a, b) => b.nama.localeCompare(a.nama));
  } else if (sortBy === "price_asc") {
    sortedFoods.sort((a, b) => a.harga - b.harga);
  } else if (sortBy === "price_desc") {
    sortedFoods.sort((a, b) => b.harga - a.harga);
  }
  tampilanMenu(sortedFoods);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  // Event listener untuk pencarian
  searchInput.addEventListener("input", function () {
    searchFood();
  });

  // Event listener untuk penyortiran
  sortSelect.addEventListener("change", function () {
    sortFood();
  });
});

function tampilanMenu(menuItems = daftarMenu) {
  containerMenu.innerHTML = "<h2>Menu</h2>";

  // pengulangan melalui daftarMenu atau menuItems untuk membuat elemen-elemen menu
  menuItems.forEach((item) => {
    const menu = document.createElement("div");
    menu.innerHTML = `
              <div class="menu-item">
                  <img class="${item.class}" src="${item.image}" alt="${item.nama}">
                  <h3>${item.nama}</h3>
                  <p>Harga: Rp ${item.harga}</p>
                  <label>Jumlah Pesanan: <input type="number" name="jumlah" value="0"></label>
              </div>
          `;
    // Menambahkan elemen menu ke dalam containerMenu
    containerMenu.appendChild(menu);
  });
}

containerKeranjang.innerHTML = "<h1>Keranjang</h1>";

function transaksi() {
  containerKeranjang.innerHTML = "<h1>Keranjang</h1>";
  let totalTagihan = 0;

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((menuItem) => {
    const jumlah = parseInt(
      menuItem.querySelector('input[name="jumlah"]').value
    );

    if (jumlah > 0) {
      const namaMenu = menuItem.querySelector("h3").textContent;
      const hargaMenu = daftarMenu.find((item) => item.nama === namaMenu).harga;
      const totalHarga = hargaMenu * jumlah;

      const itemKeranjang = document.createElement("div");
      itemKeranjang.innerHTML = `<p>${namaMenu} x ${jumlah} = Rp ${totalHarga}</p>`;
      containerKeranjang.appendChild(itemKeranjang);
      totalTagihan += totalHarga;
    }
  });

  const totalPemesanan = document.createElement("h3");
  totalPemesanan.textContent = `Total Tagihan: Rp ${totalTagihan}`;
  containerKeranjang.appendChild(totalPemesanan);
}

tampilanMenu();

tombolTambahKeranjang.addEventListener("click", function () {
  transaksi();
});
