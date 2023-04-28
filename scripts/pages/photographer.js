const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographerMedia() {
  const response = await fetch('https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json');
  const data = await response.json();
  console.log(data); // Affiche les données renvoyées par l'API dans la console
  return data;
}

function displayPhotographerInfo(data, photographerId) {
  const photographer = data.photographers.find((p) => p.id == photographerId);
  const photographerName = document.querySelector('h1');
  if (photographerName !== null) {
    photographerName.innerText = photographer.name;
  }
}

function displayPhotographerMedia(data, photographerId) {
  const photographer = data.photographers.find((p) => p.id == photographerId);
  const photographerMedias = data.media.filter((media) => media.photographerId == photographerId);

  const picturesMediasSection = document.querySelector('.pictures_medias');
  photographerMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaDOM();
    picturesMediasSection.appendChild(mediaDOM);
  });
}

async function init() {
  const data = await getPhotographerMedia();
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  displayPhotographerInfo(data, photographerId);
}

init();
