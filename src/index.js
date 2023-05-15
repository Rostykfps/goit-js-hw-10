import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.search.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

// Пошук даних про країну за її частковою або повною назвою через API Rest Countries v2
function onSearchCountries(event) {
  const inputText = event.target.value.trim();
  if (!inputText) {
    return clearMarkup();
  }

  fetchCountries(inputText)
    .then(data => {
      showMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

// Очистка розмітки
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

// Відображення розмітки відповідно до введеного тексту
function showMarkup(data) {
  if (data.length > 1 && data.length <= 10) {
    refs.countryList.innerHTML = createMarkupList(data);
  } else if (data.length === 1) {
    refs.countryInfo.innerHTML = createMarkupInfo(data);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

// Створення розмітки списку країн
function createMarkupList(arr) {
  refs.countryInfo.innerHTML = '';

  return arr
    .map(
      ({ flags: { svg }, name: { official } }) =>
        `<li>
      <img src="${svg}" alt="${official}">
      <p>${official}</p>
      </li>`
    )
    .join('');
}

// Створення розмітки даних про країну
function createMarkupInfo(arr) {
  refs.countryList.innerHTML = '';
  return arr
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        languages,
        population,
      }) => `<img src="${svg}" alt="${official}" />
      <h2>${official}</h2>
      <ul>
        <li><span>Capital:</span> ${capital}</li>
        <li><span>Population:</span> ${population}</li>
        <li><span>Languages:</span> ${Object.values(languages).join(', ')}</li>
      </ul>`
    )
    .join('');
}
