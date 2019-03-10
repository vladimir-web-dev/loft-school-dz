/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const initCookies = getCookiesArray();

populateCookiesTable(initCookies);

function populateCookiesTable (cookies) {    
    listTable.innerHTML = '';

    if(cookies.length > 0) {
      for(const cookie of cookies) {
        const rowNode = createRowNode(cookie);

        listTable.appendChild(rowNode);
      }

    }   
}

function createRowNode (data) {
  const rowNode = document.createElement('TR');
  const nameColNode = document.createElement('TD');
  const valueColNode = document.createElement('TD');
  const deleteColNode = document.createElement('TD');
  const deleteButton = document.createElement('BUTTON');
  
  let updatedCookies;

  nameColNode.innerText = data.name;
  valueColNode.innerText = data.value;
  deleteButton.textContent = 'Удалить';

  deleteButton.addEventListener('click', () => {
    console.log(data.name)
    document.cookie = `${data.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    
    updatedCookies = getCookiesArray();
    populateCookiesTable(updatedCookies);
  });


  deleteColNode.appendChild(deleteButton);
  rowNode.appendChild(nameColNode);
  rowNode.appendChild(valueColNode);
  rowNode.appendChild(deleteButton);

  return rowNode;
}

function getCookiesArray () {
  const cookiesString = document.cookie;

  if(cookiesString !== '') {
    const cookiesStrArray = cookiesString.split('; ');
    const cookiesObjArray = cookiesStrArray.map((cookie) => {
    const [name, value] = cookie.split('=');

      return { name, value };
    });

    return cookiesObjArray;
  }

  return [];
}

filterNameInput.addEventListener('keyup', function(e) {
  const entry = e.target.value.toLowerCase();
  const cookiesArray = getCookiesArray();
  let filteredCookiesArray = [];

  //if(entry !== '') {
    filteredCookiesArray = cookiesArray.filter(cookie => {
      const cookieName = cookie.name.toLowerCase();
      const cookieValue = cookie.value.toLowerCase();
  
      return cookieName.includes(entry) || cookieValue.includes(entry); 
    });
  //}

  populateCookiesTable(filteredCookiesArray);
});


addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let updatedCookies;

    
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    addNameInput.value = '';
    addValueInput.value = '';

    updatedCookies = getCookiesArray();
    populateCookiesTable(updatedCookies);
});
