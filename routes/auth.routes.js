import { Router } from "express";
import rateLimit from "express-rate-limit"
import {registerController,loginController} from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
// ip limiter

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	
})



const router = Router()

router.post('/register',limiter,registerController)

router.post('/login',limiter,loginController)
export default router