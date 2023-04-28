function mediaFactory(media) {
    const { id, photographerId, image, video, title, description, tags, likes, date } = media;
    const mediaType = video ? 'video' : 'image';
  
    function getMediaDOM() {
      const mediaElement = document.createElement(mediaType);
      mediaElement.classList.add('media');
      mediaElement.setAttribute('src', `assets/images/${image}`);
      mediaElement.setAttribute('alt', title);
  
      if (mediaType === 'video') {
        mediaElement.setAttribute('controls', '');
      }
  
      const mediaTitle = document.createElement('h2');
      mediaTitle.classList.add('media__title');
      mediaTitle.textContent = title;
  
      const mediaLikes = document.createElement('p');
      mediaLikes.classList.add('media__likes');
      mediaLikes.textContent = likes;
  
      const mediaDate = document.createElement('p');
      mediaDate.classList.add('media__date');
      mediaDate.textContent = date;
  
      const mediaDescription = document.createElement('p');
      mediaDescription.classList.add('media__description');
      mediaDescription.textContent = description;
  
      const mediaTags = document.createElement('div');
      mediaTags.classList.add('media__tags');
      tags.forEach((tag) => {
        const tagElement = document.createElement('a');
        tagElement.classList.add('tag');
        tagElement.textContent = `#${tag}`;
        mediaTags.appendChild(tagElement);
      });
  
      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media__container');
      mediaContainer.appendChild(mediaTitle);
      mediaContainer.appendChild(mediaLikes);
      mediaContainer.appendChild(mediaDate);
      mediaContainer.appendChild(mediaDescription);
      mediaContainer.appendChild(mediaTags);
  
      const mediaWrapper = document.createElement('div');
      mediaWrapper.classList.add('media__wrapper');
      mediaWrapper.appendChild(mediaElement);
      mediaWrapper.appendChild(mediaContainer);
  
      return mediaWrapper;
    }
  
    return { id, photographerId, image, video, title, description, tags, likes, date, getMediaDOM };
  }
  