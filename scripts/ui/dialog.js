/**********
 * Dialog Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

function Dialog(name, content)
{
	function show()
	{
		var html = '<div id="title-wrapper ' + this.name + '"><div id="title">' + this.content + '</div></div>';
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