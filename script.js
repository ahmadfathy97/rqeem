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


// ========================================
// 🎬 تأثير 3D Tilt على بطاقات المنتجات
// يتفاعل مع حركة الماوس لإعطاء إحساس ثلاثي الأبعاد
// ========================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    // الحصول على موقع الماوس داخل البطاقة
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // حساب مركز البطاقة
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // حساب زاوية الدوران (🎯 عدّل الرقم 15 لتغيير شدة التأثير)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // تطبيق التأثير
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  // إعادة البطاقة لوضعها الطبيعي عند خروج الماوس
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========================================
// 🌟 تأثير Parallax على قسم Hero
// يتبع حركة الماوس لإعطاء عمق ثلاثي الأبعاد
// ========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 🎯 عدّل الأرقام (20, 10) لتغيير شدة حركة العناصر
    heroContent.style.transform = `
      perspective(1000px)
      rotateX(${y * -10}deg)
      rotateY(${x * 20}deg)
      translateZ(50px)
    `;
  });
  
  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
}

// ========================================
// ✨ تأثير ظهور العناصر عند التمرير (Scroll Animation)
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp3D 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// مراقبة جميع الأقسام والبطاقات
document.querySelectorAll('.section, .product-card, .value-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
