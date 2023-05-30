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




