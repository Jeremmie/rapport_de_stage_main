var workModal = document.getElementsByClassName("workModal");

for (let index = 0; index < workModal.length; index++) {
  var workBtn = document.getElementById("myWorkBtn"+index);
  let workModal = document.getElementById("myWorkModal"+index)
  var workSpan = document.getElementsByClassName("workClose")[index];
  // When the user clicks the button, open the workModal 
  workBtn.onclick = function () {
    var workModal = document.getElementById("myWorkModal"+index)
    workModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the workModal
  workSpan.onclick = function () {
    // var workModal = document.getElementById("myworkModal"+index)
      workModal.style.display = "none";
  }
};


  // When the user clicks anywhere outside of the workModal, close it
  window.onclick = function (event) {
    for (let index = 0; index < workModal.length; index++) {
      var workModals = document.getElementById("myWorkModal"+index)
      if (event.target == workModals) {
        workModals.style.display = "none";
      }
    }
  }


