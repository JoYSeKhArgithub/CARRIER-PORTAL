import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { deleteJobController, getjobController, jobController, jobStatusController, updateJobController } from "../controllers/job.controller.js";

const router = Router();
router.post('/create-job',userAuth,jobController)

router.get('/get-jobs',userAuth,getjobController)

router.patch('/update-job/:id',userAuth,updateJobController)

router.delete('/logout-job/:id',userAuth,deleteJobController)

router.get('/job-stats',userAuth,jobStatusController)
export default router