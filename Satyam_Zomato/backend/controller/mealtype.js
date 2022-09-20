const Mealtypes= require('../model/mealtype')


exports.getAllMealtypes=(req,res)=>{
    Mealtypes.find()
    .then(
        result=>
          res.status(200).json({
              message:"Mealtypes fetched successfully",
              data:result
          }))
    .catch(error=>
         res.status(500).json({
             message:"error occured in DB",
             error:error
         })
        )
}