/**********
 * Generation Functions
 * Author: Brian Glen <br.glen@yahoo.com>
 *********/

/**** TODO: refactor ****/

/**
 * generateTrees(gen clump)
 * generates random clumps of trees
 *     gen - number of clumps of trees
 *     clump - max number of trees in each clump
 */
var generateTrees = function(gen, clump)
{
	for(var n = 0; n <= gen; n++)
	{
		var clumpPoint = new IsometricPoint(Math.random() * 31 - 15, Math.random() * 31 - 15);
		var maxTrees = Math.floor(Math.random() * clump);
		
		for(var x = 0; x <= maxTrees; x++)
		{
			var treePoint = new IsometricPoint(clumpPoint.x + (Math.random() * 3 - 1), clumpPoint.y + (Math.random() * 3 - 1));

			new Entity("tree " + x, tree, treePoint, grid, true);
		}
	}
 }
 
 /**
 * genBuildings(num)
 * generates random buildings
 *     num - amount of buildings
 */
 var genBuildings = function(num)
 {
 	for( var n = 0; n <= num; n++)
 	{
 		new Entity("factory" + n, factory, new IsometricPoint(Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)), grid, true);
 	}
 	
 }
