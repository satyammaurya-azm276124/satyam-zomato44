    
 //const restaurants=require('../model/restaurant.json')
 const Restaurants=require('../model/restaurant')

 exports.getAllRestaurants=(req,res)=>{
    Restaurants.find()
    .then(
        result=>{
         res.status(200).json({
             message:"restaurants fetched successfully",
             data:result
         })
        })
    .catch(error=>{
       res.status(500).json({message:"error in database", error:error})
    })      
   }
 
   exports.getRestaurantsByCity=(req,res)=>{
     let filter={city_name:req.params.cName}
     
     Restaurants.find(filter)
     .then(
         result=>{
          res.status(200).json({
              message:"restaurants fetched successfully",
              data:result
          })
         })
     .catch(error=>{
        res.status(500).json({message:"error in database", error:error})
     })   
 
   }


   exports.getRestaurantsByCityID=(req,res)=>{
    let filter={city:req.params.cID}
    
    Restaurants.find(filter)
    .then(
        result=>{
         res.status(200).json({
             message:"restaurants fetched successfully",
             data:result
         })
        })
    .catch(error=>{
       res.status(500).json({message:"error in database", error:error})
    })   

  }


  exports.getRestaurantByName=(req ,res)=>{
    let filter={name:req.params.rName}
    
    Restaurants.findOne(filter)
    .then(
        result=>{
         res.status(200).json({
             message:"restaurants fetched successfully",
             data:result
         })
        })
    .catch(error=>{
       res.status(500).json({message:"error in database", error:error})
    })   
  }
 
 
   exports.addRestaurant=(req,res)=>{
 
     Restaurants.insertOne()
      restaurants.push(req.body)
      let rstring=JSON.stringify(restaurants)
      fs.writeFileSync('/Users/gaureedesai/Training Hands-on/internship - April 2022/NodeJs-express-Routes/model/restaurant.json',rstring)
      res.status(201).json({
          message:"restaurant added successfully!",
          data:restaurants
      })
      
   }
 
   exports.updateRestaurant=(req,res)=>{
 
     Restaurants.updateOne()
     const index= restaurants.findIndex((item)=>item.name==req.body.name)
 
     restaurants[index].city=req.body.city;
 
     res.status(201).json({
         message:"restaurant updated successfully!",
         data:restaurants
     })
   }
 
   exports.getRestaurantsByFilter=(req,res)=>{
    let filter={}
    
    if(req.body.city_id){
        filter.city=req.body.city_id
      
    }
 
   if(req.body.cuisine && req.body.cuisine.length >0 ){
       filter['Cuisine.name']={ $in : req.body.cuisine }
   }
 
     if(req.body.lcost && req.body.hcost){
        if(req.body.lcost==0){
            filter.cost={$lte: req.body.hcost}
        }
        else{
            filter.cost={
                $lt:req.body.hcost,
                $gt:req.body.lcost
            }
        }
     }
     
     let sort=1
     if(req.body.sort){
         sort=req.body.sort
     }
 
     console.log(filter)
     //achieve pagination using limit and skip 
     Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({cost:sort})
     .then(result=>{
          console.log(result)  
          Restaurants.find(filter).count((err,count)=>{
            if(err)
            console.log(err)
            else
            res.status(200).json({
                message:"restaurants fetched successfully",
                data:result,
                totalRecords:count
          }) 
        
          })
         })
     .catch(error=>{
        res.status(500).json({message:"error in database", error:error})
     })  
   }
 