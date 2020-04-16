var size = window
  .getComputedStyle(document.body, ':after')
  .getPropertyValue('content');

(function alertSize() {
  if (size.indexOf('Splus') != -1) {
    document.body.textContent =
      size + ' I will run functions for small screens';
  }
  if (size.indexOf('Mplus') != -1) {
    document.body.textContent =
      size + ' Run a different function at medium sizes';
  }
  if (size.indexOf('Lplus') != -1) {
    document.body.textContent =
      size + ' I will run functions for LARGE screens';
  }
})();
