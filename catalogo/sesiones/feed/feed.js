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