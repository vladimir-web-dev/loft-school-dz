/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ' https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', () => {
      if(xhr.status <= 400) {
        const result = xhr.response.sort((prev, next) => {
          const cityA = prev.name;
          const cityB= next.name;
          
          if(cityA > cityB) return 1;
          if(cityA < cityB) return -1;

          return 0
        });
                
        resolve(result);
      }

      reject('Error');
    });
  });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  const fullLower = full.toLowerCase();
  const chunkLower = chunk.toLowerCase();

  return fullLower.includes(chunkLower);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let cities = [];

loadTowns().then(result => { 
  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'block';

  cities = result;
});

filterInput.addEventListener('keyup', function(e) {
    const citiesListNode = document.createElement('UL');
    const entry = e.target.value;
    let matchingCities = [];

    filterResult.innerHTML = '';

    if(entry !== '')
      matchingCities = cities.filter(val => {return isMatching(val.name, entry)});

    if(matchingCities.length > 0) {
      for(const city of matchingCities) {
        const cityNode = document.createElement('LI');

        cityNode.innerText = city.name;
        citiesListNode.appendChild(cityNode);
      }
       
      filterResult.appendChild(citiesListNode);
    }    
});



export {
    loadTowns,
    isMatching
};
