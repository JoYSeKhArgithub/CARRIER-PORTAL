import userModel from "../models/user.model.js"

const userController = async (req,res,next)=>{
try {
        const {name,email,lastName,password,location} = req.body
        if(!name || !email || !lastName || !password || !location) {
            next('Please Provide All Fields')
        }
       const user = await userModel.findOne({
        _id:req.user?._id
    }).select("+password");
        user.name = name;
        user.email = email;
        user.lastName = lastName;
        user.location = location;
    
        await user.save();
        user.password = undefined;
        const token = user.createJWT();
        res.status(200).json({
            user,
            token
        })
} catch (error) {
    next(error)
}
}

export {userController}