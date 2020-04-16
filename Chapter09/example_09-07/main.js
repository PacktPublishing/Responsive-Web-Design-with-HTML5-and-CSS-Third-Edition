// First wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // First things first, we have JavaScript, so let's tell the document
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
  // This function merely toggles the class
  function a(event) {
    event.stopPropagation();
    document.body.classList.toggle('OffCanvas-Active');
  }
  function b() {
    document.body.classList.remove('OffCanvas-Active');
  }
  // When the header is clicked we fire the function to toggle the class
  document.querySelector('.off-canvas-launcher').addEventListener('click', a);
  document.querySelector('.main-content').addEventListener('click', b);

  // This debounce function (via: https://remysharp.com/2010/07/21/throttling-function-calls) merely stops functioned firing too often on repetitive events (such as resize/scroll)
  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  // removing the class from the body inside a debounce
  var debouncedA = debounce(function() {
    document.body.classList.remove('OffCanvas-Active');
  }, 250);

  // When the window is resized, we want to fire the debouncedA function
  window.onresize = debouncedA;
});
