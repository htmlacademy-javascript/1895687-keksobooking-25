import { createLocation } from './create-location.js';
import { createAnAuthor } from './create-author.js';
import { createAnOffer } from './create-offer.js';

const createAnAdvert = () => {
  const location = createLocation();
  return {
    author: createAnAuthor(),
    offer: createAnOffer(location),
    location
  };
};

const createAdverts = (count = 10) => Array.from({length:count}, createAnAdvert);

export{
  createAnAdvert,
  createAdverts
};
