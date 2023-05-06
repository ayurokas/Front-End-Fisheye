//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ce fichier JS définit une fonction nommée "photographerFactory", 
//qui crée des objets contenant les informations sur un photographe, ainsi que des fonctions pour générer des éléments DOM avec ces informations.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function qui contient un objet data avec des les information du photographer
const photographerFactory = (data) => {
  const { name, portrait, id, country, city, tagline, price } = data; //extrait les valeur

// Construit l'URL de la photo du photographe
const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

// Fonction pour créer l'élément DOM de la carte du photographe
function getUserCardDOM() {
    const article = document.createElement("article");

// Crée un lien avec le nom et l'image du photographe
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    link.appendChild(img);
    link.appendChild(h2);

// Crée un bloc de texte avec l'emplacement, le slogan et le prix du photographe sous le lien
  const description = document.createElement("div");
    const locationPhotographer = document.createElement("p");
    locationPhotographer.innerText = `${city}, ${country}`;
    const taglineText = document.createElement("p");
    taglineText.innerText = `${tagline}`;
    const priceText = document.createElement("p");
    priceText.innerText = `${price}€/jour`;

    description.appendChild(locationPhotographer);
    description.appendChild(taglineText);
    description.appendChild(priceText);

    article.appendChild(link);
    article.appendChild(description);
    return article;
  }

// Fonction pour créer l'élément DOM du texte d'en-tête du photographe
  function getUserHeaderTextDOM() {
    const description = document.createElement("div");
    const title = document.createElement("h1");
    title.innerText = name;
    const locationPhotographer = document.createElement("p");
    locationPhotographer.innerText = `${city}, ${country}`;
    const taglineText = document.createElement("p");
    taglineText.innerText = `${tagline}`;

    description.appendChild(title);
    description.appendChild(locationPhotographer);
    description.appendChild(taglineText);

    return description;
  }

// Fonction pour créer l'élément DOM de l'avatar du photographe
    function getUserAvatarDOM() {
    const avatar = document.createElement("img");
    avatar.setAttribute("alt", name);
    avatar.setAttribute("src", picture);

    return avatar;
  }

// Retourne un objet avec le nom du photographe, la photo et les trois fonctions de création d'éléments DOM
return {
    name,
    picture,
    getUserCardDOM,
    getUserHeaderTextDOM,
    getUserAvatarDOM,
  };
};

//exporte la fonction "photographerFactory" en tant que module, afin qu'elle puisse être utilisée dans d'autres fichiers JS.
export { photographerFactory };
