// ══════════════════════════════════════════════
//  SmartStore — Frontend Logic
//  Developer: Mahmoud (Frontend)
// ══════════════════════════════════════════════

// ── Products Data (مؤقت — لاحقاً من Backend سبيل) ──
const products = [
  {
    id: 1,
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1299,
    description: "High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor. Perfect for work and creative tasks.",
    emoji: "💻"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29,
    description: "Ergonomic wireless mouse with 2.4GHz connectivity, 12-month battery life, and silent click technology.",
    emoji: "🖱️"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89,
    description: "RGB mechanical keyboard with Cherry MX switches, full anti-ghosting, and durable aluminum frame.",
    emoji: "⌨️"
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Sports",
    price: 119,
    description: "Lightweight running shoes with advanced cushioning, breathable mesh, and non-slip rubber sole.",
    emoji: "👟"
  },
  {
    id: 5,
    name: "Water Bottle",
    category: "Sports",
    price: 24,
    description: "Insulated stainless steel bottle — keeps drinks cold 24h or hot 12h. BPA-free, leak-proof lid.",
    emoji: "🍶"
  },
  {
    id: 6,
    name: "Yoga Mat",
    category: "Sports",
    price: 45,
    description: "Non-slip eco-friendly yoga mat with alignment lines, 6mm cushioning, and carry strap included.",
    emoji: "🧘"
  },
  {
    id: 7,
    name: "Python Programming",
    category: "Books",
    price: 35,
    description: "Complete Python guide from beginner to advanced — covers OOP, data science, web dev, and AI basics.",
    emoji: "📘"
  },
  {
    id: 8,
    name: "Design Thinking",
    category: "Books",
    price: 28,
    description: "Learn human-centered design methods used by top tech companies. Includes real-world case studies.",
    emoji: "📗"
  },
];

// ── Category Colors ──────────────────────────
const categoryColors = {
  "Electronics": "#e8f0fe",
  "Sports":      "#e8f5e9",
  "Books":       "#fff3e0",
};

// ─────────────────────────────────────────────
//  PAGE: index.html — Render Products Grid
// ─────────────────────────────────────────────
function renderProductsGrid() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="product-card card h-100 shadow-sm"
           onclick="goToProduct(${product.id})">
        <div class="product-emoji-img d-flex align-items-center
                    justify-content-center bg-light"
             style="height:200px; font-size:80px;">
          ${product.emoji}
        </div>
        <div class="card-body d-flex flex-column">
          <span class="category-badge mb-2 d-inline-block">
            ${product.category}
          </span>
          <h6 class="fw-bold mb-1">${product.name}</h6>
          <p class="text-muted small flex-grow-1">
            ${product.description.substring(0, 60)}...
          </p>
          <div class="d-flex justify-content-between
                      align-items-center mt-2">
            <span class="price">$${product.price}</span>
          </div>
          <button class="btn-view mt-3">View Product</button>
        </div>
      </div>
    </div>
  `).join("");
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// ─────────────────────────────────────────────
//  PAGE: product.html — Render Product Detail
// ─────────────────────────────────────────────
function renderProductDetail() {
  const detail = document.getElementById("product-detail");
  if (!detail) return;

  // Get product ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    detail.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>Product not found</h3>
        <a href="index.html" class="btn btn-primary mt-3">Back to Home</a>
      </div>`;
    return;
  }

  // Render detail
  detail.innerHTML = `
    <div class="col-md-5 text-center">
      <div class="product-emoji-img d-flex align-items-center
                  justify-content-center bg-light rounded-4"
           style="height:350px; font-size:130px;">
        ${product.emoji}
      </div>
    </div>
    <div class="col-md-7">
      <span class="category-badge mb-3 d-inline-block fs-6">
        ${product.category}
      </span>
      <h1 class="product-detail-title">${product.name}</h1>
      <p class="text-muted mt-3 fs-5">${product.description}</p>
      <div class="product-detail-price mt-3">$${product.price}</div>
      <button class="btn-add-cart mt-4"
              onclick="addToCart('${product.name}')">
        🛒 Add to Cart
      </button>
    </div>
  `;

  // Trigger AI recommendations
  fetchRecommendations(product);
}

// ─────────────────────────────────────────────
//  AI Recommendations — Connected to Nourhan's Flask API
// ─────────────────────────────────────────────
async function fetchRecommendations(product) {
  const section = document.getElementById("recommendations-section");
  const loading = document.getElementById("rec-loading");
  const grid    = document.getElementById("recommendations-grid");
  if (!section || !grid) return;

  section.style.display = "block";
  loading.style.display = "block";
  grid.innerHTML = "";

  try {
    // ── الاتصال الحقيقي بنافذة الـ API الخاصة بنورهان في الـ Flask Backend ──
    const response = await fetch(`/api/recommendations?product_id=${product.id}`);
    const recommended = await response.json();

    loading.style.display = "none";

    if (!recommended || recommended.length === 0) {
      grid.innerHTML = `
        <div class="col-12">
          <p class="text-muted">No recommendations found.</p>
        </div>`;
      return;
    }

    // عرض المنتجات المقترحة القادمة من دالة الـ AI الخاصة بنورهان
    grid.innerHTML = recommended.map(rec => `
      <div class="col-6 col-md-3">
        <div class="rec-card" onclick="goToProduct(${rec.id})">
          <div class="d-flex align-items-center justify-content-center
                      bg-light" style="height:140px; font-size:60px;">
            ${rec.emoji}
          </div>
          <div class="rec-body">
            <div class="rec-name">${rec.name}</div>
            <div class="rec-price mt-1">$${rec.price}</div>
          </div>
        </div>
      </div>
    `).join("");

  } catch (error) {
    loading.style.display = "none";
    grid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning">
          ⚠️ Could not load recommendations. 
          Make sure Nourhan's Flask Backend is running.
        </div>
      </div>`;
  }
}

// ─────────────────────────────────────────────
//  Cart feedback
// ─────────────────────────────────────────────
function addToCart(name) {
  const btn = document.querySelector(".btn-add-cart");
  btn.textContent = "✅ Added!";
  btn.style.background = "#1a8a4a";
  setTimeout(() => {
    btn.textContent = "🛒 Add to Cart";
    btn.style.background = "";
  }, 2000);
}

// ─────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProductsGrid();
  renderProductDetail();
});