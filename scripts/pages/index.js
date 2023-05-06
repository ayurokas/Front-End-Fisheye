//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cette partie de code récupère les données des photographes à partir d'un fichier JSON, 
//affiche ces éléments sur la page en utilisant la fonction "displayData".
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Cette ligne importe la fonction photographerFactory depuis le module photographerprofil.js.
import { photographerFactory } from "../factories/photographerprofil.js";

// Cette fonction récupère les données des photographes à partir d'un fichier JSON en utilisant l'API fetch.
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Cette fonction parcourt chaque photographe et crée un élément DOM pour leurs données en utilisant la fonction photographerFactory.
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Cette fonction appelle les fonctions getPhotographers
async function init() {
  const photographers = await getPhotographers();

// Afficher les données des photographes sur la page
displayData(photographers);
}

// Cette ligne appelle la fonction init() pour initialiser la page et afficher les données des photographes dès le chargement de la page.
init();
