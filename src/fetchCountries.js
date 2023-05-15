const BASE_URL = 'https://restcountries.com/v3.1/';
const END_POUINT = 'name/';

// Робить HTTP-запит на ресурс Rest Countries v2 і повертає проміс з масивом країн - результатом запиту
export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${END_POUINT}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
