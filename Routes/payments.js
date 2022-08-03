const express = require('express')
const Router = express.Router()
const PaymentController = require('../Controllers/paymentsController')


// configure payment Routes

Router.post('/razorpay', PaymentController.completePayments)
Router.post('/transactions', PaymentController.saveTransaction)

module.exports = Router
 