import { createEl } from '../../utils/domBuilder.js';

export function createCarousel({ content = [] }) {
    let currentImg = 0;

    // Image track elements
    const images = content.map((item) =>
        createEl('div', {
            classes: ['carousel-image-wrapper'],
            children: [
                createEl('img', {
                    attrs: { src: item.imgPath },
                }),
                createEl('div', {
                    classes: ['carousel-caption'],
                    text: item.caption,
                }),
            ],
        }),
    );
    const track = createEl('div', {
        classes: ['carousel-track'],
        children: images,
    });

    // Navigation elements
    const prevArrow = createEl('div', {
        classes: ['carousel-arrow', 'prev'],
    });
    const nextArrow = createEl('div', {
        classes: ['carousel-arrow', 'next'],
    });
    const nav = createEl('div', {
        classes: ['carousel-nav'],
        children: [prevArrow, nextArrow],
    });
    const container = createEl('div', {
        classes: ['carousel-container'],
        children: [track, nav],
    });

    // Navigation events
    prevArrow.addEventListener('click', () => slide({ offset: -1 }));
    nextArrow.addEventListener('click', () => slide({ offset: 1 }));

    // Function that slides the image track of the carousel.
    // Can either slide to the supplied index, or move by an index-based offset.
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
