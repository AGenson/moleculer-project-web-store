"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;



module.exports = {
	name: "products",

	settings: {
 		state: {

 		}
	},

	actions: {

		/**
		@	Descr : Create a new object Product
		@	Params: title, description, price
		@	Commnt: An unique id (id_product) will be created, and quantity will be initialized at 0
		@	Return: Product object created    /    MoleculerError
		**/
		create: {
			params: {
				title: "string",
				description: "string",
				price: "number"
			},
			handler(ctx) {
				var product = new Models.Product(ctx.params).create();
				console.log("Products - create - ", product);
				if (product) {
					return this.database_add(product);
				} else {
					return new MoleculerError("products", 417, "ERR_CRITIAL", { code: 417, message: "Product's informations are not valid" } );
				}
			}
		},

		/**
		@	Descr : Get the list of all existing Product objects
		@	Params: none
		@	Commnt: none
		@	Return: Array of Product objects
		**/
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("products").value();;
					});
			}
		},

		/**
		@	Descr : Get the Product object having the id given in Params
		@	Params: id_product
		@	Commnt: Verify first if id_product exists in the list of Product objects
		@	Return: Product object asked    /    MoleculerError
		**/
		get: {
			params: {
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("products.verify", { id_product: ctx.params.id_product })
					.then((exists) => {
						if (exists) {
							return Database()
								.then((db) => {
									var product = db.get("products").find({ id_product: ctx.params.id_product }).value();;
									return product;
								})
								.catch(() => {
									return new MoleculerError("products", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } );
								});
						} else {
							return new MoleculerError("products", 404, "ERR_CRITIAL", { code: 404, message: "This product does not exist" } );
						}
					});
			}
		},

		/**
		@	Descr : Change the information about the given product in the corresponding Product object
		@	Params: id_product, title, description, price
		@	Commnt: - Only the title, the description and the price can be change with this function
		@			- Use 'change_quantity' to change the quantity
		@			- id_product cannot be changed
		@	Return: id_product (string)    /    MoleculerError
		**/
		edit: {
			params: {
				id_product: "string",
				title: "string",
				description: "string",
				price: "number"
			},
			handler(ctx) {
				return ctx.call("products.verify", { id_product: ctx.params.id_product })
					.then((exists) => {
						if (exists) {
							return ctx.call("products.get", { id_product: ctx.params.id_product })
									.then((db_product) => {
										//
										var product = new Models.Product(db_product).create();
										product.title = ctx.params.title || db_product.title;
										product.description = ctx.params.description || db_product.description;
										product.price = ctx.params.price || db_product.price;
										//
										return this.edit_database(ctx.params.id_product, product, false);
									});
						}
						else{
							return new MoleculerError("products", 404, "ERR_CRITIAL", { code: 404, message: "This product does not exist" } );
						}
					});
			}
		},

		/**
		@	Descr : Change the quantity field of a Product object with the id_product equal to the given id_product in the Params
		@	Params: id_product, quantity
		@	Commnt: - The quantity can be positive or negative depending on the operation
		@			- if quantity is negative, the function will check that it will not make the stock negative
		@	Return: id_product (string)    /    MoleculerError
		**/
		change_quantity: {
			params: {
				id_product: "string",
				quantity: "string"
			},
			handler(ctx) {
				return ctx.call("products.verify", { id_product: ctx.params.id_product })
					.then((exists) => {
						if (exists) {
							return ctx.call("products.get", { id_product: ctx.params.id_product })
									.then((db_product) => {
										var qty = parseInt(ctx.params.quantity);
										if (isNaN(qty) === false){
											if ((db_product.quantity + qty) >= 0){
												//
												var product = new Models.Product(db_product).create();
												product.quantity = (db_product.quantity + qty);
												//
												return this.edit_database(ctx.params.id_product, product, true);
											}
											else{
												return new MoleculerError("products", 417, "ERR_CRITIAL", { code: 417, message: "Quantity to remove is higher than product's quantity" });
											}
										}
										else{
											return new MoleculerError("products", 417, "ERR_CRITIAL", { code: 417, message: "Quantity must be a signed number" });
										}
									});
						}
						else{
							return new MoleculerError("products", 404, "ERR_CRITIAL", { code: 404, message: "This product does not exist" });
						}
					});
			}
		},

		/**
		@	Descr : Increment the quantity field of Product object with a given id_product
		@	Params: id_product
		@	Commnt: none
		@	Return: id_product (string)    /    MoleculerError
		**/
		increment: {
			params: {
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("products.change_quantity", { id_product: ctx.params.id_product, quantity: "1" });
			}
		},

		/**
		@	Descr : Decrement the quantity field of Product object with a given id_product
		@	Params: id_product
		@	Commnt: Will return an error if the quantity already is at 0
		@	Return: id_product (string)    /    MoleculerError
		**/
		decrement: {
			params: {
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("products.change_quantity", { id_product: ctx.params.id_product, quantity: "-1" });
			}
		},

		/**
		@	Descr : Verify if the id_product given in Params correspond to an existing Product object
		@	Params: id_product
		@	Commnt: none
		@	Return: true    /    false
		**/
		verify: {
			params: {
				id_product: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("products")
										.filter({ id_product: ctx.params.id_product })
										.value();
						return value.length > 0 ? true : false;
					});
			}
		}
	},

	methods: {

		/**
		@	Descr : Will add a Product object to the database
		@	Params: product (Product object)
		@	Commnt: The new Product object must be given in Params
		@	Return: Product object    /    MoleculerError
		*/
		database_add(product) {
			return Database()
				.then((db) => {
					return db.get("products")
						.push(product)
						.write()
						.then(() => {
							return product;
						})
						.catch(() => {
							return new MoleculerError("products", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		},

		/**
		@	Descr : Will edit an existing Product object in the database (or more exactly : save the changes of the Product object)
		@	Params: id_product, product (Product object)
		@	Commnt: The new Product object must be given in Params, and will replace the one in the database with the same id_product
		@	Return: id_product    /    {id_product, quantity}    /    MoleculerError
		**/
		edit_database(id_product, product, qty_return) {
			return Database()
				.then((db) => {
					return db.get("products")
						.find({ id_product: id_product })
						.assign(product)
						.write()
						.then(() => {
							return qty_return ? { id_product: product.id_product, quantity: product.quantity } : product.id_product;
						})
						.catch(() => {
							return new MoleculerError("products", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		}
	}
};
