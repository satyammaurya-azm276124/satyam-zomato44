
const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    transaction_id:{
        type:String,
        required:true
    },
    transaction_amount:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("Transactions",transactionSchema,"transaction")
