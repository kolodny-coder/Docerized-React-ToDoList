import express, { Express } from "express"
import cors from "cors"


const app: Express = express()
app.use(express.json());
app.use(cors({
        origin: "*",
    })
)


const PORT:  number | string =  process.env.PORT || 5000
console.log(`This is the process.env.PORT value == ${process.env.PORT}`)


app.get('/gettime', async(req, res) => {
    const datetime = await new Date();
    console.log("GET  request to what time is it had been made");
    const fib =  fibonacci(1000000000)

     res.json({datetime})
})

app.listen( PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

function fibonacci(num: number){
    var a = 1, b = 0, temp;

    while (num >= 0){
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
}