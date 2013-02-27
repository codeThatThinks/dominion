/**********
 * UI Definitions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

$(document).ready(function()
{
	// debug text
	addElement(new Element("lblMouse", "label", "", new Point(25, 25), new Color(170,170,170), 1, true));
	addElement(new Element("lblIsometric", "label", "", new Point(25, 45), new Color(170,170,170), 1, true));
	addElement(new Element("lblElement", "label", "", new Point(25, 65), new Color(170,170,170), 1, true));
	addElement(new Element("lblMultiplayer", "label", "", new Point(25, 85), new Color(170,170,170), 1, false));
	
	addElement(new Element("lblCountry", "label", "", new Point(25, canvas.height() - 45), countries[0].color, 1, true, function()
	{
		getElement("lblCountry").point.set(25, canvas.height() - 45);
	}));

	// zoom buttons
	addElement(new Element("btnZoomIn", "button", "+", new Point(canvas.width() - 55, 25), new Color(0,0,0), 0.4, true, function()
	{
		getElement("btnZoomIn").point.set(canvas.width() - 55, 25);
	}, 30, 30));
	addElement(new Element("btnZoomOut", "button", "–", new Point(canvas.width() - 55, 65), new Color(0,0,0), 0.4, true, function()
	{
		getElement("btnZoomOut").point.set(canvas.width() - 55, 65);
	}, 30, 30));

	// mode buttons
	addElement(new Element("btnPan", "button", "Pan", new Point(canvas.width() - 146, canvas.height() - 55), new Color(136,136,136), 0.4, true, function()
	{
		getElement("btnPan").point.set(canvas.width() - 146, canvas.height() - 55);
	}));
	addElement(new Element("btnClaim", "button", "Claim", new Point(canvas.width() - 88, canvas.height() - 55), new Color(0,0,0), 0.4, true, function()
	{
		getElement("btnClaim").point.set(canvas.width() - 88, canvas.height() - 55);
	}));

	/**** ADD UI DEFINITIONS HERE ****/

});