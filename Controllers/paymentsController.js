const Razorpay = require('razorpay')
const shortId = require('shortid')
//const dotenv = require('dotenv')
const Transaction = require('../Models/transaction')
const crypto = require('crypto')

const razorpay = new Razorpay({
    key_id:'rzp_test_VEYin9OA6337Rm',
    key_secret:'i7qghzbwbN0sleELSrkgs68S'
})

exports.completePayments = async(req,res) => {

    console.log('Payments Initiated !!')
    const payment_capture = 1
    const amount= req.body.amount;
    const currency = 'INR';

    const options = {
     
        amount : amount + 100,
        currency,
        receipt: shortId.generate(),
        payment_capture

    }

    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json(response)
    }
    catch(error){
          
        console.log(error)
    }

    
}


exports.saveTransaction = (req, res) => {
    console.log('saving Transactions.......')

    const generated_sign = crypto.createHmac('sha256', razorpay.key_secret)
    console.log(generated_sign, 'this is generated sign')

    generated_sign.update(req.body.razorpay_order_id +"|" + req.body.transaction_id)
    
    if(generated_sign.digest('hex') == req.body.razorpay_signature){

        const transaction = new Transaction({
            transaction_id: req.body.transaction_id,
            transaction_amount: req.body.transaction_amount
        })

        transaction.save( function(err, savedTranc){
            if(err){
                return res.status(500).send("some error occured")
            }
            res.send({transaction:savedTranc})
        })
    }
    else{
        res.send('failed')
    }
}