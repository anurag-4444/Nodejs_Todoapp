import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body

        await Task.create({
            title,
            description,
            user: req.user,
        })

        res.status(201).json({
            success: true,
            message: "Task added Successfully"
        })
    } catch (error) {
        next(error)
    }

    // Below one and Task.create({title, description}) both are same so obviously we go with create one because it is in the one line
    // const task = new Task({title,description})
    // await task.save() 
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id

        const tasks = await Task.find({ user: userid })

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Task Not Found", 404))

        task.isCompleted = !task.isCompleted

        await task.save()
        // await Task.create(task) // we can do either this or above one


        res.status(200).json({
            success: true,
            message: "task updated",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        // let id = mongoose.Types.ObjectId.isValid(req.params.id);
        const task = await Task.findById(req.params.id)
    
        if (!task) return next(new ErrorHandler("Task Not Found", 404))
    
        await task.deleteOne()
    
        res.status(200).json({
            success: true,
            message: "task deleted",
        })
    
    } catch (error) {
        next(error)
    }
} 
