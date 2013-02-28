/**********
 * Entity Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/* Entity array */
var entityArray = new Array();


/* Entity resources */
var building = new Image();
building.src = "./assets/entities/building.png";

var factory = new Image();
factory.src = "./assets/entities/factory.png";

var farmbuilding = new Image();
farmbuilding.src = "./assets/entities/farmbuilding.png";

var tree = new Image();
tree.src = "./assets/entities/tree.png";


/**
 * window.drawEntities()
 * draws entities in entities array
 */
var drawEntities = function()
{
	for(var n = 0; n < entityArray.length; n++)
	{
		entityArray[n].draw();
	}
}


/**
 * window.addEntity(Entity entity)
 * adds an entity to the entities array
 *     entity - entity object to be added
 */
var addEntity = function(entity)
{
	entityArray.push(entity);
}


/**
 * window.removeEntity(string name)
 * removes an entity from the entities array
 *     name - name of the entity to be removed
 */
var removeEntity = function(name)
{
	for(var n = 0; n < entityArray.length; n++)
	{
		if(entityArray[n].name = name)
		{
			entityArray.splice(n, 1);
			break;
		}
	}
}


/**
 * window.getEntity(string name)
 * returns the entity object for an entity with a given name
 *     name - name of the entity
 */
var getEntity = function(name)
{
	for(var n = 0; n < e.length; n++)
	{
		if(entityArray[n].name == name)
		{
			return entityArray[n];
		}
	}

	return false;
}