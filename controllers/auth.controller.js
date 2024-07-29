import userModel from "../models/user.model.js"

const registerController = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body
        if(!name){
            next('Please Enter The Name ')
        }
        if(!email){
            next('Please Enter The Email ')
        }
        if(!password){
            next('Please Enter The Password and Put That Password length greater than 6 ')
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            next('Email Already Register Please Login')
        }

        const user = await userModel.create({name,email,password})
        const token = user.createJWT()
        res.status(201).send({
            message:"User Created Successfully ",
            success:true,
            user : {
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                location: user.location,
            },
            token})
    } catch (error) {
        next(error)
    }
}

const loginController = async (req,res,next) =>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            next("Please Provide All Fields")
        }
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            next('Invalid Username or password')
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            next('Invalid Username or password')
        }
       user.password = undefined
        const token = user.createJWT()
        res.status(200).json({
            message:'Login Successfully',
            success: true,
            user,
            token
        })
    }
    catch(error){
        next(error)
    }
}

export  {registerController,loginController}