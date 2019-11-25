import { createTag } from './createTags.js';

const totoroSad = './../images/totoroSad.gif';

const infoSection = document.querySelector('.films__info-container');
const list = document.querySelector('.films__list');


function noResults() {
  list.innerHTML = '';

  const noResult = `<div class="noResults__container">
                      <p class="noResults__text">No hay resultados :( </p>
                      <img class="noResults__gif" src=${totoroSad} alt="Gif no hay resultados" />
                    </div>`;

  infoSection.innerHTML = noResult;
}

function addLoader(infoSection) {
  const newLoader = createTag('p', 'Loading...', 'spinner');
  // const newLoader = `<p class="spinner">Loading...</p>`

  infoSection.appendChild(newLoader);

  return infoSection;
}

function removeLoader() {
  const spinner = document.querySelector('.spinner');

  if (spinner) {
    spinner.remove();
  }
}

export { noResults, addLoader, removeLoader };
