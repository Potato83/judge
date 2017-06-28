import $ from 'jquery';

$(document).ready(function() {
 
	var $bg = $('.o-banner__bg');
	var backgroundImage = window.getComputedStyle($bg[0], null).backgroundImage;
	var image = backgroundImage.match(/url\((.*?)\)/)[1];
			image = image.replace(/"/g, "");
			var sprite = new Image();
			sprite.src = image;
   			sprite.onload = function() {
   				$bg.addClass('dumbo');
				}				
});