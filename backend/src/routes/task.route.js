import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getTaskById, getTasks, getYouTasks, taskStatus, updateTask } from "../controllers/task.controller.js";


const router = Router()

router.route("/").get(verifyJWT, getTasks)
router.route("/you").get(verifyJWT, getYouTasks)
router.route("/").post(verifyJWT, createTask)
router.route("/:id").get(verifyJWT,getTaskById)
router.route("/:id").put(verifyJWT, updateTask)
router.route("/:id").delete(verifyJWT,deleteTask)
router.route("/status/:id").put(verifyJWT, taskStatus)

export default router