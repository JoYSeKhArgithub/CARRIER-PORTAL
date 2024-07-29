import express from "express"
import dotenv from "dotenv"
import testRoutes from "./routes/test.routes.js"
import registerRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import jobRoutes from "./routes/job.routes.js"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"

dotenv.config({path: './.env'})

import connectDB from "./config/index.js";
import errorMiddleware from "./middlewares/error.middleware.js"

const app = express();
const PORT = process.env.PORT || 7083;

app.use(helmet()) // fro secure the header
app.use(mongoSanitize())
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',registerRoutes);
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobRoutes)
app.use(errorMiddleware)


connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`We are at ${process.env.DEV_MODE} Mode running at port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!! ",err)
})