const express=require('express')

const router=express.Router()

router.get('',(req,res)=>{
    res.send('hi you have called basic abc routes GET  method!!!')
})
router.post('',(req,res)=>{
    res.send('hi you have called  basic abc routes POST method!!!')
})
router.put('',(req,res)=>{
    res.send('hi you have called basic abc routes  PUT  method!!!')
})
router.delete('',(req,res)=>{
    res.send('hi you have called  basic abc routes DELETE method!!!')
})



// exporting to app.js

module.exports=router;