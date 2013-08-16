/**********
 * Canvas Setup
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * canvas variables
 */
$(document).ready(function()
{
	canvas = new Canvas($('canvas#game'), $('canvas#game').get(0).getContext('2d'));
});


/**
 * resize canvas to fullscreen
 */
$(document).ready(function()
{
	canvas.element.width(window.innerWidth);
	canvas.element.height(window.innerHeight);

	canvas.context.canvas.width = window.innerWidth;
	canvas.context.canvas.height = window.innerHeight;

	$(window).resize(function()
	{
		canvas.element.width(window.innerWidth);
		canvas.element.height(window.innerHeight);
		
		canvas.context.canvas.width = window.innerWidth;
		canvas.context.canvas.height = window.innerHeight;

		canvas.context.textBaseline = 'top';
		canvas.context.font = '13pt Cabin';
	});
});


/**
 * disable text select when double-clicking canvas
 */
$(document).ready(function()
{
	$.extend($.fn.disableTextSelect = function()
	{
	    return this.each(function()										// disable text select based on browser
	    {
	        if($.browser.mozilla)
	        {
	        	//Firefox
	            $(this).css('MozUserSelect','none');
	        }
	        else if($.browser.msie)
	        {
	        	//IE
	            $(this).bind('selectstart',function(){return false;});
	        }
	        else
	        {
	        	//Opera, etc.
	            $(this).mousedown(function(){return false;});
	        }
	    });
	});

	canvas.element.disableTextSelect();											// call the function of the canvas object
});


/**
 * set up text drawing on canvas
 */
$(document).ready(function()
{
	canvas.context.textBaseline = 'top';										// make upper-left corner location of text
	canvas.context.font = '13pt Cabin';										// set font to 13pt Cabin Light
});