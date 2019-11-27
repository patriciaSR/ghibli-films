function getDirectors(films = []) {
  const filmsDirectors = [];

  films.forEach((film) => {
    if (!filmsDirectors.includes(film.director)) {
      filmsDirectors.push(film.director);
    }
  });

  return filmsDirectors;
}

export { getDirectors };
