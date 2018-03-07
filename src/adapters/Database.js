const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync('db.json')

const DB_CONF = require("../fixtures/Database.configuration");



module.exports = () => {
	return low(adapter)
		.then((db) => {
			return db.defaults(DB_CONF)
			.write()
			.then(() => {
				return db;
			});
		});
};
