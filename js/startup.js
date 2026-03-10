(function () {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=Rajdhani:wght@300;400&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
        .mv-loader {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #000;
            z-index: 99999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            gap: 16px;
        }
        .mv-loader-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
        .mv-loader-hosted {
            font-family: 'Rajdhani', sans-serif;
            font-weight: 300;
            font-size: 20px;
            letter-spacing: 0.35em;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
        }
        .mv-loader-title {
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: clamp(52px, 9vw, 110px);
            color: #fff;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            position: relative;
            text-decoration: none;
        }
        .mv-loader-title::before,
        .mv-loader-title::after {
            content: 'META VOID';
            position: absolute;
            top: 0; left: 0;
            width: 100%;
        }
        .mv-loader-title::before {
            color: rgba(160, 0, 120, 0.8);
            animation: mv-glitch1 4s infinite;
        }
        .mv-loader-title::after {
            color: rgba(0, 200, 255, 0.2);
            animation: mv-glitch2 4s infinite;
        }
        @keyframes mv-glitch1 {
            0%, 90%, 100% { clip-path: none; transform: none; }
            92% { clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
            94% { clip-path: inset(50% 0 20% 0); transform: translateX(3px); }
            96% { clip-path: inset(70% 0 5% 0);  transform: translateX(-2px); }
        }
        @keyframes mv-glitch2 {
            0%, 88%, 100% { clip-path: none; transform: none; }
            90% { clip-path: inset(10% 0 70% 0); transform: translateX(4px); }
            93% { clip-path: inset(40% 0 30% 0); transform: translateX(-3px); }
            95% { clip-path: inset(60% 0 10% 0); transform: translateX(2px); }
        }
        .mv-bar-wrap {
            width: clamp(240px, 35vw, 420px);
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 24px;
        }
        .mv-bar-label {
            font-family: 'Rajdhani', sans-serif;
            font-size: 11px;
            letter-spacing: 0.3em;
            color: rgba(255,255,255,0.25);
            text-transform: uppercase;
        }
        .mv-bar-track {
            width: 100%;
            height: 2px;
            background: rgba(255,255,255,0.07);
            overflow: hidden;
        }
        .mv-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, rgba(80,80,255,0.8), rgba(180,100,255,0.9));
            box-shadow: 0 0 8px rgba(120,80,255,0.6);
            transition: width 0.1s linear;
        }
        .mv-play-btn {
            display: none;
            margin-top: 24px;
            padding: 14px 52px;
            font-family: 'Orbitron', sans-serif;
            font-weight: 400;
            font-size: 13px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #fff;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.25);
            cursor: pointer;
            transition: border-color 0.3s ease, background 0.3s ease;
        }
        .mv-play-btn.visible {
            display: block;
        }
        .mv-play-btn:hover {
            border-color: rgba(255,255,255,0.7);
            background: rgba(255,255,255,0.05);
        }
    `;
    document.head.appendChild(style);

    const loader = document.createElement('div');
    loader.className = 'mv-loader';
    loader.innerHTML = `
        <div class="mv-loader-hosted">Hosted On</div>
        <a href="https://sites.google.com/" target="_blank" style="text-decoration:none;">
            <div class="mv-loader-title">META VOID</div>
        </a>
        <div class="mv-bar-wrap">
            <div class="mv-bar-label" id="mv-bar-label">Loading...</div>
            <div class="mv-bar-track">
                <div class="mv-bar-fill" id="mv-bar-fill"></div>
            </div>
        </div>
        <button class="mv-play-btn">Start</button>
    `;

    function inject() {
        document.body.insertBefore(loader, document.body.firstChild);
        init();
    }

    if (document.body) {
        inject();
    } else {
        document.addEventListener('DOMContentLoaded', inject);
    }

    function init() {
        const barFill  = document.getElementById('mv-bar-fill');
        const barLabel = document.getElementById('mv-bar-label');
        const playBtn  = loader.querySelector('.mv-play-btn');
        let progress = 0;

        const interval = setInterval(() => {
            const max = window._mvLoaded ? 100 : 90;
            progress = Math.min(progress + Math.random() * 4 + 1, max);
            barFill.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                barLabel.textContent = 'Ready';
                setTimeout(() => playBtn.classList.add('visible'), 400);
            }
        }, 80);

        window.addEventListener('load', () => {
            window._mvLoaded = true;
        });

        playBtn.addEventListener('click', () => {
            loader.classList.add('mv-loader-hidden');
            loader.addEventListener('transitionend', () => loader.remove());
        });
    }
})();
