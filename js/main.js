import { Gallery } from './gallery.js';

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  initializeGallery();
  initializeScrollHandler();
});

async function initializeGallery() {
  try {
    const galleryContainer = document.getElementById('galleryitems');
    if (!galleryContainer) {
      throw new Error('Gallery container not found');
    }

    const lightboxOptions = {
      history: false,
      uniqueImages: false,
      alertError: true,
      alertErrorMessage: 'Imagem não encontrada',
      enableKeyboard: true,
      captionSelector: 'img',
      captionsData: 'alt'
    };

    const gallery = new Gallery(galleryContainer, lightboxOptions);
  } catch (error) {
    console.error('Failed to initialize gallery:', error);
  }
}

function initializeScrollHandler() {
  window.addEventListener('scroll', () => {
    const scrollThreshold = document.body.offsetHeight * 0.5;
    const voltarTopoButton = document.getElementById('voltarTopo');

    voltarTopoButton.style.display = window.scrollY >= scrollThreshold ? 'block' : 'none';
  });
}
