import "express-async-errors"
import express from "express"
const app = express()

import dotenv from "dotenv"
dotenv.config() //that is going to look for dotenv file in the root, exacly how we are going to set it up

//db and authentication
import connectDB from "./db/connect.js"

//routers
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"

//middlewarer
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

app.use(express.json()) //special build in middleware that will make json date available to us in controllers since we have poset request we will be looking for stuff and that stuff that JSON date will be passes to us using the express.json middleware
app.get("/", (req, res) => {
  //   throw new Error("dfadfa")
  res.send("Hi")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter)

app.use(notFoundMiddleware) //so im using middleware this signals that im looking for all the http methods, and the same goes for route,all included, thats why we put it below the routes so express first is trying to match request to all routes, and then if nothing matches he goes with app.use

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

// it will have to be async coz connectDB is going to return a promise
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    //server will spin up only if we are successfull
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
