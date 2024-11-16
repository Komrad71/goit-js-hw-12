// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// npm install simplelightbox

// Імпортуємо функції
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { showNotification } from './js/render-functions';
import { smoothScroll } from './js/render-functions';

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Слухач події для форми
form.addEventListener('submit', handleFormSubmit);

loadMoreBtn.addEventListener('click', loadMoreImages);

function handleFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();

  if (!query) return; // Якщо поле порожнє, нічого не робимо

  resetSearch();
  searchImages();
}

function resetSearch() {
  page = 1;
  totalHits = 0;
  gallery.innerHTML = ''; // Очищення галереї
  loadMoreBtn.style.display = 'none';
}

// Завантаження наступної сторінки
function loadMoreImages() {
  page++;
  searchImages();
}

async function searchImages() {
  showLoader();

  try {
    const { hits: images, totalHits: total } = await fetchImages(query, page);

    handleSearchResults(images, total);
  } catch (error) {
    showNotification('Failed to load images. Please try again later.');
  } finally {
    hideLoader();
  }
}

// Обробка результатів пошуку
function handleSearchResults(images, total) {
  if (page === 1) {
    totalHits = total;

    if (!totalHits) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
  }

  renderGallery(images, gallery);
  lightbox.refresh();

  toggleLoadMoreButton(images);
  if (page > 1) smoothScroll();
}

function toggleLoadMoreButton(images) {
  const isMoreAvailable = images.length === 15 && page * 15 < totalHits;

  loadMoreBtn.style.display = isMoreAvailable ? 'block' : 'none';

  if (!isMoreAvailable && page * 15 >= totalHits) {
    showNotification(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
