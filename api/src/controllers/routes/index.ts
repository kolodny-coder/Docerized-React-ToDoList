import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos } from '../todos'

const router: Router = Router()

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

router.delete("/delete-all-todos", deleteAllTodos )


export default router