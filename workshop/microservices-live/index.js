/*
 * module-auth0
 * Copyright (c) 2017 davidroman0O (https://github.com/David Roman/module-auth0)
 * MIT Licensed
 */

"use strict";

let { ServiceBroker } = require("moleculer");


let broker = new ServiceBroker({ logger: console });

broker.loadServices("./src/services");

// Start server
broker.start().then(() => {
	// Start REPL
	broker.repl();
	// console.log("my broker", broker);
	console.log("serveur lancé");
});

