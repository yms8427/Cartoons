var now = new Date().getFullYear();
var startingYear = 1990;

function increase() {
  var txt = document.getElementById("txtYear");
  var year = parseInt(txt.value);
  var newValue = year + 1;
  if (newValue <= now) {
    txt.value = newValue;
  }
}

function decrease() {
  var txt = document.getElementById("txtYear");
  var year = parseInt(txt.value);
  var newValue = year - 1;
  if (newValue >= startingYear) {
    txt.value = newValue;
  }
}

window.onload = function () {
  document.getElementById("btnSearch").onclick = function () {
    alert("4 sonuç listeleniyor");
  };
};
