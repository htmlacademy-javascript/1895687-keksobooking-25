import { generateInteger } from './number-generators.js';

const authorsInfo = {      //to exclude repeatitions
  packSize: 10,
  lastPackIds: [],
  currentBorder:10
};

const createAnAuthor = () => {
  let avatar = 'img/avatars/user';
  if (authorsInfo.lastPackIds.length === authorsInfo.packSize){
    authorsInfo.lastPackIds.splice(0,authorsInfo.lastPackIds.length);
    authorsInfo.currentBorder+=authorsInfo.packSize;
  }
  const min = authorsInfo.currentBorder - authorsInfo.packSize + 1;
  const max = authorsInfo.currentBorder;
  let id = generateInteger(min, max);
  while(authorsInfo.lastPackIds.includes(id)){
    id = generateInteger(min, max);
  }
  authorsInfo.lastPackIds.push(id);
  id = String(id).padStart(2,'0');
  avatar = avatar.concat(id, '.png');
  return {
    avatar
  };
};

const createAuthors = (count = 10) => Array.from({length: count}, createAnAuthor);

export{
  createAnAuthor,
  createAuthors
};
