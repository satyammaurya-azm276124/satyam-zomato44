const express=require('express')
const paymentController=require('../controller/payment')

const router=express.Router()

router.post('',paymentController.createOrder)
router.post('/save',paymentController.saveTransaction)

module.exports=router;