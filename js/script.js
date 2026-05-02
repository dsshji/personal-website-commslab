// open external links in a new tab
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a').forEach(function (a) {
        if (a.hostname && a.hostname !== location.hostname) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
    });
});

const music = document.getElementById('bg-music');
const btn = document.getElementById('sound-toggle');
const icon = document.getElementById('sound-icon');

// read saved mute state
let isMuted = localStorage.getItem('muted') === 'true';

function applyState() {
    if (isMuted) {
        music.pause();
        btn.classList.add('muted');
        icon.src = "svg/sound-mute-solid.svg";
    } else {
        // play music on click of the button
        music.play().catch(() => {
            document.addEventListener('click', () => {
                if (!isMuted) music.play();
            }, { once: true });
        });
        btn.classList.remove('muted');
        icon.src = "svg/sound-on-solid.svg";
    }
}

btn.addEventListener('click', () => {
    isMuted = !isMuted;
    localStorage.setItem('muted', isMuted);
    applyState();
});

// run on page load
applyState();
