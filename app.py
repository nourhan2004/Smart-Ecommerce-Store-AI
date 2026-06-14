# ==========================================================
# Project: Smart E-commerce Store with AI Recommendation
# Role: Backend Developer (Nourhan)
# Target: Flask Server Engine & API Endpoints
# ==========================================================

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # لمنع أي مشاكل أمنية في المتصفح أثناء التطوير
from ai_recommendation import products_database, get_products_by_category

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)  # تفعيل حماية السياسات المشتركة للمتصفح

# ── مسارات السيرفر لعرض واجهات محمود (Routes) ──

@app.route('/')
def home():
    """عرض الصفحة الرئيسية للمتجر"""
    return render_template('index.html')

@app.route('/product.html')
def product_page():
    """عرض صفحة تفاصيل المنتج"""
    return render_template('product.html')

# ── نقاط اتصال واجهات برمجة التطبيقات (API Endpoints) ──

@app.route('/api/products', methods=['GET'])
def get_all_products_api():
    """API يعيد قائمة بكل المنتجات المتوفرة في قاعدة البيانات"""
    return jsonify(products_database)

@app.route('/api/recommendations', methods=['GET'])
def ai_recommendations_api():
    """
    API تكامل واجهة التطبيق والذكاء الاصطناعي:
    يستقبل رقم المنتج، يستدعي دالة نورهان للـ AI، ويعيد قائمة التوصيات الذكية بصيغة JSON
    """
    product_id = request.args.get('product_id', type=int)
    if not product_id:
        return jsonify({"error": "Missing product_id parameter"}), 400
        
    # استدعاء منطق الذكاء الاصطناعي
    recommendations = get_products_by_category(product_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    # تشغيل السيرفر المحلي للمشروع على منفذ 5000 الافتراضي
    app.run(debug=True, port=5000)