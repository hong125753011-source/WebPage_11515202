/**
 * 晴天咖啡 (Sunny Cafe) - 共用腳本 site.js
 * 功能：手機版漢堡選單切換、無障礙屬性管理、互動細節
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !primaryNav) return;

  // 切換選單開啟/關閉狀態
  function toggleMenu(forceClose = false) {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isExpanded;

    navToggle.setAttribute('aria-expanded', String(shouldOpen));
    
    if (shouldOpen) {
      primaryNav.classList.add('is-open');
      if (navBackdrop) navBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // 防止背後滾動
    } else {
      primaryNav.classList.remove('is-open');
      if (navBackdrop) navBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // 點擊漢堡按鈕
  navToggle.addEventListener('click', () => {
    toggleMenu();
  });

  // 點擊遮罩關閉選單
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      toggleMenu(true);
    });
  }

  // 點擊導覽連結後自動收合選單
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(true);
      }
    });
  });

  // 按下 ESC 鍵收合選單
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(true);
      navToggle.focus();
    }
  });

  // 視窗拉大超過 768px 時重設選單狀態
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(true);
    }
  });
});
