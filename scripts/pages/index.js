fetch('https://raw.githubusercontent.com/ayurokas/Front-End-Fisheye/main/data/photographers.json')
  .then(response => response.json())
  .then(data => {
    const photographerSection = document.querySelector('.photographer_section');
    data.photographers.map(photographer => {
      const photographerCard = photographerFactory(photographer).getUserCardDOM();
      photographerSection.appendChild(photographerCard);
    });
  });
