'use strict';

const list = document.querySelector('.films__list');
const searchBtn = document.querySelector('.filter__button');
const queryInput = document.querySelector('.filter__input');

const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

let filmsData = [];

// //get films from API with fetch
// fetch(ENDPOINT)
// .then(res => res.json())
// .then(data => {
//   filmsData = data;

//   return printList(filmsData)})
// .catch(error => console.log(error))

function printList(films) {
  list.innerHTML= '';

  const newFilms = films.map (film => {
    const newLi = document.createElement('li');
    const newText = document.createTextNode(film.title);
    newLi.appendChild(newText);
    return newLi;
  })
  
  for (const film of newFilms) {
    list.appendChild(film);
  }
};

//filter films list
function filterFilms() {
const query = queryInput.value.toUpperCase();
const filteredFilms = filmsData.filter(film => film.title.toUpperCase().includes(query));

return printList(filteredFilms);
}

searchBtn.addEventListener('click', filterFilms);


//get films from API with setTimeout and loading msg
loadingMsg();
sendRequest();

function sendRequest() {
  setTimeout(function() {
    fetch(ENDPOINT)
    .then(res => res.json())
    .then(data => {
      filmsData = data;
    
      return printList(filmsData)})
    .catch(error => console.log(error))
  }, 5000);
}

function loadingMsg() {
  const newP = document.createElement('p');
  const newText = document.createTextNode('Loading...');
  newP.add
  newP.appendChild(newText);
  return list.appendChild(newP);
}


