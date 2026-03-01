document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('contextmenu', event => event.preventDefault());

    const bubble = document.getElementById('tooltip');
    let activeEl = null;
    let pressTimer;

    function handleShow(x, y, el) {
        if (activeEl) activeEl.classList.remove('active-text');
        activeEl = el;
        activeEl.classList.add('active-text');

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const topY = rect.top;

        bubble.innerText = el.getAttribute('data-ar');
        bubble.style.left = `${centerX}px`;
        bubble.style.top = `${topY}px`;
        bubble.classList.add('visible');

        if (navigator.vibrate) navigator.vibrate(40);
    }

    function handleHide() {
        if (activeEl) activeEl.classList.remove('active-text');
        activeEl = null;
        bubble.classList.remove('visible');
    }

    window.addEventListener('scroll', handleHide, true);
    document.addEventListener('touchmove', handleHide, { passive: true });

    document.querySelectorAll('.translatable').forEach(el => {
        el.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            pressTimer = setTimeout(() => handleShow(touch.clientX, touch.clientY, el), 600);
        }, { passive: true });

        el.addEventListener('mousedown', (e) => {
            if (e.button === 0) pressTimer = setTimeout(() => handleShow(e.clientX, e.clientY, el), 600);
        });

        const cancel = () => clearTimeout(pressTimer);
        el.addEventListener('touchend', cancel);
        el.addEventListener('mouseup', cancel);
        el.addEventListener('touchmove', cancel);
    });

    document.addEventListener('touchstart', (e) => {
        if (!e.target.classList.contains('translatable')) handleHide();
    }, { passive: true });

    document.addEventListener('mousedown', (e) => {
        if (!e.target.classList.contains('translatable')) handleHide();
    });
});