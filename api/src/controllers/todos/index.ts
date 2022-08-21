import { Response, Request } from "express"
import { ITodo } from "../types/todos"
import Todo from "../models/todo"
import axios, { AxiosResponse } from "axios"

const baseUrl: string =  process.env.WHAT_IS_THE_TIME_URL ||'http://localhost:5000'
console.log(`This is the env var process.env.WHAT_IS_THE_TIME_URL ${process.env.WHAT_IS_THE_TIME_URL} `)
console.log(`This is the base url ${baseUrl}`)



const getTodos = async (req: Request, res: Response): Promise<void> => {
    console.log("Get Todos has been called")

    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

export const getTime = async (): Promise<AxiosResponse<ApiDataType>> => {
    console.log('getTime has been called inside api con')
    try {
        const time: AxiosResponse<ApiDataType> = await axios.get(

            "http://" + baseUrl + "/gettime"
        )
        console.log(`This is the url of the get time func using to get the time ${baseUrl} + "/gettime"`)
        return time
    } catch (error: any) {
        throw new Error(error)
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    console.log('POST request has MADE TO add-todos')
    console.log('calling getTime .....')
    const timeIsNow = await getTime()
    console.log('get time has been called .....')

    const currentTime = timeIsNow.data.datetime
    console.log(currentTime)

    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">

        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
            currentTime: currentTime


        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos, msg: currentTime })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        await Todo.deleteMany(
            {}
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "All Todo deleted",
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos }