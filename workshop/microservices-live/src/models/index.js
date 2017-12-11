const ProductModel = require("./ProductModel");
const OrderModel = require("./OrderModel");
const UserModel = require("./UserModel");

module.exports = {
	User: UserModel,
	Product: ProductModel,
	Order: OrderModel
};
