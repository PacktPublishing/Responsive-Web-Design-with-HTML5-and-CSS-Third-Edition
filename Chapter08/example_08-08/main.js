;(function () {
	'use strict';
	
	// VARS:
	var cicrle = document.querySelector(".circle");
	var circlePath = document.querySelector(".circle path");
	var pathLength = circlePath.getTotalLength();
	var pathLengthPx = pathLength  + "px";
	var animateButton = document.querySelector(".animate");
	var text = document.querySelector(".circle text");
	var rangeField = document.querySelector(".range");
	
	// Set colours
	var strokeStartColour = "#333333";
	var strokeEndColour = "#ff9900";
	
	// MAIN:
	var radial = {
		initialisePath: function() {
			// This function resets the radial ready to animate
			
			//  First set the stroke dashoffset to be the length of the path length
			// Note: remove the negative string to reverse the direction of the animation
			circlePath.style.strokeDashoffset = "-" + pathLength;
			// Set the stroke dash array
			circlePath.style.strokeDasharray = pathLength  + ' ' + pathLength;

			// Reset the stroke colour
			circlePath.style.stroke = strokeStartColour;
		},

		animateClick: function() {	
			// This function listens for changes to the input field and
			// sets the value attribute to that value
			
			// Update the value of the field when values change
			var inputField = document.querySelector(".enterValue");
			
			inputField.addEventListener("input", function(){
				this.setAttribute("value", this.value);
			}, false);
			
			// Pass values from the input field on button press
			animateButton.addEventListener('click', function() {
				var input = document.querySelector(".enterValue").value;
				var lineLengthFromInput = pathLength - (pathLength / 100 * input);
				radial.animateSVG(lineLengthFromInput, input);
			}, false);
		},

		// Actually do the animation
		animateSVG: function(amount, inputValue) {
			// This function first resets the animation
			radial.initialisePath();
			// Then it tweens the path stoke dashoffset amount
			TweenLite.to(circlePath, 1.5, {'stroke-dashoffset': "-"+amount, stroke: strokeEndColour});
			// While simultaneously tweening the percentage value in Text from the counter value to the
			// value of the input (that the user sets with the slider)
			var counter = { var: 0 };
			TweenLite.to(counter, 1.5, {
				var: inputValue,
				onUpdate: function () {
					text.textContent = Math.ceil(counter.var) + "%";
				},
				ease:Circ.easeOut
			});
		},

		changeWidth: function() {
			// This function changes the stroke width of the radial by listening to
			// input changes and applying those values to the circle stroke width

			// Update the value of the field when values change
			rangeField.addEventListener("input", function(){
				// this.setAttribute("value", this.value);
				circlePath.style.strokeWidth = this.value + "px";
			}, false);
		}
	};
	// Kick everything off
	radial.changeWidth();
	radial.initialisePath();
	radial.animateClick();
})();