/* Keyboard Input Functions 

Some code borrowed from: mouse.js written by Ian Glen <codeThatThinks@gmail.com>
I should get better at comments.
*/

	$(document).keyup(function(e) {
		
		if(e.keyCode == 88 && !isPanning) //When X key is pressed enable panning mode.
		{
						isClaiming = false;
						getElement('btnClaim').color = new Color(0,0,0);

						isPanning = true;
						getElement('btnPan').color = new Color(136,136,136);
		}
		
		if(e.keyCode == 67 && !isClaiming) //When C key is pressed enable claiming mode.
		{
						isPanning = false;
						getElement('btnPan').color = new Color(0,0,0);

						isClaiming = true;
						getElement('btnClaim').color = new Color(136,136,136);
		}
		
		if(e.keyCode == 49)
		{
					if((gridSpacing - 10) >= 20 && (gridSpacing - 10) <= 150)
					{
						gridSpacing -= 10;
					}
		}
		
		if(e.keyCode == 50)
		{
					if((gridSpacing + 10) >= 20 && (gridSpacing + 10) <= 150)
					{
						gridSpacing += 10;
					}		
		}
		
	});	
	
	//none
