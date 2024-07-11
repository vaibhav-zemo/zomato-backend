# Zomato Clone Backend API Documentation

## Introduction

This README provides an overview of the APIs implemented in your Zomato clone backend project. These APIs cover various functionalities related to user authentication, restaurant management, cart handling, and more.

## Base URL

All endpoints are accessible via the base URL: `http://localhost:8080/api/v1`

## Endpoints

### Authentication

- **Send OTP**
  - `POST /auth/send-otp`
  - Sends an OTP to the user's registered phone number.
- **Verify OTP**
  - `POST /auth/verify-otp`
  - Verifies the OTP provided by the user.

### User Management

- **Create User**
  - `POST /user`
  - Creates a new user.
- **Get User Details**
  - `GET /user/:id`
  - Retrieves user details by ID.
- **List Users**
  - `GET /user`
  - Lists all users.
- **Update User**
  - `PUT /user/:id`
  - Updates user information.
- **Delete User**
  - `DELETE /user/:id`
  - Deletes a user.

### Address Management

- **Create Address**
  - `POST /address/:userId`
  - Creates a new address for a user.
- **Update Address**
  - `PUT /address/:id`
  - Updates an existing address.
- **Delete Address**
  - `DELETE /address/:id`
  - Deletes an address.
- **Show Address**
  - `GET /address/:id`
  - Retrieves address details by ID.

### Cart Management

- **Create Cart**
  - `POST /cart`
  - Creates a new cart.
- **Get User Cart**
  - `GET /cart/:userId`
  - Retrieves the user's cart.
- **Add Product to Cart**
  - `PUT /cart/add/:cartId`
  - Adds a product to the cart.
- **Remove Product from Cart**
  - `PUT /cart/remove/:cartId/:cartItemId`
  - Removes a product from the cart.
- **Add Coupon to Cart**
  - `PUT /cart/add/coupon/:cartId/:couponId`
  - Applies a coupon to the cart.
- **Remove Coupon from Cart**
  - `PUT /cart/remove/coupon/:cartId/:couponId`
  - Removes a coupon from the cart.

### Category Management

- **List Categories**
  - `GET /category`
  - Lists all available categories.
- **Create Category**
  - `POST /category`
  - Creates a new category.
- **Delete Category**
  - `DELETE /category/:id`
  - Deletes a category.

### City Management

- **List Cities**
  - `GET /city`
  - Lists all cities.
- **Get City Details**
  - `GET /city/:id`
  - Retrieves city details by ID.
- **Create City**
  - `POST /city`
  - Creates a new city.
- **Update City**
  - `PUT /city/:id`
  - Updates city information.
- **Delete City**
  - `DELETE /city/:id`
  - Deletes a city.

### Coupon Management

- **Create Coupon**
  - `POST /coupon`
  - Creates a new coupon.
- **List Coupons**
  - `GET /coupon`
  - Lists all available coupons.
- **Get Coupon Details**
  - `GET /coupon/:id`
  - Retrieves coupon details by ID.
- **Update Coupon**
  - `PUT /coupon/:id`
  - Updates coupon information.
- **Delete Coupon**
  - `DELETE /coupon/:id`
  - Deletes a coupon.

### Order Management

- **Create Order**
  - `POST /order/:userId`
  - Creates a new order.
- **List User Orders**
  - `GET /order/list/:userId`
  - Lists orders for a specific user.
- **Get Order Details**
  - `GET /order/:orderId`
  - Retrieves order details by ID.
- **Update Order**
  - `PUT /order/:orderId`
  - Updates order information.

### Product Management

- **Create Product**
  - `POST /product`
  - Creates a new product.
- **Update Product**
  - `PUT /product/:productId`
  - Updates product information.
- **Delete Product**
  - `DELETE /product/:productId`
  - Deletes a product.
- **List Products**
  - `GET /product`
  - Lists all available products.
- **Get Product Details**
  - `GET /product/:productId`
  - Retrieves product details by ID.

### Restaurant Management

- **Create Restaurant**
  - `POST /restaurant`
  - Creates a new restaurant.
- **Show Restaurant**
  - `GET /restautant`
  - Retrieves a list of all restaurants.

### Reviews

- **Create Review**
  - `POST /review`
  - Creates a new review for a restaurant.
- **List Coupons**
  - `GET /coupon`
  - Lists all available coupons.
- **Get Review**
  - `GET /coupon/:id`
  - Retrieves review details by ID.
- **Update Review**
  - `PUT /review/:id`
  - Updates a review for a restaurant by Id.
- **Delete Review**
  - `DELETE /review/:id`
  - Deletes a review by its Id.
