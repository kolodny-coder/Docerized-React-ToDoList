import express, { Express } from "express"

const app: Express = express()
app.use(express.json());
const PORT: string | number = process.env.PORT || 5000




app.get('/gettime', async(req, res) => {
    const datetime = await new Date();
    // console.log(datetime);
    const fib =  fibonacci(1000000000)

     res.json({datetime})
})

app.listen(PORT, () => {
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