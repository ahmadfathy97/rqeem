// ========================================
// 🌓 التبديل بين الوضع الداكن والفاتح
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// تحميل التفضيل المحفوظ عند فتح الصفحة
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
}

// حفظ التفضيل عند الضغط على الزر
function toggleTheme() {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
}

// تحديث نص الزر حسب الوضع الحالي
function updateThemeButton(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙 الوضع الداكن' : '☀️ الوضع الفاتح';
}

// إضافة حدث الضغط على الزر
themeToggle.addEventListener('click', toggleTheme);

// تحميل الوضع المحفوظ عند فتح الصفحة
loadTheme();

// ========================================
// 📱 قائمة الموبايل
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// ========================================
// 🔍 فلاتر المنتجات (في صفحة products.html فقط)
// ========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // إزالة class active من جميع الأزرار
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // إضافة class active للزر المضغوط
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // فلترة المنتجات
    productCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ========================================
// 🛒 زر إضافة للسلة (مثال بسيط)
// ========================================
const addToCartButtons = document.querySelectorAll('.product-button');

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    
    alert(`تم إضافة "${productName}" إلى السلة! 🛒`);
    
    // هنا يمكنك إضافة كود لإضافة المنتج إلى السلة فعلياً
    // أو إرسال البيانات إلى السيرفر
  });
});
