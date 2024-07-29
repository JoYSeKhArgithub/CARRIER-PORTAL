import jobModel from "../models/job.model.js"
import mongoose from "mongoose"
import moment from "moment"
const jobController = async (req,res,next)=>{
try {
        const{company,position} = req.body
        if(!company || !position){
            next('Please Provide All Fields')
        }
        req.body.createdBy = req.user?._id
        const job = await jobModel.create(req.body)
        res.status(201).json({job})
} catch (error) {
    next(error)
}
}

const getjobController = async (req,res,next)=>{
    // const jobs = await jobModel.find({createdBy:req.user?._id})

    const {status,workType,search,sort} = req.query;

    const queryObject = {
        createdBy: req.user?._id,
    }
    if(status && status!='all'){
        queryObject.status = status
    }
    if(workType && workType!=='all'){
        queryObject.workType = workType
    }
    if(search){
        queryObject.position = {$regex: search , $options: "i"}// i for incensesative
    }
    let queryResult = jobModel.find(queryObject)

    if(sort === 'latest'){
        queryResult = queryResult.sort('-createdAt')
    }

    if(sort === 'oldest'){
        queryResult = queryResult.sort('createdAt')
    }

    if(sort === 'a-z'){
        queryResult = queryResult.sort('position')
    }

    if(sort === 'z-a'){
        queryResult = queryResult.sort('-position')
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);
    const totalJobs = await jobModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs/limit);

    const jobs = await queryResult;
    res.status(200).json({
        totalJobs ,
        jobs,
        numOfPage
    })
}

const updateJobController = async (req,res,next)=>{
    try {
         const {id} = req.params
         const {company,position} = req.body
         if(!company || !position){
            next('PLease Provide All Fields')
         }
        const job = await jobModel.findOne({_id:id})
        if(!job){
            next(`no jobs find with id ${id}`)
        }
        if(req.user?._id !== job.createdBy.toString()){
            next('You are not Authorize to update this job')
            return
        }
        const updateJob = await jobModel.findByIdAndUpdate({_id:id},req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({updateJob})
    } catch (error) {
        next(error)
    }
}

const deleteJobController = async(req,res,next)=>{
try {
   const {id} = req.params;
   const job = await jobModel.findOne({_id:id});
   if(!job){
    next(`No jobs find with id ${id}`);
   }
   if(req.user?._id !== job.createdBy.toString()){
        next('You are not Authorize to Delete this job');
   }
   await job.deleteOne()
   res.status(200).json({message:"Delete Job Successfully "})
} catch (error) {
    next(error)
}
}

const jobStatusController = async (req,res,next)=>{
    try {
        const stats = await jobModel.aggregate([
            {
                $match:{
                    createdBy: new mongoose.Types.ObjectId(req.user?._id)
                }
            },
            {
                $group:{
                    _id: '$status',
                    count: {$sum: 1}
                }
            }
        ])
        const defaultStats = {
            pending: stats.pending || 0,
            reject : stats.reject || 0,
            interview : stats.interview || 0
        }

        //monthly yearly status
        let monthlyApplication = await jobModel.aggregate([
            {
                $match:{
                    createdBy: new mongoose.Types.ObjectId(req.user?._id)
                }
            },
            {
                $group:{
                    _id:{
                        year:{$year: '$createdAt'},
                        month:{$month: '$createdAt'}
                    },
                    count:{
                        $sum: 1
                    }
                }
            }
        ])
        monthlyApplication = monthlyApplication.map(item => {
           const {_id:{year,month},count} = item
           const date = moment().month(month-1).year(year).format('MMM Y')
           return {date,count};
        })
        .reverse();

        res
        .status(200)
        .json({totalLength: stats.length,defaultStats,monthlyApplication})
    } catch (error) {
        next(error)
    }
}

export {jobController,getjobController,updateJobController,deleteJobController,jobStatusController}