import axios from 'axios';
// npm install axios

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47085214-4cff0ba1bb96c64321ec3a8d9';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images', error);
    throw error;
  }
}
