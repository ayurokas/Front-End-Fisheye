async function getPhotographers() {
    const response = await fetch('https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json');
    const data = await response.json();
    console.log(data); // Affiche les données renvoyées par l'API dans la console
    return data;
}

async function displayData(data) {
    const photographers = data.photographers;
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
// Ajoute un gestionnaire d'événement click à chaque photographe
const photographers = document.querySelectorAll('.photographer');
photographers.forEach((photographer) => {
    photographer.addEventListener('click', (event) => {
        const id = photographer.dataset.id;
        changePageUrl(id);
    });
});

// Fonction pour changer l'URL de la page
function changePageUrl(id) {
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    history.pushState({}, '', url.toString());
}

// Fonction pour charger les données du photographe correspondant à l'id
async function loadPhotographer(id) {
    const response = await fetch(`https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json`);
    const data = await response.json();
    const photographer = data.photographers.find(p => p.id == id);
    // Afficher les données du photographe sur la page
}


async function init() {
    const data = await getPhotographers();
    displayData(data);
};

init();
