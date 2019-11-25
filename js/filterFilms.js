function isTextIncluded(film, queryText) {
  queryText = queryText.toLowerCase();

  return film.title.toLowerCase().includes(queryText)
   || film.description.toLowerCase().includes(queryText);
}

function filterFilms(films, filters) {
  const { queryText, director } = filters;

  const filteredFilms = films
    .filter((film) => isTextIncluded(film, queryText))
    .filter((film) => (director ? film.director === director : true));

  return filteredFilms;
}

function getFilters() {
  const queryInput = document.querySelector('.filter__input');
  const queryText = queryInput.value;
  let director = document.querySelector('.directors__select').value;

  if (director === 'Selecciona un director...') {
    director = null;
  }

  return { queryText, director };
}

export { filterFilms, getFilters, isTextIncluded };
