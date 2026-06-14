# ==========================================================
# Project: Smart E-commerce Store with AI Recommendation
# Role: AI Developer (Nourhan)
# Target: AI Recommendation Logic based on Categories
# ==========================================================

# قاعدة البيانات الموحدة للمتجر المتوافقة تماماً مع واجهة محمود
products_database = [
    {
        "id": 1,
        "name": "Laptop Pro 15",
        "category": "Electronics",
        "price": 1299,
        "description": "High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor. Perfect for work and creative tasks.",
        "emoji": "💻"
    },
    {
        "id": 2,
        "name": "Wireless Mouse",
        "category": "Electronics",
        "price": 29,
        "description": "Ergonomic wireless mouse with 2.4GHz connectivity, 12-month battery life, and silent click technology.",
        "emoji": "🖱️"
    },
    {
        "id": 3,
        "name": "Mechanical Keyboard",
        "category": "Electronics",
        "price": 89,
        "description": "RGB mechanical keyboard with Cherry MX switches, full anti-ghosting, and durable aluminum frame.",
        "emoji": "⌨️"
    },
    {
        "id": 4,
        "name": "Running Shoes",
        "category": "Sports",
        "price": 119,
        "description": "Lightweight running shoes with advanced cushioning, breathable mesh, and non-slip rubber sole.",
        "emoji": "👟"
    },
    {
        "id": 5,
        "name": "Water Bottle",
        "category": "Sports",
        "price": 24,
        "description": "Insulated stainless steel bottle — keeps drinks cold 24h or hot 12h. BPA-free, leak-proof lid.",
        "emoji": "🍶"
    },
    {
        "id": 6,
        "name": "Yoga Mat",
        "category": "Sports",
        "price": 45,
        "description": "Non-slip eco-friendly yoga mat with alignment lines, 6mm cushioning, and carry strap included.",
        "emoji": "🧘"
    },
    {
        "id": 7,
        "name": "Python Programming",
        "category": "Books",
        "price": 35,
        "description": "Complete Python guide from beginner to advanced — covers OOP, data science, web dev, and AI basics.",
        "emoji": "📘"
    },
    {
        "id": 8,
        "name": "Design Thinking",
        "category": "Books",
        "price": 28,
        "description": "Learn human-centered design methods used by top tech companies. Includes real-world case studies.",
        "emoji": "📗"
    }
]

def get_products_by_category(product_id, num_recommendations=3):
    """
    دالة الذكاء الاصطناعي (AI Logic):
    تستقبل معرّف المنتج المختار، تحلل فئته، وتسترجع المنتجات المشابهة في الفئة 
    مع استبعاد المنتج الحالي وتحديد عدد المخرجات لضمان جودة الواجهة.
    """
    # البحث عن المنتج الحالي داخل قاعدة البيانات
    current_product = next((p for p in products_database if p["id"] == product_id), None)
    if not current_product:
        return []
    
    current_category = current_product["category"]
    
    # تصفية البيانات (Filtering): جلب المنتجات من نفس الفئة واستبعاد المنتج المفتوح حالياً
    recommended_list = [
        product for product in products_database 
        if product["category"] == current_category and product["id"] != product_id
    ]
    
    return recommended_list[:num_recommendations]