/**********
 * Dialog Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

function Dialog(name, content, headline)
{
	function show()
	{
		console.log(this.headline);
		console.log(headline);
		//var html = '<div id="title-wrapper ' + this.name + '"><div id="title">' + this.content + '</div></div>';
		//This code is messy and could probably do with refactoring.
		var html = '<div id="' + this.name + '"><div id="title"><h2>' + headline + '</h2><p>' + this.content + '</p><div><input type="submit" class="okay-btn" value="Okay" onclick="hide()" /></div></div></div>';
		$('body').prepend(html);
	}


	function hide()
	{
		$('#' + this.name).remove();
	}

	function updateContent(newContent)
	{
		this.content = newContent;

		$('#' + this.name + " #title").html(this.content);
	}

	this.name = name;
	this.content = content;

	this.show = show;
	this.hide = hide;
}