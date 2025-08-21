import './style.css';
import './components/carousel/carousel.css';
import { createCarousel } from './components/carousel/carousel';
import { image } from './assets/images.js';

const app = document.querySelector('.app');
const carousel = createCarousel({
    content: [
        {
            imgPath: image.bird,
            caption: 'Beautiful Bird',
        },
        {
            imgPath: image.bird2,
            caption: 'Another Bird',
        },
        {
            imgPath: image.bird3,
            caption: 'Magnificent Bird',
        },
    ],
});
app.appendChild(carousel);
