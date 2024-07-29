import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import {userController} from "../controllers/user.controller.js";

const router = Router()

router.put('/update-user',userAuth,userController)

export default router