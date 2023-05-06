//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// récupère des données de photographes à partir d'un fichier JSON, 
//crée des éléments DOM pour chaque photographe en utilisant la fonction photographerFactory
//affiche ces éléments sur la page en utilisant la fonction "displayData"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Importer la fonction photographerFactory depuis le module photographerprofil.js
import { photographerFactory } from "../factories/photographerprofil.js";

// Fonction pour afficher les données des photographes sur la page
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

// Parcourir chaque photographe et créer un élément DOM pour leurs données en utilisant la fonction photographerFactory
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Loop through each photographer and create a DOM element for their data using the photographerFactory function
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction pour initialiser la page
async function init() {
  // Retrieve the photographer data from the JSON file
  const photographers = await getPhotographers();

// Afficher les données des photographes sur la page
displayData(photographers);
}

// Appeler la fonction init pour initialiser la page
init();
