const config = window.electronAPI.config;
const path = window.electronAPI.path;

let windowID;
let currentID;
const images = [];
const image = document.querySelector('#image');
image.addEventListener('click', () => {
  window.electronAPI.action("next");
});

const back = document.querySelector('#back');
back.style.top = config.back.y + 'px';
back.style.left = config.back.x + 'px';
back.style.width = config.back.width + 'px';
back.style.height = config.back.height + 'px';
back.addEventListener('click', () => {
  window.electronAPI.action("prev");
});

const reset = document.querySelector('#reset');
reset.style.top = config.reset.y + 'px';
reset.style.left = config.reset.x + 'px';
reset.style.width = config.reset.width + 'px';
reset.style.height = config.reset.height + 'px';
reset.addEventListener('click', () => {
  window.electronAPI.action("reset");
});

window.electronAPI.init((event, _id) => {
  console.log("init");
  windowID = _id;
  config.images.forEach((img, i) => {
    const preload = new Image();
    preload.src = path + "/" + img[windowID];
    images.push(preload);
  });
  image.src = path + "/" + config.images[0][windowID];
})

window.electronAPI.update((event, _id) => {
  console.log("update");
  currentID = _id;
  image.src = path + "/" + config.images[currentID][windowID];
});