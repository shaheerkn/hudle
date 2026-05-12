document.querySelector('.navbar__toggle').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.navbar__nav').classList.toggle('active');
});
