const FILE_TYPES = ['png', 'jpeg', 'jpg', 'gif'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const IMAGE_SIZE = '100%';

const avatarUploadContainer = document.querySelector('.ad-form-header__upload');
const avatarChooser = avatarUploadContainer.querySelector('.ad-form__field input[type="file"]');
const avatarPreview = avatarUploadContainer.querySelector('.ad-form-header__preview img');

const accomodationPhotoContainer = document.querySelector('.ad-form__photo-container');
const photoChooser = accomodationPhotoContainer.querySelector('.ad-form__upload input[type="file"]');
const photoPreview = accomodationPhotoContainer.querySelector('.ad-form__photo');

function fileChooserChangingHandler(evt){
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
  if(matches){
    const url = URL.createObjectURL(file);
    if (this.matches('img')){
      this.src = url;
    }
    else{
      const image = document.createElement('img');
      image.src = url;
      image.style.height = image.style.width = IMAGE_SIZE;
      this.innerHTML = '';
      this.appendChild(image);
    }
  }
}

avatarChooser.addEventListener('change', fileChooserChangingHandler.bind(avatarPreview));
photoChooser.addEventListener('change', fileChooserChangingHandler.bind(photoPreview));

const resetImages = () => {
  avatarPreview.src = DEFAULT_AVATAR_URL;
  photoPreview.innerHTML = '';
};

export { resetImages };
