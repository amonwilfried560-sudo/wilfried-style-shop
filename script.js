// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Data catalogue
const products = [
  {
    id: 1,
    title: "Tee-shirt Homme",
    price: 4500,
    category: "vetements",
    sizes: ["M", "L", "XL"],
    colors: ["Noir", "Blanc", "Gris"],
    desc: "Coupe confortable, coton premium.",
    image: "assets/tshirt1.jpg"
  },
  {
    id: 2,
    title: "Jogger Sport",
    price: 9000,
    category: "vetements",
    sizes: ["M", "L", "XL"],
    colors: ["Noir", "Gris"],
    desc: "Jogger léger, idéal quotidien.",
    image: "assets/jogger1.jpg"
  },
  {
    id: 3,
    title: "Mocassins Classiques",
    price: 18000,
    category: "chaussures",
    sizes: ["41", "42", "43", "44"],
    colors: ["Marron", "Noir"],
    desc: "Look élégant, semelle confortable.",
    image: "assets/mocassins1.jpg"
  },
  {
    id: 4,
    title: "Sandales Homme",
    price: 12000,
    category: "chaussures",
    sizes: ["41", "42", "43", "44"],
    colors: ["Noir"],
    desc: "Sandales robustes, parfaites pour la ville.",
    image: "assets/sandales1.jpg"
  },
  {
    id: 5,
    title: "Air Force Style",
    price: 22000,
    category: "chaussures",
    sizes: ["41", "42", "43", "44"],
    colors: ["Blanc"],
    desc: "Style iconique, finition soignée.",
    image: "assets/airforce1.jpg"
  },
  {
    id: 6,
    title: "Pull léger",
    price: 11000,
    category: "vetements",
    sizes: ["M", "L", "XL"],
    colors: ["Bleu", "Gris"],
    desc: "Confort mi-saison, texture douce.",
    image: "assets/pull1.jpg"
  }
];

// Helpers
const formatPrice = (x) => new Intl.NumberFormat('fr-FR').format(x) + " F";

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');

function renderProducts(list) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<div class="card"><p>Aucun produit trouvé. Essaie un autre mot-clé ou catégorie.</p></div>`;
    return;
  }
  list.forEach(p => {
    const el = document.createElement('div');
    el.className = "card product";
    el.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div>
        <div class="product__meta">
          <div class="product__title">${p.title}</div>
          <div class="product__price">${formatPrice(p.price)}</div>
        </div>
        <p class="product__desc">${p.desc}</p>
        <p class="product__desc"><strong>Tailles:</strong> ${p.sizes.join(", ")} — <strong>Couleurs:</strong> ${p.colors.join(", ")}</p>
        <div class="product__actions">
          <a class="btn btn--primary" target="_blank"
             href="https://wa.me/2250778293874?text=${encodeURIComponent(`Bonjour, je veux ${p.title} (${formatPrice(p.price)}). Tailles: ${p.sizes.join('/')} — Couleurs: ${p.colors.join('/')}.`) }">
             Commander
          </a>
          <button class="btn btn--ghost" onclick="copyInfo(${p.id})">Copier infos</button>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

function copyInfo(id) {
  const p = products.find(x => x.id === id);
  const text = `${p.title} — ${formatPrice(p.price)} — Tailles: ${p.sizes.join('/')} — Couleurs: ${p.colors.join('/')}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Informations copiées !");
  });
}

function applyFilters() {
  let list = [...products];
  const q = searchInput.value.trim().toLowerCase();
  const cat = categorySelect.value;
  const sort = sortSelect.value;

  if (cat !== "all") {
    list = list.filter(p => p.category === cat);
  }
  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }
  if (sort === "priceAsc") list.sort((a,b) => a.price - b.price);
  if (sort === "priceDesc") list.sort((a,b) => b.price - a.price);

  renderProducts(list);
}

searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// Initial render
renderProducts(products);
applyFilters();
