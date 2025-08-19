import { createEl } from '../../utils/domBuilder.js';
import { icon } from '../../assets/icons.js';

// Creates an image carousel using the following content parameters:
// imgPath: '/path-to-the-image.jpg',
// caption: 'Text to be displayed.',
export function createCarousel({ content = [] }) {
    let currentImg = 0;

    // Image track elements
    const images = content.map((item) => {
        return createEl('div', {
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
        });
    });
    const track = createEl('div', {
        classes: ['carousel-image-track'],
        children: images,
    });

    // Navigation elements
    const prevArrow = createEl('img', {
        classes: ['carousel-nav-arrow'],
        attrs: { src: icon.arrowPrev },
    });
    const nextArrow = createEl('img', {
        classes: ['carousel-nav-arrow'],
        attrs: { src: icon.arrowNext },
    });
    const nav = createEl('div', {
        classes: ['carousel-nav-wrapper'],
        children: [prevArrow, nextArrow],
    });
    const container = createEl('div', {
        classes: ['carousel-container'],
        children: [track, nav],
    });

    // Navigation events
    prevArrow.addEventListener('click', () => slide({ offset: -1 }));
    nextArrow.addEventListener('click', () => slide({ offset: 1 }));

    // Function to slide to the supplied index, or by an index-based offset (-1 to go to previous image).
    function slide({ index, offset = 0 } = {}) {
        const target = index ?? currentImg + offset;
        if (target >= 0 && target < content.length) {
            currentImg = target;
            const imageWidth = container.getBoundingClientRect().width;
            const translate = imageWidth * target;
            track.style.transform = `translateX(-${translate}px)`;
        }
    }

    return container;
}
