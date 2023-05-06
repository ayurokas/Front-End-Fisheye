// importe la fonction photographerFactory depuis le module photographerprofil.js
import { photographerFactory } from "../factories/photographerprofil.js";

// Récupère les données depuis un fichier JSON
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Fonction displayData avec une boucle for each en utilisant la fonction photographerFactory.
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();

// Affiche les données
displayData(photographers);
}

init();
