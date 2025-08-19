import './style.css';
import './components/carousel/carousel.css';
import { createCarousel } from './components/carousel/carousel';
import { image } from './assets/images.js';

const app = document.querySelector('.app');
const carousel = createCarousel({
    content: [
        {
            imgPath: image.bird,
            caption: '1',
        },
        {
            imgPath: image.bird2,
            caption: '2',
        },
        {
            imgPath: image.bird3,
            caption: '3',
        },
    ],
});
app.appendChild(carousel);
