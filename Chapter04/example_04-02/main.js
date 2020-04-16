// First wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function(){
	"use strict";
	var theBody = document.querySelector("body");
	// This function merely toggles the class
	function toggleClass() {
		theBody.classList.toggle("OffCanvas-Active");
	}
	// When the header is clicked we fire the function to toggle the class
	document.querySelector(".Header").addEventListener("click", toggleClass );

	// The section below merely deals with resize events

	// This debounce function (via: https://remysharp.com/2010/07/21/throttling-function-calls) merely stops functioned firing too often on repetitive events (such as resize/scroll)
	function debounce(fn, delay) {
		var timer = null;
		return function () {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}

	// removing the class from the body inside a debounce
	var debouncedA = debounce(function() {
		theBody.classList.remove("OffCanvas-Active");
	}, 250);

	// When the window is resized, we want to fire the debouncedA function
	window.onresize = debouncedA;
});