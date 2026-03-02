// =========================================
// المنطق الخاص بصفحة الملخص (Scroll Reveal Animation)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // تحديد جميع البطاقات التي تحمل كلاس reveal-card
    const cards = document.querySelectorAll('.reveal-card');

    // إعداد الـ Observer لمراقبة متى تظهر البطاقة في الشاشة
    const observerOptions = {
        root: null, // مراقبة نافذة المتصفح بالكامل
        threshold: 0.15, // تفعيل الحركة عندما يظهر 15% من البطاقة
        rootMargin: "0px 0px -50px 0px" // تشغيل الأنيميشن قبل الوصول لنهاية الشاشة بقليل
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة كلاس 'visible' الذي يقوم بتشغيل الـ CSS Transition
                entry.target.classList.add('visible');
                // إيقاف مراقبة هذه البطاقة بعد ظهورها لمنع تكرار الحركة
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ربط المراقب (Observer) بكل بطاقة
    cards.forEach(card => {
        cardObserver.observe(card);
    });
});