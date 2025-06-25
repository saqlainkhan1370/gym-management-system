const Member = require ('../Modals/member');
const Membership = require('../Modals/membership')


exports.getAllMember = async(req,res)=>{
    

try{
    const{skip,limit}=req.query;
 const members = await Member.find({gym:req.gym._id});
 const totalMember =members.length;


 const limitedMembers = await Member.find({gym:req.gym._id}).sort({createsAt: -1}).skip(skip).limit(limit);
 res.status(200).json({
    message:members.length?"Fetched Member Successfully":"No any member Registered yet",
    members:limitedMembers,
    totalMembers:totalMember
 })



}catch(err){
    console.log(err);
    res.status(500).json({
        error:"server Error"
    })

}


}


function addMonthsToDate(months,joiningDate){


    // get current year,month and day
    let today=joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth =today.getMonth();
    const currentDay = today.getDate();


// calculate the new month  and year
const futureMonth = currentMonth +months;
const futureYear = currentYear+Math.floor(futureMonth / 12);


//calculate the correct future month (modulus for month)
const adjustedMonth = futureMonth % 12;


// set the date to the first of the futuere month
 const futureDate = new Date( futureYear,adjustedMonth,1)



// get the last day of the future month
const lastDayOfFutureMonth = new Date(futureYear,adjustedMonth + 1,0).getDate();


// adjust the day if current day exceeds tghe number of days in the new month
const adjustedDay = Math.min(currentDay,lastDayOfFutureMonth);


// set the final adjusted day
futureDate.setDate(adjustedDay);

return futureDate;

}







exports.registerMember = async(req,res)=> {
    try {
        const { name, mobileNo, address, membership, profilePic, joiningDate } = req.body;
        
        const member = await Member.findOne({ gym: req.gym._id, mobileNo });
        if (member) {
            return res.status(409).json({ error: 'Already registered with this Mobile No' });
        }

        const memberShip = await Membership.findOne({ _id: membership, gym: req.gym._id });
        if (!memberShip) {
            return res.status(409).json({ error: "No such Membership is available" });
        }
        
        // Validate joiningDate
        let jngDate = new Date(joiningDate);
        if (isNaN(jngDate)) {
            return res.status(400).json({ error: "Invalid date format for joiningDate" });
        }

        const membershipMonth = memberShip.months;
        const nextBillDate = addMonthsToDate(membershipMonth, jngDate);

        let newMember = new Member({
            name,
            mobileNo,
            address,
            membership,
            gym: req.gym._id,
            profilePic,
            nextBillDate
        });

        await newMember.save();
        res.status(200).json({ message: "Member Registered Successfully", newMember });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}
 exports.searchMember = async(req,res)=>{
    try{
         const {searchTerm}=req.query;
         const member = await Member.find({gym:req.gym._id,
            $or:[{name:{$regex : '^' + searchTerm,$options:'i'}},
                {mobileNo:{$regex : '^' + searchTerm,$options:'i'}},

            ]
         });
         res.status(200).json({
            message:member.length?"Fetched members SuccessFully":"No such member Registered yet",
            members:member,
            totalMembers:member.length
         })


    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }

 }
exports.monthlyMember = async(req,res)=>{
    try{
        const now = new Date();

        // get the first day of current month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(),  1);
        
//get the last  day of current month
         const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1,0,23,59,59,999);

         const member = await Member.find({gym:req.gym._id,
            createdAt:{
                $gte:startOfMonth,
                $lte: endOfMonth
            }
         }).sort({createdAt: -1});

         res.status(200).json({
            message:member.length?"Fetched members SuccessFully":"No such member Registered yet",
            members:member,
            totalMembers:member.length
         })





    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.expiringWithin3Days = async(req,res)=>{
    try{
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() +3);

     const member = await Member.find({gym:req.gym._id,
        nextBillDate:{
            $gte:today,
            $lte: nextThreeDays
        }
     });

     res.status(200).json({
        message:member.length?"Fetched members SuccessFully":"No such member is expering within 3 dayst",
        members:member,
        totalMembers:member.length
     })



    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.expiringWithIn4To7Days = async(req,res)=>{
    try{
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate()+4);

        const next7Days = new Date();
        next7Days.setDate(today.getDate()+7);


        const member = await Member.find({gym:req.gym._id,
            nextBillDate:{
                $gte:next4Days,
                $lte: next7Days
            }
         });



         res.status(200).json({
            message:member.length?"Fetched members SuccessFully":"No such member is expiring within 4-7 dayst",
            members:member,
            totalMembers:member.length
         })





    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}


exports.expiredMember = async(req,res)=>{
    try{
        const today = new Date();


        const member = await Member.find({gym:req.gym._id,status:"Active",
            nextBillDate:{
                $lte: today
            }
         })



         res.status(200).json({
            message:member.length?"Fetched members SuccessFully":"No such member has been expired",
            members:member,
            totalMembers:member.length
         })

    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.inActiveMember= async(req,res)=>{
    try{
        


        const member = await Member.find({gym:req.gym._id,status:"Pending",
        
         });



         res.status(200).json({
            message:member.length?"Fetched members SuccessFully":"No such member has been pending",
            members:member,
            totalMembers:member.length
         })

    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.getMemberDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No such member"
            })
        }
        res.status(200).json({
            message:"member data fetched",
            members:member
        
         })


    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}
exports.changeStatus = async(req,res)=>{
    try{

         const{id} = req.params;
         const{status} =req.body;
         const member = await Member.findOne({_id:id,gym:req.gym._id});
         if(!member){
             return res.status(400).json({
                 error:"No such member"
             })
         }
         member.status = status;
         await member.save();
         res.status(200).json({
            message:"status changed successfully"
         })

   

    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.updateMemberPlan = async (req, res) => {
    try {
        const { membership } = req.body;
        const { id } = req.params;
        
        // Correct the model name to Membership
        const memberShip = await Membership.findOne({ gym: req.gym._id, _id: membership });
        
        if (memberShip) {
            let getMonth = memberShip.months;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonth, today);

            const member = await Member.findOne({ gym: req.gym._id, _id: id });
            if (!member) {
                return res.status(409).json({ error: "No such member" });
            }

            member.nextBillDate = nextBillDate;
            member.lastPayment = today;

            await member.save();
            res.status(200).json({ message: "Member renewed successfully", member });
        } else {
            return res.status(409).json({ error: "No such Membership available" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};



