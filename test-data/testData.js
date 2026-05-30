// test-data/testData.js
// Centralised test data — easy to maintain and update

const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

const CHECKOUT_INFO = {
  valid: {
    firstName: 'Hari',
    lastName: 'Chandana',
    postalCode: '500001',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Chandana',
    postalCode: '500001',
  },
  missingLastName: {
    firstName: 'Hari',
    lastName: '',
    postalCode: '500001',
  },
  missingPostalCode: {
    firstName: 'Hari',
    lastName: 'Chandana',
    postalCode: '',
  },
};

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
};

const ERROR_MESSAGES = {
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  missingUsername: 'Epic sadface: Username is required',
  missingPassword: 'Epic sadface: Password is required',
  missingFirstName: 'Error: First Name is required',
  missingLastName: 'Error: Last Name is required',
  missingPostalCode: 'Error: Postal Code is required',
};

module.exports = { USERS, CHECKOUT_INFO, PRODUCTS, ERROR_MESSAGES };
