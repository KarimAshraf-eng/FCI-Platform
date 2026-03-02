// =========================================
// المنطق الخاص بصفحة الملخص (Accordion Logic)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // تحديد جميع أزرار الأكورديون
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // تحديد العنصر الأب (accordion-item) والمحتوى الداخلي
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');

            // إغلاق أي قسم آخر مفتوح (اختياري لترتيب الشاشة)
            const activeItems = document.querySelectorAll('.accordion-item.active');
            activeItems.forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // تبديل حالة القسم الحالي (فتح / إغلاق)
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                // إذا كان مفتوحاً، قم بتحديد الارتفاع المناسب بناءً على المحتوى الداخلي
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // إذا تم إغلاقه، قم بإرجاع الارتفاع للصفر
                content.style.maxHeight = null;
            }
        });
    });
});