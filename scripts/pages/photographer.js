//////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//gérer l'affichage et les interactions sur la page de profil d'un photographe. 
//Elle importe des fonctions et des modules nécessaires au bon fonctionnement de la page.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//importe des fonctions et des modules nécessaires pour le fonctionnement de la page.
import { photographerFactory } from "../factories/photographerprofil.js";
import { mediaFactory } from "../factories/media.js";
import {
  initFormListener,
  initLightbox,
  initLightboxChevronListener,
  initSelectListener,
  updateLike,
} from "../utils/eventListener.js";

// Récupère l'ID de l'URL actuelle
const url = new URL(window.location);
const id = parseInt(url.searchParams.get("id"));

//récupérer les choix de tri et de les stocker dans les variables 
let sorted = "popularité";
const choicesContainer = document.querySelectorAll(".sort ul li a");

// Récupère les données du photographe
async function getPhotographerData() {

  // Ajoute la clé "HasLike" initialisée à "false" pour gérer l'ajout et la suppression de likes par l'utilisateur
  const getMedia = (medias) => {
    let mediasArr = medias.filter((media) => media.photographerId === id);
    mediasArr.forEach((media) => (media.hasLike = false));
    return mediasArr;
  };
  const getPhotographer = (photographer) => {
    let photographerData = photographer.filter((data) => data.id === id);
    return photographerData;
  };
  // Rassemble toutes les données dans un tableau trié par photographes et médias
  const data = await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => [
      getPhotographer(data.photographers),
      getMedia(data.media),
    ]);

  return data;
}

// Affiche les données du photographe sur sa page
async function displayPhotographerData(photographerDatas) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographer = photographerFactory(photographerDatas[0][0]);
  const userHeaderTextDOM = photographer.getUserHeaderTextDOM();
  photographersHeader.prepend(userHeaderTextDOM);
  const userAvatarDOM = photographer.getUserAvatarDOM();
  photographersHeader.appendChild(userAvatarDOM);
}

// Affiche le conteneur en bas de la page avec le total des likes et le prix
const displayLikeCountAndPrice = async (photographerDatas) => {
  const priceAndLikeContainer = document.querySelector(".like__container");
  priceAndLikeContainer.innerHTML = "";
  const mediaModel = mediaFactory(photographerDatas[1]);
  const likeAndPriceData = mediaModel.getLikeAndPriceContainerDOM(
    photographerDatas[0][0]
  );
  priceAndLikeContainer.appendChild(likeAndPriceData[0]);
  priceAndLikeContainer.appendChild(likeAndPriceData[1]);
};

// Trie les médias par date, popularité ou titre
async function displaySortedMedia(photographerData, value = "popularité") {
  let sortedMedia;
  if (value === "popularité") {
    sortedMedia = photographerData[1].sort((a, b) => b.likes - a.likes);
  } else if (value === "date") {
    sortedMedia = photographerData[1].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (value === "titre") {
    sortedMedia = photographerData[1].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    sortedMedia = photographerData[1];
  }

  displayMedia(sortedMedia, photographerData[0][0].name);
}

// Affiche les médias
async function displayMedia(medias, photographerName) {
  const mediaSection = document.querySelector(".medias");
  mediaSection.innerHTML = "";
  medias.map((media) => {
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  initLightbox();
}

// Gère le filtre sélectionné par l'utilisateur
const handleSelector = (e) => {
  let selected = e.target.innerText;
  const choices = ["Popularité", "Date", "Titre"].filter(
    (choice) => choice !== selected
  );

  cleanUpChoices();

//Met à jour le sélecteur avec le filtre sélectionné en haut et les autres cachés
  // eslint-disable-next-line no-undef
  selector.innerText = selected;
  choicesContainer[0].innerText = selected;
  choicesContainer[1].innerText = choices[0];
  choicesContainer[2].innerText = choices[1];

// Mettre à jour les données et initialiser à nouveau le like
  sorted = selected.toLowerCase();
  displaySortedMedia(medias, sorted);
  updateLike();

// Fermer le sélecteur
  // eslint-disable-next-line no-undef
  selector.classList.remove("open");
};

// Supprimer tous les span pour mettre à jour le sélecteur
const cleanUpChoices = () => {
  choicesContainer.forEach((choice) => (choice.innerText = ""));
};

// Gère le tabindex pour le sélecteur et la liste déroulante lors de l'ouverture / fermeture
const handleTabIndexForSelector = (option) => {
  if (option === "open") {
    choicesContainer.forEach((choice) => {
      choice.setAttribute("tabindex", "1");
    });
    // eslint-disable-next-line no-undef
    selector.setAttribute("tabindex", "-1");
    choicesContainer[0].focus();
  } else if (option === "close") {
    choicesContainer.forEach((choice) => {
      choice.setAttribute("tabindex", "-1");
    });
    // eslint-disable-next-line no-undef
    selector.setAttribute("tabindex", "1");
    // eslint-disable-next-line no-undef
    selector.focus();
  }
};
// Ajoute ou supprime un like en fonction du coeur cliqué
const handleLike = (heart) => {
  const target = medias[1].filter(
    (media) => media.id === checkTargetLike(heart)
  )[0];

  if (hasLike(target)) {
    target.hasLike = false;
  } else if (!hasLike(target)) {
    target.hasLike = true;
  }
  displaySortedMedia(medias, sorted);
  displayLikeCountAndPrice(medias);
  updateLike();
};

// Vérifie si le média a déjà été aimé ou non
const hasLike = (target) => {
  const heartToCheck = target.hasLike;
  if (heartToCheck) {
    return true;
  } else {
    return false;
  }
};

// Vérifie quel média correspond à l'ID du coeur
const checkTargetLike = (heart) => {
  const heartId = parseInt(heart.getAttribute("data-id"));
  return heartId;
};

// Met à jour le nom dans le formulaire
const updateFormWithName = (data) => {
  const modalTitle = document.querySelector(".modal_name");
  modalTitle.innerText = data[0][0].name;
};

// Affiche le média selon le média cliqué initialement ou reçu après déplacement
const displayLightbox = (target) => {
  const id =
    typeof target == "number" ? target : target.getAttribute("data-id");
  const lightbox = document.querySelector(".lightbox");
  const mediaModel = mediaFactory();
  const lightboxContainerDOM = mediaModel.getLightboxContainerDOM(
    id,
    medias[1]
  );
  lightbox.appendChild(lightboxContainerDOM[0]);

  initLightboxChevronListener(medias, lightboxContainerDOM[1]);
};

// Ajoute une classe pour déplacer le média selon le chevron cliqué et met à jour la lightbox
const movingMedia = (direction, allMedias, currentMedias) => {
  const imgs = document.querySelector(".medias__container");
  if (direction === "left") {
    imgs.classList.add("move__left");
    setTimeout(() => {
      displayLightbox(currentMedias[0].id, allMedias);
    }, 500);
  } else if (direction === "right") {
    imgs.classList.add("move__right");
    setTimeout(() => {
      displayLightbox(currentMedias[2].id, allMedias);
    }, 500);
  }
};

// Récupérer toutes les données
async function init() {
  const photographerData = await getPhotographerData();


  displayPhotographerData(photographerData);// Afficher les données du photographe sur sa page
  displayLikeCountAndPrice(photographerData);// Afficher le container fixe en bas avec le nombre de likes et le prix total
  displaySortedMedia(photographerData, sorted);// Trier les médias par date, popularité ou titre
  updateFormWithName(photographerData);// Mettre à jour le nom dans le formulaire
  initLightbox();// Initialiser la lightbox
  updateLike();// Mettre à jour le like
  initFormListener();// Initialiser les événements liés au formulaire
  initSelectListener(choicesContainer);// Initialiser les événements liés au sélecteur

  return photographerData;
}

// Récupérer les données et afficher toutes les données
const medias = await init();


// Exporter les fonctions nécessaires pour les utiliser dans d'autres fichiers
export {
  handleLike,
  handleSelector,
  handleTabIndexForSelector,
  displayLightbox,
  movingMedia,
};
