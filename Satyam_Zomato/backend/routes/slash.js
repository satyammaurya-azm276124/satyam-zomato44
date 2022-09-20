const express=require('express')

const router=express.Router()

router.get('',(req,res)=>{
    res.send('hi you have called basic routes GET  method!!!')
})
router.post('',(req,res)=>{
    res.send('hi you have called  basic routes SEND  method!!!')
})
router.put('',(req,res)=>{
    res.send('hi you have called basic routes  PUT  method!!!')
})
router.delete('',(req,res)=>{
    res.send('hi you have called  basic routes DELETE method!!!')
})



// exporting to app.js

module.exports=router;