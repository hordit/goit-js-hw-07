import { galleryItems } from './gallery-items.js';
// Change code below this line
if ('loading' in HTMLImageElement.prototype) {
    addLazySizesScript();
} else {
    addScAttrToLazyImages();
}

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function addLazySizesScript() {
    console.log('поддерживает ленивые загрузки');
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}

function addScAttrToLazyImages() {
    console.log('не поддерживает ленивые загрузки');
    const script = document.createElement('script');
    script.src =
        'https://cdnis.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
    script.integrity =
        'sha512-TmDwFLhg3UA4ZGOEb4MIyT101Mb+Oww5kFGOuHqXsdbyZz9DcvYQhKpGgNkamAI6h21GGZq2X8ft0JvF/XjTUg==';
    script.crossOrigin = 'anonymous';

    document.body.appendChild(script);
}

function createGalleryMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
            return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img 
         class="gallery__image"
         src="${preview}"
         data-source="${original}"
         alt="${description}"
         loading="lazy"
         />
    </a>
    </div>
    `;
        })
        .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});

console.log(galleryItems);
