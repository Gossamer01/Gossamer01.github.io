document.addEventListener("DOMContentLoaded", function() {
    const bars = document.querySelectorAll(".stryln");
    const images = document.querySelectorAll(".stryimg");
    let currentIndex = 0;
    let timeoutId = null;

    function resetBars(clickedIndex) {
        bars.forEach((bar, index) => {
            bar.querySelector('.fill').style.transition = 'none'; // Disable transition for instant reset
            bar.querySelector('.fill').style.width = (index < clickedIndex) ? '100%' : '0';
            void bar.offsetWidth; // Trigger reflow to reset transition
            bar.querySelector('.fill').style.transition = 'width 10s linear'; // Re-enable transition
        });
    }

    function startFillAnimation(index) {
        bars[index].querySelector('.fill').style.width = '100%';
    }

    function showImage(index) {
        images.forEach((img, idx) => {
            img.classList.toggle('active', idx === index);
        });
    }

    function nextImage() {
        currentIndex++;
        if (currentIndex < bars.length) {
            resetBars(currentIndex);
            startFillAnimation(currentIndex);
            showImage(currentIndex);
            timeoutId = setTimeout(nextImage, 10000);
        }
    }

    bars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            clearTimeout(timeoutId);
            resetBars(index);
            startFillAnimation(index);
            showImage(index);
            currentIndex = index;
            timeoutId = setTimeout(nextImage, 10000);
        });
    });

    images.forEach(img => {
        img.classList.remove('active');
    });

    setTimeout(() => {
        startFillAnimation(0);
        showImage(0);
        timeoutId = setTimeout(nextImage, 10000);
    }, 0);
});
