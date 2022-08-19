interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    createdAt?: string
    updatedAt?: string
}

interface TodoProps {
    todo: ITodo
}

type ApiDataType = {
    message: string
    status: string
    datetime: string
    todos: ITodo[]
    todo?: ITodo
}