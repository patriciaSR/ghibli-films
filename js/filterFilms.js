const totoroSad = 'images/totoroSad.gif';


function filterFilms() {
  const queryText = queryInput.value.toUpperCase();
  const querySelect = document.querySelector('.directors__select').value;
  const isDirectorSelected = querySelect !== 'Selecciona un director...';

  const filteredFilms = filmsData
    .filter((film) => (film.title.toUpperCase().includes(queryText) || film.description.toUpperCase().includes(queryText)))
    .filter((film) => (isDirectorSelected ? film.director === querySelect : true));

  if (!filteredFilms.length) {
    return noResults();
  }

  return printFilms(filteredFilms);
}

function noResults() {
  list.innerHTML = '';

  const noResult = `<div class="noResults__container">
                      <p class="noResults__text">No hay resultados :( </p>
                      <img class="noResults__gif" src=${totoroSad} alt="Gif no hay resultados" />
                    </div>`;

  infoSection.innerHTML = noResult;
}

export { filterFilms };