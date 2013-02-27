/**********
 * Tree Generation Function
 * Author: Brian Glen <br.glen@yahoo.com>
 *********/


/**
 * generateTrees(gen clump)
 * generates random clumping trees
 *     gen - how many clumps of trees you want generated
 *     clump - how many trees you want in each clump
 */
var generateTrees = function(gen, clump)
{
	var rTreeX;
	var rTreeY;
	var rTreeX2;
	var rTreeY2;

	for(var i = 0; i <= gen; i++)
	{
		rTreeX = Math.random() * (8.5 - -11 + 1) + -11;
		rTreeY = Math.random() * (8.5 - -11 + 1) + -11;

		addEntity(new Entity("tree " + i, tree, new Point(rTreeX,rTreeY), true)); // add each individual tree 		

 		for(var a = 0; a <= clump; a++)
 		{
 			rTreeX2 = 0;
 			rTreeX2 = Math.random() * (.5 - -.5 + 1) + -.5;
			rTreeX2 = rTreeX2 + rTreeX;

			rTreeY2 = 0;
 			rTreeY2 = Math.random() * (.5 - -.5 + 1) + -.5;
			rTreeY2 = rTreeY2 + rTreeY;

			addEntity(new Entity("tree " + a + 500, tree, new Point(rTreeX2,rTreeY2), true)); // add each individual tree
		}

	}

 }