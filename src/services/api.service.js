"use strict";

const ApiGateway = require("moleculer-web");



module.exports = {
	name: "api",

	mixins: [ ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

        cors: {
            origin: "*",
            methods: ["GET", "PATCH", "POST"],
            allowedHeaders: ["Content-Type"],
            exposedHeaders: [],
            credentials: false,
            maxAge: 3600
        },

		routes: [

			{
				path: "/status/",
				whitelist: [
					"*"
				],
				aliases: {
					"GET server": "application.configuration",
					"GET health": "application.health",
					"GET database": "application.database",
					"GET reset": "application.reset"
				}
			},
			{
				bodyParsers: {
	                json: true,
	            },
				path: "/api/v1/",
				whitelist: [
					"*"
				],
				aliases: {
					//	USERS
					"POST user": "users.create",
					"GET users": "users.getAll",
					"GET user/:email": "users.get",
					"GET user/:email/verify": "users.verify_email",
					"PATCH user/:email": "users.edit",

					//	PRODUCTS
					"POST product": "products.create",
					"GET products": "products.getAll",
					"GET product/:id_product": "products.get",
					"GET product/:id_product/verify": "products.verify",
					"PATCH product/:id_product": "products.edit",
					"PATCH product/:id_product/quantity_op/:quantity": "products.change_quantity",
					"PATCH product/:id_product/increment": "products.increment",
					"PATCH product/:id_product/decrement": "products.decrement",

					//	ORDERS
					"POST order/user/:id_user": "orders.create",
					"GET orders": "orders.getAll",
					"GET order/:id_order": "orders.get_orderBy_id_order",
					"GET order/user/:id_user": "orders.get_list",
					"GET order/:id_order/verify": "orders.verify",
					"PATCH order/:id_order/product/:id_product": "orders/add_product",
					"PATCH order/:id_order/product/:id_product/increment": "orders.increment",
					"PATCH order/:id_order/product/:id_product/decrement": "orders.decrement",
					"PATCH order/:id_order": "orders.validate"
				}
			}

		]

	}
};
