"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "users",

	settings: {
 		state: {

 		}
	},

	actions: {

		/**
		@	Descr : Create a new object User
		@	Params: email, lastName, firstName
		@	Commnt: An unique id (id_user) will be created, but email must be unique too
		@	Return: User object created    /    MoleculerError
		*/
		create: {
			params: {
				email: "string",
				lastName: "string",
				firstName: "string",
			},
			handler(ctx) {
				return ctx.call("users.verify_email", { email: ctx.params.email })
					.then((exists) => {
						if (!exists){
							var user = new Models.User(ctx.params).create();
							console.log("users - create - ", user);
							if (user) {
								return this.database_add(user);
							} else {
								return new MoleculerError("users", 417, "ERR_CRITIAL", { code: 417, message: "User's informations are not valid" });
							}
						}
						else{
							return new MoleculerError("users", 409, "ERR_CRITIAL", { code: 409, message: "This user already exists" });
						}
					});
			}
		},

		/**
		@	Descr : Get the list of all existing User objects
		@	Params: none
		@	Commnt: none
		@	Return: Array of User objects
		*/
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("users").value();
					});
			}
		},

		/**
		@	Descr : Get the User object having the email given in Params
		@	Params: email
		@	Commnt: Verify first if the email exists in the list of User objects
		@	Return: User object asked    /    MoleculerError
		*/
		get: {
			params: {
				email: "string"
			},
			handler(ctx) {
				return ctx.call("users.verify_email", { email: ctx.params.email })
				.then((exists) => {
					if (exists) {
						return Database()
							.then((db) => {
								var user = db.get("users").find({ email: ctx.params.email }).value();
								return user;
							})
							.catch(() => {
								return new MoleculerError("users", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
							});
					} else {
						return new MoleculerError("users", 404, "ERR_CRITIAL", { code: 404, message: "This user does not exist" });
					}
				});
			}
		},

		/**
		@	Descr : Change the information about the given user in the corresponding User object
		@	Params: email, lastName, firstName
		@	Commnt: - Only the lastName and the firstName can be change with this function
		@			- email cannot be changed
		@	Return: email    /    MoleculerError
		*/
		edit: {
			params: {
				email: "string",
				firstName: "string",
				lastName: "string"
			},
			handler(ctx) {
				return ctx.call("users.verify_email", { email: ctx.params.email })
					.then((exists) => {
						if (exists){
							return ctx.call("users.get", { email: ctx.params.email })
									.then((db_user) => {
										//
										var user = new Models.User(db_user).create();
										user.firstName = ctx.params.firstName || db_user.firstName;
										user.lastName = ctx.params.lastName || db_user.lastName;
										//
										return this.database_edit(ctx.params.email, user);
									})
						}
						else{
							return new MoleculerError("users", 404, "ERR_CRITIAL", { code: 404, message: "This user does not exist" });
						}
					});
			}
		},

		/**
		@	Descr : Verify if the email given in Params correspond to an existing User object
		@	Params: email
		@	Commnt: none
		@	Return: true    /    false
		*/
		verify_email: {
			params: {
				email: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("users")
										.filter({ email: ctx.params.email })
										.value();
						return value.length > 0 ? true : false;
					})
			}
		},

		/**
		@	Descr : Verify if the id_user given in Params correspond to an existing User object
		@	Params: id_user
		@	Commnt: none
		@	Return: true    /    false
		*/
		verify_id_user: {
			params: {
				id_user: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("users")
										.filter({ id_user: ctx.params.id_user })
										.value();
						return value.length > 0 ? true : false;
					})
			}
		}
	},

	methods: {

		/**
		@	Descr : Will add a User object to the database
		@	Params: user (User object)
		@	Commnt: The new User object must be given in Params
		@	Return: User object    /    MoleculerError
		*/
		database_add(user) {
			return Database()
				.then((db) => {
					return db.get("users")
						.push(user)
						.write()
						.then(() => {
							return user;
						})
						.catch(() => {
							return new MoleculerError("users", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		},

		/**
		@	Descr : Will edit an existing User object in the database (or more exactly : save the changes of the User object)
		@	Params: email, user (User object)
		@	Commnt: The new User object must be given in Params, and will replace the one in the database with the same email
		@	Return: User object    /    MoleculerError
		*/
		database_edit(email, user) {
			return Database()
				.then((db) => {
					return db.get("users")
						.find({ email: email })
						.assign(user)
						.write()
						.then(() => {
							return email;
						})
						.catch(() => {
							return new MoleculerError("products", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" });
						});
				});
		}
	}
};
