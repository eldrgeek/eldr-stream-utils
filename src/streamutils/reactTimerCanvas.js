while (box.firstChild) {
  //The list is LIVE so it will re-index each call
  box.removeChild(box.firstChild);
}
