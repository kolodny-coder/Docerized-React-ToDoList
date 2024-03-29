import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./controllers/routes"

const app: Express = express()
app.use(express.json());

const PORT: string | number = process.env.PORT || 4000

app.use(cors({
    origin: "*",
    })
)
app.use(todoRoutes)

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ttvny.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ttvny.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)

    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT} ${mongoose.connection.readyState}`)
        ).keepAliveTimeout = 65000


    )
    .catch(error => {
        throw error
    })