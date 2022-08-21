"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = exports.getTime = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const axios_1 = __importDefault(require("axios"));
const baseUrl = process.env.WHAT_IS_THE_TIME_URL || 'http://localhost:5000';
console.log(`This is the env var process.env.WHAT_IS_THE_TIME_URL ${process.env.WHAT_IS_THE_TIME_URL} `);
console.log(`This is the base url ${baseUrl}`);
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Todos has been called");
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const getTime = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getTime has been called inside api con');
    try {
        const time = yield axios_1.default.get(baseUrl + "/gettime");
        console.log(`This is the url of the get time func using to get the time ${baseUrl} + "/gettime"`);
        return time;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getTime = getTime;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST request has MADE TO add-todos');
    console.log('calling getTime .....');
    const timeIsNow = yield (0, exports.getTime)();
    console.log('get time has been called .....');
    const currentTime = timeIsNow.data.datetime;
    console.log(currentTime);
    try {
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
            currentTime: currentTime
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos, msg: currentTime });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
const deleteAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_1.default.deleteMany({});
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "All Todo deleted",
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteAllTodos = deleteAllTodos;
