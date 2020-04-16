;(function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
})();
function fn() {
	var imgStarPath = document.querySelector('#svgImg .star_Wrapper');
	console.log("Is SVG in an img tag accessibe? " + imgStarPath);

	var inlineStarPath = document.querySelector('#svgInline');
	console.log("Is inlineSVG accessible? " + inlineStarPath);
	
	var objectWrapper = document.querySelector('#svgObject');
	var svgInObject = objectWrapper.contentDocument;
	console.log("Is SVG in object accessible? " + svgInObject);

	var bgStarPath = document.querySelector('.has-StarBg .star_Wrapper');
	console.log("Is SVG in BG image accessible? " + bgStarPath);
}