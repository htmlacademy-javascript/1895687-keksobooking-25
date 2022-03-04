import { createLocation } from './create-location';
import { createAnAuthor } from './create-author';
import { createAnOffer } from './create-offer';

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
