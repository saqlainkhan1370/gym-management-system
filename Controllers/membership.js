

const Membership = require('../Modals/membership');





exports.addMembership = async(req,res)=>{
    try{
         
     const{ months,price}=req.body;
     const memberShip = await Membership.findOne({ gym:req.gym._id,months});
if(memberShip){
    memberShip.price = price;
    await memberShip.save();
    res.status(200).json({
        message:"Updated Successfully"
    })
} else{
    const nuwMembership =new Membership({price,months,gym:req.gymId});

    await nuwMembership.save();
      res.status(200).json({
        message:"Added Successfully"
        
})

}
} catch(err){
        console.log(err);
        res.status(500).json({
            error:"server Error"
        })

    }
    }

    exports.getmembership = async (req, res) => {
        try {
            const loggedInId = req.gym._id;
            console.log("Gym ID:", loggedInId);
    
            const memberShip = await Membership.find({ gym: loggedInId });
    
            res.status(200).json({
                message: "Member Fetched Successfully",
                membership: memberShip
            });
    
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: "server Error"
            });
        }
    };
    

  
