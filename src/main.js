import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreBtn,
  showLoader,
  showLoadMoreBtn,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  form: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let currentPage = 1;
let currentQuery = '';
let per_page = 15;

async function onFormSubmit(e) {
  e.preventDefault();
  const searchText = refs.form.elements['search-text'].value.trim();
  if (!searchText) return;
  currentQuery = searchText;
  currentPage = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    if (hits.length === 0) {
      hideLoader();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(hits);

    if (currentPage * per_page >= totalHits) {
      hideLoadMoreBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }
    hideLoader();
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  }
}

async function onLoadMoreBtnClick() {
  currentPage += 1;
  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    createGallery(hits);
    const item = document.querySelector('.gallery-item');
    if (item) {
      const itemHeight = item.getBoundingClientRect().height;
      window.scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
    }
    if (currentPage * per_page >= totalHits) {
      hideLoadMoreBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }
    hideLoader();
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  }
}
