const container = document.querySelector(".modal_container");
const slider = document.querySelector(".slider");
const before = document.querySelector(".img-container-before");
const after = document.querySelector(".img-container-after");

var modals = document.getElementsByClassName("modal");

for (let index = 0; index < modals.length; index++) {
  var btn = document.getElementById("myBtn"+index);
  let modal = document.getElementById("myModal"+index)
  var span = document.getElementsByClassName("close")[index];
  // When the user clicks the button, open the modal 
  btn.onclick = function () {
    var modal = document.getElementById("myModal"+index)
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    // var modal = document.getElementById("myModal"+index)
      modal.style.display = "none";
  }
};


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    for (let index = 0; index < modals.length; index++) {
      var modal = document.getElementById("myModal"+index)
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }




const dragSlider = (e) => {
  let x = e.type.includes("mouse") ? e.layerX : e.touches[0].clientX;
  let size = container.offsetWidth;
  before.style.width = x + "px";
  slider.style.left = x + "px";
  if (x < 30) {
    before.style.width = 0;
    slider.style.left = 0;
  }
  if (x + 30 > size) {
    before.style.width = size + "px";
    slider.style.left = size + "px";
  }
};

// Mouse event
container.addEventListener("mousemove", dragSlider);
// Touch and drag events
container.addEventListener("touchstart", dragSlider);
container.addEventListener("touchmove", dragSlider);


