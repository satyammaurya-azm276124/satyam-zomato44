const express=require('express')

const restaurantController=require('../controller/restaurant')

const router=express.Router()

router.get('',restaurantController.getAllRestaurants )




router.get('/:cID',restaurantController.getRestaurantsByCityID )
router.get('/details/:rName',restaurantController.getRestaurantByName )



router.post('',restaurantController.addRestaurant)
router.post('/filter/:pageNo',restaurantController.getRestaurantsByFilter )


router.put('',restaurantController.updateRestaurant)

router.delete('',(req,res)=>{
    res.send('hi you have called  restaurant routes DELETE method!!!')
})



// exporting to app.js

module.exports=router;