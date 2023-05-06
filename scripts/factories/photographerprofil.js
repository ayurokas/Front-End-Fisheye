const photographerFactory = (data) => {
  // Destructure properties from the input object
  const { name, portrait, id, country, city, tagline, price } = data;

  // Construct the URL of the photographer's picture
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

  // Function to create the photographer's card DOM element
  function getUserCardDOM() {
    const article = document.createElement("article");

    // Create a link with the photographer's name and image
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

    // Create a block of text with the photographer's location, tagline, and price below the link
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

  // Function to create the photographer's header text DOM element
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

  // Function to create the photographer's avatar DOM element
  function getUserAvatarDOM() {
    const avatar = document.createElement("img");
    avatar.setAttribute("alt", name);
    avatar.setAttribute("src", picture);

    return avatar;
  }

  // Return an object with the photographer's name, picture, and the three DOM element creating functions
  return {
    name,
    picture,
    getUserCardDOM,
    getUserHeaderTextDOM,
    getUserAvatarDOM,
  };
};

// Export the photographerFactory function as a module
export { photographerFactory };
