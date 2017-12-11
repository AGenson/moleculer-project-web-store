"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "orders",

	settings: {
 		state: {

 		}
	},

	actions: {

		/**
		@	Descr : Create a new object Order
		@	Params: id_user
		@	Commnt: An unique id (id_order) will be created, the array cart will be empty, and order_completed will be initialized at false
		@	Return: Order object created    /    MoleculerError
		*/
		create: {
			params: {
				id_user: "string"
			},
			handler(ctx) {
				return ctx.call("users.verify_id_user", { id_user: ctx.params.id_user })
					.then((exists) => {
						if (exists){
							var order = new Models.Order(ctx.params).create();
							console.log("orders - create - ", order);
							if (order) {
								return this.database_add(order);
							} else {
								return new MoleculerError("orders", 417, "ERR_CRITIAL", { code: 417, message: "Order's informations are not valid" });
							}
						}
						else{
							return new MoleculerError("orders", 404, "ERR_CRITIAL", { code: 404, message: "User does not exist" });
						}
					});
			}
		},

		/**
		@	Descr : Get the list of all existing Order objects
		@	Params: none
		@	Commnt: none
		@	Return: Array of Order objects
		*/
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("orders").value();
					});
			}
		},

		/**
		@	Descr : Get the Order object having the id_order given in Params
		@	Params: id_order
		@	Commnt: Verify first if id_order exists in the list of Order objects
		@	Return: Order object asked    /    MoleculerError
		*/
		get_orderBy_id_order: {
			params: {
				id_order: "string"
			},
			handler(ctx) {
				return ctx.call("orders.verify", { id_order: ctx.params.id_order })
					.then((exists) => {
						if (exists) {
							return Database()
								.then((db) => {
									var order = db.get("orders").find({ id_order: ctx.params.id_order }).value();
									return order;
								})
								.catch(() => {
									return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } );
								});
						}
						else {
							return new MoleculerError("orders", 404, "ERR_CRITIAL", { code: 404, message: "This order does not exist" } );
						}
					});
			}
		},

		/**
		@	Descr : Get the Order object having the id_order and id_product given in Params
		@	Params: id_order, id_product, has_id_product
		@	Commnt: Verify first if id_order exists in the list of Order objects, if id_product exists in the list of Product objects, and that the Order object contains(or not) id_product
		@	Return: Order object asked    /    MoleculerError
		*/
		//	Error Tests :
		//		call "orders.get_orderBy__id_order_id_product" --id_order "dfshqedgqg" --id_product "sdfsdgqdgqdgq"
		//  	call "orders.get_orderBy__id_order_id_product" --id_order "fb4ba685-4a3c-48da-a5ed-dbd81f0e303b" --id_product "sefsdgsegf" --has_id_product true
		//  	call "orders.get_orderBy__id_order_id_product" --id_order "fb4ba685-4a3c-48da-a5ed-dbd81f0e303b" --id_product "dc8d4e7d-5f1c-4acf-9565-2040d7b98ef3" --has_id_product "true"
		//  	call "orders.get_orderBy__id_order_id_product" --id_order "fb4ba685-4a3c-48da-a5ed-dbd81f0e303b" --id_product "966b15d1-169b-4164-8e82-79c4c9541250"(not in Order) --has_id_product true
		//	Good Test :
		//  	call "orders.get_orderBy__id_order_id_product" --id_order "fb4ba685-4a3c-48da-a5ed-dbd81f0e303b" --id_product "dc8d4e7d-5f1c-4acf-9565-2040d7b98ef3" --has_id_product true
		get_orderBy__id_order_id_product: {
			params: {
				id_order: "string",
				id_product: "string",
				has_id_product: "boolean"
			},
			handler(ctx) {
				return ctx.call("orders.verify", { id_order: ctx.params.id_order })
					.then((id_order_exists) => {
						if (id_order_exists) {
							return ctx.call("products.verify", { id_product: ctx.params.id_product })
								.then((id_product_exists) => {
									if (id_product_exists){
										return ctx.call("orders.get_orderBy_id_order", { id_order: ctx.params.id_order })
											.then((db_order) => {
												var already_exists = false;
												db_order.cart.forEach((elt) => {
													if (elt.id_product === ctx.params.id_product){
														already_exists = true;
													}
												});
												if (already_exists === ctx.params.has_id_product){
													return {error: false, obj: db_order};
												}
												else{
													return ctx.params.has_id_product ? {error: true, obj: (new MoleculerError("orders", 417, "ERR_CRITIAL", { code: 417, message: "This product is not in this order" }))} : {error: true, obj: (new MoleculerError("products", 417, "ERR_CRITIAL", { code: 417, message: "This product already is in this order" }))};
												}
											});
									}
									else{
										return {error: true, obj: new MoleculerError("products", 404, "ERR_CRITIAL", { code: 404, message: "This product does not exist" })};
									}
								});
						}
						else{
							return {error: true, obj: new MoleculerError("orders", 404, "ERR_CRITIAL", { code: 404, message: "This order does not exist" })};
						}
					});
			}
		},

		/**
		@	Descr : Get the list of every Order corresponding to a given User
		@	Params: id_user
		@	Commnt: Verify if id_user exists in the list of User objects
		@	Return: Array of id_order    /    MoleculerError
		*/
		get_list: {
			params: {
				id_user: "string"
			},
			handler(ctx) {
				return ctx.call("users.verify_id_user", { id_user: ctx.params.id_user })
				.then((exists) => {
					if (exists) {
						return Database()
							.then((db) => {
								var user_orders = db.get('orders').filter( { id_user: ctx.params.id_user } ).map('id_order').value();;
								return user_orders;
							})
							.catch(() => {
								return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } );
							});
					} else {
						return new MoleculerError("orders", 404, "ERR_CRITIAL", { code: 404, message: "user does not exist" } );
					}
				});
			}
		},

		/**
		@	Descr : Add a Product in the cart of a given Order
		@	Params: id_order, id_product
		@	Commnt: - Verify first the existence of id_order and id_product, and that id_product is not already in the cart of the Order object
		@			- The cart will contain the id_product and a quantity (initialized at 1)
		@			- Will return an Error if the stock of the Product is empty
		@	Return: Order object    /    MoleculerError
		*/
		add_product: {
			params: {
				id_order: "string",
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("orders.get_orderBy__id_order_id_product", { id_order: ctx.params.id_order, id_product: ctx.params.id_product, has_id_product: false })
					.then((value) => {
						if (value.error === false){
							if (value.obj.order_completed === false){
								return Database()
									.then((db) => {
										var product = db.get("products").find({ id_product: ctx.params.id_product }).value();
										if ( product.quantity > 0){
											//
											var order = new Models.Order(value.obj).create();
											order.cart.push({id_product: ctx.params.id_product, quantity: 1});
											//
											return ctx.call("products.decrement", { id_product: ctx.params.id_product })
												.then(() => {
													return this.edit_database(ctx.params.id_order, order);
												});
										}
										else{
											return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "The stock of this product is empty" });
										}
									});
							}
							else{
								return new MoleculerError("orders", 417, "ERR_CRITIAL", { code: 417, message: "This order is validated, it cannot be changed" });
							}
						}
						else{
							return value.obj;
						}
					});
			}
		},

		/**
		@	Descr : Increment the quantity of a given Product in the cart of a given Order
		@	Params: id_order, id_product
		@	Commnt: - Verify first the existence of id_order and id_product, and that id_product is in the cart of the Order object
		@			- Will return an Error if the stock of the Product is empty
		@	Return: Order object    /    MoleculerError
		*/
		increment: {
			params: {
				id_order: "string",
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("orders.get_orderBy__id_order_id_product", { id_order: ctx.params.id_order, id_product: ctx.params.id_product, has_id_product: true })
					.then((value) => {
						if (value.error === false){
							if (value.obj.order_completed === false){
								return Database()
									.then((db) => {
										var product = db.get("products").find({ id_product: ctx.params.id_product }).value();
										if ( product.quantity > 0){
											//
											var order = new Models.Order(value.obj).create();
											order.cart.forEach((elt, i, arr) => {
												if (elt.id_product === ctx.params.id_product){
													arr[i].quantity += 1;
												}
											});		
											//
											return ctx.call("products.decrement", { id_product: ctx.params.id_product })
												.then((val) => {
													console.log(val);
													return this.edit_database(ctx.params.id_order, order);
												});
										}
										else{
											return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "The stock if this product is empty" });
										}
									});
							}
							else{
								return new MoleculerError("orders", 417, "ERR_CRITIAL", { code: 417, message: "This order is validated, it cannot be changed" });
							}
						}
						else{
							return value.obj;
						}	
					});
			}
		},

		/**
		@	Descr : Decrement the quantity of a given Product in the cart of a given Order
		@	Params: id_order, id_product
		@	Commnt: - Verify first the existence of id_order and id_product, and that id_product is in the cart of the Order object
		@			- Will remove the product from Order's cart if the quantity reaches 0
		@	Return: Order object    /    MoleculerError
		*/
		decrement: {
			params: {
				id_order: "string",
				id_product: "string"
			},
			handler(ctx) {
				return ctx.call("orders.get_orderBy__id_order_id_product", { id_order: ctx.params.id_order, id_product: ctx.params.id_product, has_id_product: true })
					.then((value) => {
						if (value.error === false){
							if (value.obj.order_completed === false){
								//
								var order = new Models.Order(value.obj).create();
								order.cart.forEach((elt, i, arr) => {
									if (elt.id_product === ctx.params.id_product){
										if (elt.quantity === 1){
											arr.splice(i,1);
										}
										else{
											arr[i].quantity -= 1;
										}
									}
								});
								//
								return ctx.call("products.increment", { id_product: ctx.params.id_product })
									.then((val) => {
										console.log(val);
										return this.edit_database(ctx.params.id_order, order);
									});
							}
							else{
								return new MoleculerError("orders", 417, "ERR_CRITIAL", { code: 417, message: "This order is validated, it cannot be changed" });
							}
						}
						else{
							return value.obj;
						}	
					});
			}
		},

		/**
		@	Descr : Validate the given Order
		@	Params: id_order
		@	Commnt: After that, the Order object cannot be change
		@	Return: Order object    /    MoleculerError
		*/
		validate: {
			params: {
				id_order: "string"
			},
			handler(ctx) {
				return ctx.call("orders.get_orderBy_id_order", { id_order: ctx.params.id_order })
					.then((db_order) => {
						//
						var order = new Models.Order(db_order).create();
						order.order_completed = ctx.params.order_completed || true;
						//
						return this.edit_database(ctx.params.id_order, order);
					});
			}
		},

		/**
		@	Descr : Verify if the id_order given in Params correspond to an existing Order object
		@	Params: id_order
		@	Commnt: none
		@	Return: true    /    false
		*/
		verify: {
			params: {
				id_order: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("orders")
										.filter({ id_order: ctx.params.id_order })
										.value();
						return value.length > 0 ? true : false;
					});
			}
		}

	},

	methods: {

		/**
		@	Descr : Will add a Order object to the database
		@	Params: order (Order object)
		@	Commnt: The new Order object must be given in Params
		@	Return: Order object    /    MoleculerError
		*/
		database_add(order) {
			return Database()
				.then((db) => {
					return db.get("orders")
						.push(order)
						.write()
						.then(() => {
							return order;
						})
						.catch(() => {
							return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		},

		/**
		@	Descr : Will edit an existing Order object in the database (or more exactly : save the changes of the Order object)
		@	Params: id_order, order (Order object)
		@	Commnt: The new Order object must be given in Params, and will replace the one in the database with the same id_order
		@	Return: Order object    /    MoleculerError
		*/
		edit_database(id_order , order) {
			return Database()
				.then((db) => {
					return db.get("orders")
						.find({ id_order: id_order })
						.assign(order)
						.write()
						.then(() => {
							return order;
						})
						.catch(() => {
							return new MoleculerError("orders", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		}
	}
};
