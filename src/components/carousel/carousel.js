import { createEl } from '../../utils/domBuilder.js';
import { icon } from '../../assets/icons.js';

// Creates an image carousel using the following content parameters:
// imgPath: '/path-to-the-image.jpg',
// caption: 'Text to be displayed.',
export function createCarousel({ content = [] }) {
    let currentImg = 0;

    // Image track elements
    const images = content.map((item) =>
        createEl('div', {
            classes: ['carousel-image-item'],
            children: [
                createEl('img', {
                    attrs: { src: item.imgPath },
                }),
                createEl('div', {
                    classes: ['carousel-image-caption'],
                    text: item.caption,
                }),
            ],
        }),
    );
    const track = createEl('div', {
        classes: ['carousel-image-track'],
        children: images,
    });

    // Navigation elements
    const prevArrow = createEl('img', {
        classes: ['carousel-nav-arrow', 'carousel-nav-left'],
        attrs: { src: icon.arrowPrev },
    });
    const nextArrow = createEl('img', {
        classes: ['carousel-nav-arrow', 'carousel-nav-right'],
        attrs: { src: icon.arrowNext },
    });
    let dots = content.map((item) =>
        createEl('div', {
            classes: ['carousel-nav-dot'],
        }),
    );
    const imageIndicator = createEl('div', {
        classes: ['carousel-nav-indicator'],
        children: dots,
    });
    const nav = createEl('div', {
        classes: ['carousel-nav-wrapper'],
        children: [prevArrow, nextArrow, imageIndicator],
    });
    const container = createEl('div', {
        classes: ['carousel-container'],
        children: [track, nav],
    });

    // Add event listeners
    prevArrow.addEventListener('click', () => slide({ offset: -1 }));
    nextArrow.addEventListener('click', () => slide({ offset: 1 }));
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slide({ index });
            updateDots();
        });
    });

    // Function to update the indicator dots display
    function updateDots() {
        // Turn all dots inactive
        dots.forEach((dot) => dot.classList.toggle('active', false));

        // Activate the dot matching the current image
        dots[currentImg].classList.toggle('active', true);
    }

    // Function to slide to the supplied index, or by an index-based offset (-1 to go to previous image)
    function slide({ index, offset = 0 } = {}) {
        const target = index ?? currentImg + offset;
        if (target >= 0 && target < content.length) {
            currentImg = target;
            const imageWidth = container.getBoundingClientRect().width;
            const translate = imageWidth * target;
            track.style.transform = `translateX(-${translate}px)`;
        }
        updateDots();
    }

    // Initialize dot display
    updateDots();

    // Cycle every 5 seconds
    setInterval(() => {
        currentImg = (currentImg + 1) % content.length;
        slide({ index: currentImg });
    }, 5000);

    return container;
}
