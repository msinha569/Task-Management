import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"
import errorMiddleware from "./middlewares/error.middleware.js"
export const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-management-4bh0.onrender.com"],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)

app.use(errorMiddleware)