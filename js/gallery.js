export class Gallery {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.init();
  }

  async init() {
    try {
      const response = await fetch('gallery.json');
      const items = await response.json();
      this.render(items);
    } catch (error) {
      this.handleError(error);
    }
  }

  render(items) {
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      const element = this.createGalleryItem(item);
      fragment.appendChild(element);
    });

    this.container.appendChild(fragment);
    this.initializeLightbox();
  }

  createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <div class="itemcontent">
        <div class="overlay">
          <a href="${item.src}" class="zoomlink" aria-label="Ampliar imagem ${item.alt}">
            <i class="fa-solid fa-search" aria-hidden="true"></i>
          </a>
        </div>
        <img src="${item.src}"
             alt="${item.alt}"
             loading="lazy"
             onload="this.classList.add('loaded')"
             onerror="this.onerror=null; this.src='images/error-placeholder.jpg';" />
      </div>`;
    return div;
  }

  initializeLightbox() {
    $('.gallery a').simpleLightbox(this.options);
  }

  handleError(error) {
    console.error('Gallery error:', error);
    this.container.innerHTML = `
      <p class="error">Erro ao carregar as imagens. Por favor, tente novamente mais tarde.</p>`;
  }
}