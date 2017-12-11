"use strict";

const ApiGateway = require("moleculer-web");


module.exports = {
	name: "api",
	mixins: [ ApiGateway],

	settings: {
		port: process.env.PORT || 9000,

        cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "*",
            // Configures the Access-Control-Allow-Methods CORS header.
            methods: ["GET", "PATCH", "POST"],
            // Configures the Access-Control-Allow-Headers CORS header.
            allowedHeaders: ["Content-Type"],
            // Configures the Access-Control-Expose-Headers CORS header.
            exposedHeaders: [],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
            maxAge: 3600
        },

		routes: [

			{
				path: "/status/",
				whitelist: [
					// Access to any actions in all services
					"*"
				],
				aliases: {
					// The `name` comes from named param.
					// You can access it with `ctx.params.name` in action
					// "GET hi/:name": "greeter.welcome",
					// "POST user/:auth0_id": "user.create",
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
					// Access to any actions in all services
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
