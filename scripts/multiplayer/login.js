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
var displayLogin = function(email, password)
{
	if(isDown)
	{
		$('#status').html("<h2>Server is down.</h2><span>It's probably down for maintenance or something. Please come back later.</span>");
		$('#status').show();
	}
	else
	{
		$('#status').hide();
		$('form#login').show();
	}

	$('#title-wrapper').show();

	$('#email').val(email);
	$('#password').val(password);
}


/**
 * window.displayLogin()
 * displays login window
 */
var hideLogin = function()
{
	$('#title-wrapper').hide();
}


/**
 * window.login()
 * handle user login
 */
var login = function(email, password)
{
	if(!isOnline)
	{
		setTimeout(login, 50);
	}
	else
	{
		multiplayerServer.emit('login', email, md5(password));

		multiplayerServer.on('loginEvent', function(success)
		{
			if(success)
			{
				hideLogin();
				displayUI = true;
				allowInput = true;

				/*countries.splice(0, 0, new Country(country, new Color(color.red, color.blue, color.green)));*/
			}
			else
			{
				displayLogin(email, password);
				$('input').addClass('error');
			}
		});
	}
}


/**
 * when user clicks login button
 */
$(document).ready(function()
{
	$('form#login input[type=submit]').click(function(e)
	{
		var email = $('#email').val();
		var password = $('#password').val();

		$('form#login').hide();
			
		$('#status').html("<h2>Logging in...</h2>");
		$('#status').show();

		if(!email || !password)
		{
			displayLogin(email, password);
			$('input').addClass('error');
		}
		else
		{
			if(isDown)
			{
				displayLogin(email, password);
			}
			else
			{
				login(email, password);
			}
		}

		e.preventDefault();
		return false;
	});
});