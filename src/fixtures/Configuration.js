var EnvironmentType = require("./EnvironmentType.configuration");



function getEnv() {
	console.log("process.env.NODE_ENV", process.env.NODE_ENV || "development");

	return EnvironmentType[process.env.NODE_ENV || "development"]
}



module.exports = {
	environment: getEnv(),
};
