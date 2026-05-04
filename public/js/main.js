(function () {
  'use strict';

  // Hero 輪播 3 秒
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-dot');
  if (heroSlides.length > 0) {
    var idx = 0;
    setInterval(function () {
      heroSlides[idx].classList.remove('opacity-100');
      heroSlides[idx].classList.add('opacity-0');
      if (heroDots[idx]) heroDots[idx].classList.remove('active');
      idx = (idx + 1) % heroSlides.length;
      heroSlides[idx].classList.remove('opacity-0');
      heroSlides[idx].classList.add('opacity-100');
      if (heroDots[idx]) heroDots[idx].classList.add('active');
    }, 3000);
  }

  // 條款彈窗
  var modal = document.getElementById('legal-modal');
  var btnLegal = document.getElementById('btn-legal');
  var btnCloseModal = document.getElementById('btn-close-modal');
  function closeModal() { if (modal) { modal.classList.add('hidden'); modal.style.display = ''; } }
  function openModal() { if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; } }
  if (btnLegal && modal) { btnLegal.addEventListener('click', openModal); }
  if (btnCloseModal && modal) { btnCloseModal.addEventListener('click', closeModal); }
  if (modal) { modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); }); }

  // 購物車：從 localStorage 讀取並顯示數量（可選）
  var cartCount = document.getElementById('cart-count');
  if (cartCount) {
    function updateCartCount() {
      try {
        var cart = localStorage.getItem('cart');
        var arr = cart ? JSON.parse(cart) : [];
        cartCount.textContent = arr.length;
        cartCount.classList.toggle('hidden', arr.length === 0);
      } catch { cartCount.classList.add('hidden'); }
    }
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
  }
})();
