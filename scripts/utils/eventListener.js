import {
  displayLightbox, // afficher la boîte de dialogue de la photo en grand
  handleLike, // gérer les actions de like (ajouter ou retirer) sur les photos
  handleSelector, // gérer les sélections dans le sélecteur de tri
  handleTabIndexForSelector, // gérer l'accessibilité du sélecteur de tri
  movingMedia, // gérer le déplacement des photos dans la boîte de dialogue
} from "../pages/photographer.js";

import { closeModal, displayModal, sendForm } from "./contactForm.js";

// Ajouter un écouteur d'événement sur chaque cœur pour gérer l'activation/désactivation des likes
const updateLike = () => {
  const mediaCardsHeart = document.querySelectorAll("article div p i");
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("click", (e) => {
      handleLike(e.target);
    })
  );

  // Si l'utilisateur appuie sur la touche Entrée, ajouter un like sur la photo
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLike(e.target);
      }
    })
  );
};


const initFormListener = () => {

// ouvre la boîte de dialogue
  const formOpenerBtn = document.querySelector(
    ".photograph-header .contact_button"
  );
  formOpenerBtn.addEventListener("click", displayModal);

// Fermer la boîte de dialogue lorsqu'on clique sur la croix
  const formClosingBtn = document.querySelector(".contact_modal header img");
  formClosingBtn.addEventListener("click", closeModal);

// Envoyer les données du formulaire
  const formSubmitBtn = document.querySelector(".contact_modal form");
  formSubmitBtn.addEventListener("submit", (e) => sendForm(e));
};

// Ajouter un écouteur d'événement sur le sélecteur pour mettre à jour et trier les médias
const initSelectListener = (choicesContainer) => {
  const selector = document.querySelector(".selector");

  selector.addEventListener("click", () => {
    selector.classList.add("open");
    selector.setAttribute("aria-expanded", "true");
    handleTabIndexForSelector("open");
  });

  choicesContainer.forEach((choice) =>
    choice.addEventListener("click", (e) => {
      handleSelector(e);
      selector.setAttribute("aria-expanded", "false");
      handleTabIndexForSelector("close");
    })
  );
};

// Ajouter un écouteur d'événement sur toutes les images pour lancer la boîte de dialogue de la photo en grand
const initLightbox = () => {
  const articles = document.querySelectorAll("article img");
  articles.forEach((article) => {
    article.addEventListener("click", (e) => displayLightbox(e.target));
  });
  articles.forEach((article) => {
    article.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && displayLightbox(e.target)
    );
  });
};

// Gérer le déplacement des photos
const initLightboxChevronListener = (medias, lightboxContainerDOM) => {
  const chevronRight = document.querySelector(".fa-chevron-right");
  chevronRight.addEventListener("click", () =>
    movingMedia("right", medias, lightboxContainerDOM)
  );

  const chevronLeft = document.querySelector(".fa-chevron-left");
  chevronLeft.addEventListener("click", () =>
    movingMedia("left", medias, lightboxContainerDOM)
  );

// Gérer le déplacement des photos à l'aide des touches de direction du clavier
  const mainMedia = document.querySelectorAll(".media__container")[1];
  mainMedia.setAttribute("tabindex", "1");
  mainMedia.focus();
  mainMedia.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      movingMedia("right", medias, lightboxContainerDOM);
    } else if (e.key === "ArrowLeft") {
      movingMedia("left", medias, lightboxContainerDOM);
    }
  });
};

export {
  updateLike,
  initFormListener,
  initSelectListener,
  initLightbox,
  initLightboxChevronListener,
};
