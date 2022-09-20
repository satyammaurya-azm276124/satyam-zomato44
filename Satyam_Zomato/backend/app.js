
const express=require('express')
const slashRoutes=require('./routes/slash')
const abcRoutes=require('./routes/abc')
const restaurantRoutes=require('./routes/restaurant')
const locationRoutes=require('./routes/location')
const mealtypeRoutes=require('./routes/mealtype')
const menuRoutes=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
const bodyParser=require('body-parser')
const mongoose= require('mongoose')
const cors=require('cors')


const PORT=9090;
const DBSTRING="mongodb+srv://root:root@cluster0.2i4ss4k.mongodb.net/zomato_44"
//"mongodb://127.0.0.1:27017/zomato_44"

mongoose.connect(DBSTRING,
                ()=>{
                     console.log("mongoDB connected")
                    },
                e=>console.log("error occured while connecting to DB:",e))


let app=express();

//middlewares :
app.use(cors())
app.use(bodyParser.json())
app.use('',slashRoutes)
app.use('/abc',abcRoutes)
app.use('/restaurant',restaurantRoutes)
app.use('/location',locationRoutes)
app.use('/mealtype',mealtypeRoutes)
app.use('/menu',menuRoutes)
app.use('/payment',paymentRoutes)





app.listen(PORT,()=>{
    console.log(`the server is running on port : ${PORT}`)
})
