//fonction pour récupérer et afficher les éléments des photographes sur la page photographe
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, portrait, city, country, id, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const lien = document.createElement('a');
        lien.setAttribute("href", "photographer.html?id=" + id)
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const slogan = document.createElement('p');
        slogan.textContent = tagline;
        slogan.classList.add("slogan");
        const prix = document.createElement('p');
        prix.textContent = price + " €/jour";
        prix.classList.add("prix");
        lien.appendChild(img);
        lien.appendChild(h2);
        article.appendChild(lien);
        article.appendChild(h3);
        article.appendChild(slogan);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }

}


