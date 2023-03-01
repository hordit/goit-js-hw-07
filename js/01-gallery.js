import { galleryItems } from './gallery-items.js';

if ('loading' in HTMLImageElement.prototype) {
    addLazySizesScript();
} else {
    addScAttrToLazyImages();
}

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

document.addEventListener('click', onGalleryContainerClick);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function addLazySizesScript() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}

function addScAttrToLazyImages() {
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
         />
    </a>
    </div>
    `;
        })
        .join('');
}

function onGalleryContainerClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
        <img src="${evt.target.dataset.source}" width="800" height="600">
      `, {
        onShow: () => {
            document.addEventListener('keydown', onModalEscPress);
        },
        onClose: () => {
            document.removeEventListener('keydown', onModalEscPress);
        },
    },
    );

    instance.show();

    function onModalEscPress(evt) {
        if (evt.code === 'Escape') {
            instance.close();
        }
    }
}






