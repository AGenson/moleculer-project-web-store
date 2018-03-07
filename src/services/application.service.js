"use strict";

const Configuration = require("../fixtures/Configuration");
const Database = require("../adapters/Database");

var fs = require('fs');
var filePath = './db.json';



module.exports = {
	name: "application",

	settings: {

	},

	actions: {

		configuration: {
			handler(ctx) {
				return Configuration;
			}
		},

		health: {
			handler(ctx) {
				return ctx.call("$node.health");
			}
		},

		database: {
			handler(ctx) {
				return Database()
						.then((db) => {
							return db.__wrapped__;
						})
			}
		},

		reset: {
			handler(ctx) {
				fs.unlinkSync(filePath);
				return "done";
			}
		}
	},

    methods: {

    }
};
