const uuidv4 = require('uuid/v4');



var fields_reducers = {
	"title": (value) => value.length > 0,
	"description": (value) => value.length > 0,
	"price": (value) => value > 0
};

var ProductModel = function(params) {
	this.id_product = params.id_product || uuidv4();
	this.title = params.title || "";
	this.description = params.description || "";
	this.price = params.price || 0;
	this.quantity = params.quantity || 0;
}



ProductModel.prototype.create = function() {

	var valid = true;

	var keys = Object.keys(fields_reducers);

	for (var i = 0; i < keys.length; i++)
	{
		if ( typeof this[keys[i]] != typeof undefined ) {
			if ( !fields_reducers[keys[i]](this[keys[i]]) )
			{
				valid = false;
			}
		}
		else
		{
			valid = false;
		}
	}

	if (valid) {
		return this;
	} else {
		return undefined;
	}
}



module.exports = ProductModel;
