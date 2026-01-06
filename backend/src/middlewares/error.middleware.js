import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err,req,res,next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            success: err.success,
            message: err.message || "no error msg was provided",
            errors: err.errors,
            data: err.data,
        });
        return
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
};

export default errorMiddleware
