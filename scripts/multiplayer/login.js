/**********
 * Login Functions
 * Author: Peter Lunt
 *********/

/* variables */
var isLoggedIn = false;


/**
 * window.displayLogin()
 * displays login window
 */
var displayLogin = function()
{
	if(isDown)
	{
		$('#status').html("<h2>Server is down.</h2><span>It's probably down for maintenance or something. Please come back later.</span>");
	}

	$('#title-wrapper').show();
}


/**
 * handle user login click
 */
$(document).ready(function()
{
	// user clicks login button
	$('#login input[type=submit]').click(function(e)
	{
		var email = $('#login input#email').val();
		var password = $('#login input#password').val();

		$('#status').html("<h2>Logging in...</h2>");

		login();

		e.preventDefault();
		return false;
	});
});


/**
 * window.login()
 * logs in user
 */
var login = function()
{
	$('#title-wrapper').hide();

	displayUI = true;
}