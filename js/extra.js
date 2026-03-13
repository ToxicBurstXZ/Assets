(function () {
  function init() {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      #promo-banner {
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%) translateY(-80px);
        z-index: 2147483647;
        cursor: pointer;
        pointer-events: auto;
        transition: transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.55s ease;
        opacity: 0;
        background: rgba(0,0,0,0.82);
        border: 1px solid rgba(160,80,255,0.35);
        border-radius: 999px;
        padding: 8px 24px;
        box-shadow: 0 0 18px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), inset 0 0 12px rgba(0,0,0,0.5);
      }
      #promo-banner.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      #promo-banner span {
        font-family: 'Share Tech Mono', 'Courier New', monospace;
        font-size: 13px;
        font-weight: 700;
        color: #c084fc;
        letter-spacing: 0.08em;
        white-space: nowrap;
        text-shadow:
          0 0 6px rgba(192,132,252,1),
          0 0 14px rgba(168,85,247,0.95),
          0 0 28px rgba(139,92,246,0.85),
          0 0 50px rgba(109,40,217,0.7),
          0 0 80px rgba(76,29,149,0.5);
      }
      #promo-banner:hover span {
        text-shadow:
          0 0 8px rgba(216,180,254,1),
          0 0 18px rgba(192,132,252,1),
          0 0 36px rgba(168,85,247,0.95),
          0 0 60px rgba(139,92,246,0.8),
          0 0 100px rgba(109,40,217,0.6);
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'promo-banner';
    banner.innerHTML = '<span>META VOID</span>';
    banner.addEventListener('click', () => {
      window.open('https://sites.google.com/view/meta-void/', '_blank');
    });
    document.body.prepend(banner);

    function dropDown() {
      banner.classList.add('visible');
      setTimeout(() => {
        banner.classList.remove('visible');
      }, 3000);
    }

    setInterval(dropDown, 180000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
