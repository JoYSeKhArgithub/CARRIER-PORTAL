import mongoose,{Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
const userSchema = new Schema({
    name:{
        type: String,
        required: [true,"Name is Required"]
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: [true,"Email is Required"],
        unique: true,
        validate: validator.isEmail
    },
    password:{
        type: String,
        required: [true,"Password is Required"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true
    },
    location:{
        type:String,
        default: 'India'
    }
},{timestamps: true})

userSchema.pre('save',async function(){
    if(!this.isModified) return ;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
};

userSchema.methods.createJWT = function(){
    return JWT.sign(
        {
            _id: this._id,
            email: this.email,
            password: this.password
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

const userModel = mongoose.model('User',userSchema)

export default userModel