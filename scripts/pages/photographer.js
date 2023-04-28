const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
console.log(photographerId);

function getPhotographerData() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    return fetch('https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json')
      .then(response => response.json())
      .then(data => {
        const photographerData = data.photographers.find(photographer => photographer.id == id);
        return photographerData;
      });
  }
  