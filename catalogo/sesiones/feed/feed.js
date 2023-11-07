// Get the modal
var modal = document.getElementsByClassName("card_exp");

// Get all the image elements with class "card_exp"
var images = document.getElementsByClassName("card_exp");

// Get the <span> element that closes the modal
var x = document.getElementsByClassName('x')[0];
var span = document.getElementsByClassName('carousel')[0];
var bg = document.getElementsByClassName("modal");

// Loop through each image and attach the click event
for (var i = 0; i < images.length; i++) {
  images[i].onclick = function() {
    setTimeout('span.style.display = "block";', 100)
    span.style.opacity = "1";
    setTimeout('bg[0].style.opacity = "1";',100)
    /*modal.style.display = "block";*/
  };
}

// When the user clicks on <span> (x), close the modal
x.onclick = function(){
  span.style.display = "none";
  span.style.opacity = "0";
  modal.style.opacity = "0";
  setTimeout('modal.style.display = "none";', 300)
};

var gridImages = Array.from(document.getElementsByClassName('img_card'));
var carouselImages = document.querySelector('.carousel-images');
var prevButton = document.querySelector('#prev-card');
var nextButton = document.querySelector('#next-card');
var modal = document.querySelector('.modal');
var modalImg = document.querySelector('.modal-content');
var currentIndex = 0;


gridImages.forEach(function(image, index) {
  image.addEventListener('click', function() {
    currentIndex = index;
    showImage(currentIndex);
    modal.style.display = 'block';
  });
});


// Navega para a imagem anterior

prevButton.addEventListener('click', function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = gridImages.length - 1;
  }
  showImage(currentIndex);
});

nextButton.addEventListener('click', function() {
  currentIndex++;
  if (currentIndex >= gridImages.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
});

// Define os manipuladores de eventos para os botões de navegação
prevButton.addEventListener('click', prevButton);
nextButton.addEventListener('click', nextButton);

// Exibe a primeira imagem ao carregar a página
function showImage(index) {
  modalImg.src = gridImages[index].src;
}





/* ====== TOUCH ====== */
var touchStartX = 0;
var touchEndX = 0;
var touchStartY = 0;
var touchEndY = 0;

modal.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, false);

modal.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
  var swiped = 'swiped: ';
  if (touchEndX < touchStartX) {
      swiped += 'left';
  }
  if (touchEndX > touchStartX) {
      swiped += 'right';
  }
  if (touchEndY < touchStartY) {
      swiped += 'up';
  }
  if (touchEndY > touchStartY) {
      swiped += 'down';
  }
  if (swiped.includes('left')) {
      // Ir a la imagen anterior
      prevButton.click();
  }
  if (swiped.includes('right')) {
      // Ir a la imagen siguiente
      nextButton.click();
  }
  if (swiped.includes('down')) {
      // Cerrar el modal solo si la aplicación está en modo standalone
      if (window.matchMedia('(display-mode: standalone)').matches && Math.abs(touchStartY - touchEndY) > 100) {
        x.click();
      }
      /* if (window.matchMedia('(display-mode: standalone)').matches) {
          x.click();
      } */
      /* if (Math.abs(touchStartY - touchEndY) > 100) {
        x.click();
      } */ // Sin display-mode: standalone
  }
}





/* // Obtén el elemento que contiene el modal
var modalContainer = document.querySelector('.modal');

// Obtén la imagen dentro del modal
var modalImage = document.querySelector('.modal-content');

// Cuando el usuario hace clic en el modalContainer, cierra el modal
modalContainer.addEventListener('click', function(event) {
    // Si el usuario hizo clic en el modalContainer, cierra el modal
    if (event.target === modalContainer) {
        x.click();
    }
});

// Cuando el usuario hace clic en la imagen, evita que el evento se propague al modalContainer
modalImage.addEventListener('click', function(event) {
    event.stopPropagation();
}); */