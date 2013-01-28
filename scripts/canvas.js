/**********
 * Canvas Setup
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * canvas variables
 */
$(document).ready(function()
{
	window.canvas = $('canvas#game');									// canvas DOM object
	window.context = canvas.get(0).getContext('2d');					// canvas 2d context object
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

	canvas.disableTextSelect();											// call the function of the canvas object
});


/**
 * set up text drawing on canvas
 */
$(document).ready(function()
{
	context.textBaseline = 'top';										// make upper-left corner location of text
	context.font = 'light 12pt Cabin';									// set font to 12pt Cabin Light
});