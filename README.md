![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-project-web-store

First time using [moleculer](https://github.com/moleculerjs/moleculer), especially [moleculer-web](https://github.com/moleculerjs/moleculer-web).

Here's a Rest-API simulating a web store.

# Features

- Rest-API
- HTTP requests
- Users management (Create & Modify)
- Products management (Create & Modify & Stock-management)
- Orders management (Create & Add-product & Quantity-product & Validate)

# HTTP Requests

The following HTTP requests are based on the **localhost** IP Adresse, like it would be if you test this project in local:

***http://localhost:3000***

## Application

### GET /status/server

Return the configuration of the server

### GET /status/health

Return the node health

### GET /status/database

Return the whole database instance

### GET /status/reset

Reset the application (empty the database)

---

## Users

### POST /api/v1/user

Create a new user

| Parameter   | Type     | Description                       |
| :---------: | :------: | --------------------------------- |
| `email`     | `String` | The email address of the new user |
| `firstname` | `String` | The firstname of the new user     |
| `lastname`  | `String` | The lastname of the new user      |

### GET /api/v1/users

Get all users that exist

| Parameter   | Type     | Description |
| :---------: | :------: | ----------- |
| -           | -        | -           |

### GET /api/v1/user/[:email](https://github.com/AGenson/moleculer-project-web-store#get-apiv1useremail)

Get a specific user from his email address

| Parameter   | Type     | Description                   |
| :---------: | :------: | ----------------------------- |
| `email`     | `String` | The email address of the user |

### GET /api/v1/user/[:email](https://github.com/AGenson/moleculer-project-web-store#get-apiv1useremailverify)/verify

Verify if a user exists from his email address

| Parameter   | Type     | Description                   |
| :---------: | :------: | ----------------------------- |
| `email`     | `String` | The email address of the user |

### PATCH /api/v1/user/[:email](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1useremail)

Update a user information from his email address

| Parameter   | Type     | Description                   |
| :---------: | :------: | ----------------------------- |
| `email`     | `String` | The email address of the user |
| `firstname` | `String` | The firstname of the user     |
| `lastname`  | `String` | The lastname of the user      |

---

## Products

### POST /api/v1/product

Create a new product

| Parameter     | Type     | Description                        |
| :-----------: | :------: | ---------------------------------- |
| `title`       | `String` | The name of the new product        |
| `description` | `String` | The description of the new product |
| `price`       | `Number` | The price of the new product       |

### GET /api/v1/products

Get all products that exist

| Parameter   | Type     | Description |
| :---------: | :------: | ----------- |
| -           | -        | -           |

### GET /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#get-apiv1productid_product)

Get a specific product from its id

| Parameter    | Type     | Description           |
| :----------: | :------: | --------------------- |
| `product_id` | `String` | The id of the product |

### GET /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#get-apiv1productid_productverify)/verify

Verify that a product exists from its id

| Parameter    | Type     | Description             |
| :----------: | :------: | ----------------------- |
| `product_id` | `String` | The id of the product |

### PATCH /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1productid_product)

Update a product information from its id

| Parameter     | Type     | Description                    |
| :-----------: | :------: | ------------------------------ |
| `product_id`  | `String` | The id of the product          |
| `title`       | `String` | The name of the product        |
| `description` | `String` | The description of the product |
| `price`       | `Number` | The price of the product       |

### PATCH /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1productid_productquantity_opquantity)/quantity_op/[:quantity](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1productid_productquantity_opquantity)

Add or remove quantity of a product from its id

| Parameter    | Type     | Description                                                          |
| :----------: | :------: | -------------------------------------------------------------------- |
| `product_id` | `String` | The id of the product                                                |
| `quantity`   | `String` | The quantity you want to add (positive nbr) or remove (negative nbr) |

### PATCH /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1productid_productincrement)/increment

Increment a product's quantity from its id

| Parameter    | Type     | Description                                                          |
| :----------: | :------: | -------------------------------------------------------------------- |
| `product_id` | `String` | The id of the product                                                |

### PATCH /api/v1/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1productid_productdecrement)/decrement

Decrement a product's quantity from its id

| Parameter    | Type     | Description                                                          |
| :----------: | :------: | -------------------------------------------------------------------- |
| `product_id` | `String` | The id of the product                                                |

---

## Orders

### POST /api/v1/order

Create a new order

| Parameter | Type     | Description                           |
| :-------: | :------: | ------------------------------------- |
| `id_user` | `String` | The id of a user linked to this order |

### GET /api/v1/orders

Get all orders that exist

| Parameter   | Type     | Description |
| :---------: | :------: | ----------- |
| -           | -        | -           |

### GET /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#get-apiv1orderid_order)

Get a specific order from its id

| Parameter  | Type     | Description         |
| :--------: | :------: | ------------------- |
| `id_order` | `String` | The id of the order |

### GET /api/v1/order/user/[:id_user](https://github.com/AGenson/moleculer-project-web-store#get-apiv1orderuserid_user)

Get all orders linked to a specific user from his id

| Parameter | Type     | Description        |
| :-------: | :------: | ------------------ |
| `id_user` | `String` | The id of the user |

### GET /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#get-apiv1orderid_orderverify)/verify

Verify that an order exists from its id

| Parameter  | Type     | Description         |
| :--------: | :------: | ------------------- |
| `id_order` | `String` | The id of the order |

### PATCH /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_product)/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_product)

Add a product to an order

| Parameter    | Type     | Description           |
| :----------: | :------: | --------------------- |
| `id_order`   | `String` | The id of the order   |
| `id_product` | `String` | The id of the product |

### PATCH /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_productincrement)/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_productincrement)/increment

Increment a product's quantity in an order

| Parameter    | Type     | Description           |
| :----------: | :------: | --------------------- |
| `id_order`   | `String` | The id of the order   |
| `id_product` | `String` | The id of the product |

### PATCH /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_productdecrement)/product/[:id_product](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_orderproductid_productdecrement)/decrement

Decrement a product's quantity in an order. Remove the product from the order if it's quantity equal 0

| Parameter    | Type     | Description           |
| :----------: | :------: | --------------------- |
| `id_order`   | `String` | The id of the order   |

### PATCH /api/v1/order/[:id_order](https://github.com/AGenson/moleculer-project-web-store#patch-apiv1orderid_order)

Validate an order. The order will be locked and cannot be changed after validation

| Parameter    | Type     | Description         |
| :----------: | :------: | ------------------- |
| `id_order`   | `String` | The id of the order |
