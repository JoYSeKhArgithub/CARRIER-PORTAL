import {Router} from 'express'
import {testController} from '../controllers/test.controllers.js'
import userAuth from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/test-post',userAuth,testController)

export default router