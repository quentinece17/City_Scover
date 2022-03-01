var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  //console.log(document.getElementById("leisure-outdoor").checked)
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}