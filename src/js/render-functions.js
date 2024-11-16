// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// npm install izitoast --save

export function renderGallery(images, galleryElement) {
  if (!images || images.length === 0) {
    // при відсутності зображень  показуємо сповіщення
    showNotification('No images found!');
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a class="gallery-item" href="${largeImageURL}" data-title="${tags}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `
    )
    .join(''); // всі елементи в одну строку

  galleryElement.insertAdjacentHTML('beforeend', markup);
}

export function showNotification(message, position = 'topRight') {
  try {
    //виводимо повідомлення
    iziToast.show({
      message,
      position,
      timeout: 3000, // Час відображення сповіщення (3 секунди)
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

//  плавна прокрутка сторінки
export function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return; // при відсутності елемента виходимо з функції

  const { height: cardHeight } = card.getBoundingClientRect();
  // Плавно прокручуємо сторінку
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
