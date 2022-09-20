const Menu= require('../model/menu')


exports.getAllMenu=(req,res)=>{
    let filter={restaurantName:req.params.rName}
    Menu.find(filter)
    .then(
        result=>
          res.status(200).json({
              message:"Menu fetched successfully",
              data:result
          }))
    .catch(error=>
         res.status(500).json({
             message:"error occured in DB",
             error:error
         })
        )
}