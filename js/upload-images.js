const FILE_TYPES = ['png', 'jpeg', 'jpg', 'gif'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const IMAGE_SIZE = '100%';

const avatarUploadContainerElement = document.querySelector('.ad-form-header__upload');
const avatarChooserElement = avatarUploadContainerElement.querySelector('.ad-form__field input[type="file"]');
const avatarPreviewElement = avatarUploadContainerElement.querySelector('.ad-form-header__preview img');

const accomodationPhotoContainerElement = document.querySelector('.ad-form__photo-container');
const photoChooserElement = accomodationPhotoContainerElement.querySelector('.ad-form__upload input[type="file"]');
const photoPreviewElement = accomodationPhotoContainerElement.querySelector('.ad-form__photo');

const createFileChooserChangingHandler = (previewElement) => (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
  if(matches){
    const url = URL.createObjectURL(file);
    if (previewElement.matches('img')){
      previewElement.src = url;
    }
    else{
      const imageElement = document.createElement('img');
      imageElement.src = url;
      imageElement.style.height = IMAGE_SIZE;
      imageElement.style.width = IMAGE_SIZE;
      previewElement.innerHTML = '';
      previewElement.appendChild(imageElement);
    }
  }
};

const avatarChooserChangingHandler = createFileChooserChangingHandler(avatarPreviewElement);
const photoChooserChangingHandler = createFileChooserChangingHandler(photoPreviewElement);

avatarChooserElement.addEventListener('change', avatarChooserChangingHandler);
photoChooserElement.addEventListener('change', photoChooserChangingHandler);

const resetImages = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR_URL;
  photoPreviewElement.innerHTML = '';
};

export { resetImages };
