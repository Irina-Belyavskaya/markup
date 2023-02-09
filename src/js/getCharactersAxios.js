const axios = require('axios');

const inputSelect = document.querySelector('.select__input');
const selectContent = document.querySelector('.select__content');
const article = document.querySelector('.select__character');
const paragraph = document.querySelector('.select__p__character');
const closeSelectBtn = document.querySelector('.select__close');


/* --------------------- axios -------------- */
let characters;
const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/character'
});

axiosInstance.interceptors.response.use(function (response) {
    console.log('Status code intercepted ' + response.status)
    return response;
  }, function (error) {
    console.log(response.error)
    return Promise.reject(error);
});

const getCharacters = async () => {
	try {
        const response = await axiosInstance.get();
        characters = response.data.results;
    } catch (error) {
        console.log(error)
    }
};

getCharacters();

/*--------------------------------------------- */

inputSelect.addEventListener('input', () => {

    let inputText = inputSelect.value;

    while (selectContent.lastElementChild) {
        selectContent.removeChild(selectContent.lastElementChild);
    }

    if (inputText.length == 0)
        return;        

    let characters_filtered = characters.filter(item => {
        if (item.name.toLowerCase().includes(inputText.toLowerCase()))
            return item;
    }).slice(0,5);    

    characters_filtered.forEach(item => {
        let listElement = document.createElement("a");
        listElement.textContent = item.name;
        listElement.dataset.name = item.name;
        listElement.dataset.gender = item.gender;
        listElement.dataset.image = item.image;
        listElement.dataset.species = item.species;
        listElement.dataset.status = item.status;
        listElement.classList.add('select__link');
        selectContent.appendChild(listElement);
    })

    addEventOnLink();

    const selectLinks = document.querySelectorAll('.select__link');
    selectContent.classList.add('active__content');
    selectContent.classList.remove('hide__content');
    selectLinks.forEach(link => {
        link.classList.add('active__link');
    });
});

closeSelectBtn.addEventListener('click', () => {
    selectContent.classList.remove('active__content');
    selectContent.classList.add('hide__content');
    const selectLinks = document.querySelectorAll('.select__link');
    selectLinks.forEach(link => {
        link.classList.remove('active__link');
    });

    paragraph.innerHTML = '';
    article.classList.remove('card__style');
    removeImg();

});


function addEventOnLink() {
    const links = document.querySelectorAll('.select__link');
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            removeImg();
            inputSelect.value = link.textContent;
            makeCharacterInfoText(article,paragraph,link.dataset);
        })
    })

}

function makeCharacterInfoText (containerElement,textElement, infoElement) {
    textElement.innerHTML = 
            '<span class="bold">' + 'Name: ' + '</span>' + infoElement.name + '<br/>' + '<br/>' +
            '<span class="bold">' + 'Gender: ' + '</span>' + infoElement.gender + '<br/>' + '<br/>' +
            '<span class="bold">' + 'Species: ' + '</span>' + infoElement.species + '<br/>' + '<br/>' +
            '<span class="bold">' + 'Status: ' + '</span>' + infoElement.status;

    containerElement.classList.add('card__style');
    let imgElement = document.createElement("img");
    imgElement.src = infoElement.image;
    imgElement.alt = infoElement.name;
    imgElement.classList.add('img__character');
    containerElement.appendChild(imgElement);

}

function removeImg() {
    const img = article.querySelector('.img__character');
    if (img)
        article.removeChild(img);
}

/* ----------- Get 4 characters ----------------  */

const getSomeCharacters = async () => {
	try {
        const response = await axiosInstance.get(`https://rickandmortyapi.com/api/character/8,15,3,4`);
        let characters = response.data;
        showCharacters(characters);
    } catch (error) {
        console.log(error)
    }
}

getSomeCharacters();

function showCharacters(characters) {
    const articles = document.querySelectorAll('.character__article');

    let counter = 0;    
    articles.forEach(article => {
        if (counter >= characters.length)
            return;
        let paragraph = article.querySelector('.character__info');
        makeCharacterInfoText (article,paragraph, characters[counter]);
        counter++;
    })
}











