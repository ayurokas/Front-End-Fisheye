// Code pour la page d'accueil

async function getPhotographers() {
    const response = await fetch('https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json');
    const data = await response.json();
    console.log(data); // Affiche les données renvoyées par l'API dans la console
    return data;
  }
  
  function displayPhotographers(data) {
    const photographers = data.photographers;
    const photographersSection = document.querySelector('.photographer_section');
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      const photographerLink = userCardDOM.querySelector('a'); // Récupérer le lien dans la carte de photographe
      photographerLink.addEventListener('click', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut de la balise "a"
        const photographerId = photographer.id;
        window.location.href = `photographer.html?id=${photographerId}`; // Rediriger l'utilisateur vers la page photographe avec l'id du photographe comme paramètre de l'url
      });
      photographerLink.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Empêcher le comportement par défaut de la balise "a"
          const photographerId = photographer.id;
          window.location.href = `photographer.html?id=${photographerId}`; // Rediriger l'utilisateur vers la page photographe avec l'id du photographe comme paramètre de l'url
        }
      });
      photographersSection.appendChild(userCardDOM);
    });
  }
  
  async function init() {
    const data = await getPhotographers();
    displayPhotographers(data);
  }