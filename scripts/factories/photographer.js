function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement('article');
      const link = document.createElement('a');
      link.setAttribute('href', `photographer.html?id=${id}`);
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', `${name} - ${tagline}`);
      const h2 = document.createElement('h2');
      h2.textContent = name;
      const h3 = document.createElement('h3');
      h3.textContent = `${city}, ${country}`;
      const p1 = document.createElement('p');
      p1.classList.add('slogan');
      p1.textContent = tagline;
      const p2 = document.createElement('p');
      p2.classList.add('prix');
      p2.textContent = `${price}€/jour`;
  
      link.appendChild(img);
      article.appendChild(link);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(p1);
      article.appendChild(p2);
      return article;
    }
  
    return { id, name, city, country, tagline, price, picture, getUserCardDOM };
  }
  