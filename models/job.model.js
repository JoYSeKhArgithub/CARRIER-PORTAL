import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema({
    company:{
        type:String,
        required: [true,"Company name is Required"]
    },
    position:{
        type:String,
        required:[true,"Job Position is Required"],
        maxlength:100
    },
    status:{
        type:String,
        enum: ['pending','reject','interview'],
        default: "pending"
    },
    workType:{
        type:String,
        enum:['full-time','part-time','internship','contract'],
        default: 'full-time'
    },
    workLocation:{
        type:String,
        default:'Mumbai',
        required:[true,'Work Location is Required']
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})

const jobModel = mongoose.model('Job',jobSchema)
export default jobModel