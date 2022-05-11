const listForCards = document.querySelector('.list');
const searchForm = document.querySelector('.search');

const searchField = document.querySelector('.search__field')

let repositArray = [];

// createCard - создает новую карточку 
// deleteCard - удаляет карточку 
// getRepos - очищает массив с репозиториями, отправяет запрос на сервер
// получает новый массив и передает его в функцию, которая создает подсказки
//createAutocompliteElems - принимает массив и создает автоподсказки
// получает репозитории и передает в асинхронную функцию createSearchOption

searchForm.addEventListener('click', addCard)
function addCard (event) {
    const evTar = event.target;
    if(evTar.className === 'search__item'){
        const cardId = +event.target.id;
        repositArray.forEach(repo => {
            if(cardId === repo['id']) {
                createCard(
                    repo['name'],
                    repo['owner']['login'],
                    repo['stargazers_count']
                    )
            }
        })
    }
}

const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }
const checkFieldIsEmptyTimeout = debounce(checkFieldIsEmpty, 1000)
function testDeleteAutocomp(event){
    console.log(event.target.value === '');
    if(event.target.value === ''){
        if(document.querySelector('.search__list')){
            document.querySelector('.search__list').remove()    
        }
    }
    
}
searchField.addEventListener('keyup',checkFieldIsEmptyTimeout)
searchField.addEventListener('keyup',testDeleteAutocomp)

function checkFieldIsEmpty(event){
    evTarget = event.target
    fieldValue = evTarget.value
    // если не пустая создаем список
    if(fieldValue !== '') {
        const searchList = document.createElement('ul');
        searchList.classList.add('search__list');
        //если проврека на то создан список или нет(чтобы избежать повтора)
        if(!document.querySelector('.search__list')){
            searchForm.appendChild(searchList)
        }
       // если строка не пустая то очищаем текущие подсказки и создаем новые
        clearAutocomplite()
        getRepos(fieldValue)
    }
}
function clearAutocomplite(){
    document.querySelectorAll('.search__item')
    .forEach(elem => elem.remove());
}

async function getRepos (value) {
    repositArray = []
    if (!value) return
     await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
    .then(repoList => repoList.json())
    .then((repoList) => {
        console.log('start getRepos');
        repoList.items.forEach(repo => repositArray.push(repo));
        createAutocompliteElems(repositArray)
    })
    .catch(err => console.log(err.message));
};


 function createAutocompliteElems(array){
    const searchList = document.querySelector('.search__list');
     let fragment = new DocumentFragment();
        array.forEach(repo => {
            const item = document.createElement('li');
            item.classList.add('search__item');
            item.id = `${repo.id}`
            item.textContent = `${repo.name}`
            fragment.appendChild(item)
        });
    if(searchList) return searchList.append(fragment);
     return ;
}


function createCard(name, owner, stars){
         // <div class="list__card">
         const lisrCard = document.createElement('div');
         lisrCard.classList.add('list__card');
         // <div class="user">
         const user = document.createElement('div');
         user.classList.add('user');
         // <p class="card__name">Name: react</p>
         const cardName = document.createElement('p');
         cardName.classList.add('card__name');
         cardName.textContent = `Name: ${name}`;
         user.append(cardName);
         //<p class="card__owner">Owner: facebook</p>
         const cardOwner = document.createElement('p');
         cardOwner.classList.add('card__owner');
         cardOwner.textContent = `Owner: ${owner}`;
         user.append(cardOwner);
         //<p class="card__stars">Stars: 12343</p>
         const cardStars = document.createElement('p');
         cardStars.classList.add('card__owner');
         cardStars.textContent = `Stars: ${stars}`;
         user.append(cardStars);
         // <button class="card__close" type="button"></button>
         const btn = document.createElement('button');
         btn.classList.add('card__close');
         btn.setAttribute('type', 'button');
         
         lisrCard.append(user);
         lisrCard.appendChild(btn)
         return listForCards.append(lisrCard);
    }
    

    listForCards.addEventListener('click',deleteCard);
    function deleteCard(event){
        const closeClick = event.target.className;
        if(closeClick !== 'card__close') return;
        const card = event.target.closest('.list__card');
        card.remove()
    };
    



