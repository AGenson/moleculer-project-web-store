"use strict";

const { ServiceBroker } = require("moleculer");


const broker = new ServiceBroker({ logger: console });
broker.loadServices("./src/services");



broker.start().then(() => {
	broker.repl();

	console.log("Server started");
});
