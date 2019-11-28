'use strict';

import { getFilms } from './getFilms.js';
import { filterFilms, getFilters } from './filterFilms.js';
import { printFilms } from './printFilms.js';
import { addEventToTag } from './createTags.js';
import { createDirectorsSelect } from './getDirectors.js';

document.addEventListener('DOMContentLoaded', async () => {
  const queryInput = document.querySelector('.filter__input');
  const infoSection = document.querySelector('.films__info-container');
  const list = document.querySelector('.films__list');

  const filmsData = await getFilms(infoSection);
  const directorSelect = createDirectorsSelect(filmsData);

  addEventToTag(directorSelect, 'change', () => {
    const filters = getFilters(queryInput);
    const filteredFilms = filterFilms(filmsData, filters);

    printFilms(list, infoSection, filteredFilms);
  });

  queryInput.addEventListener('keyup', () => {
    const filters = getFilters(queryInput);

    const filteredFilms = filterFilms(filmsData, filters);

    printFilms(list, infoSection, filteredFilms);
  });
});
