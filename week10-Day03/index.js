const [express, morgan, path] = [require('express'), require('morgan'), require('path')]
let app = express()
app.use(morgan('dev'))
app.use((req, res, next)=>{
    if(req.query.Number === 0) return res.json('Number is required.')
    next()
})

app.get('/square', (req, res)=>{
    let square = parseInt(req.query.Number)
    res.json(square * square)
})

app.get('/squareroot', (req, res)=>{
    let squareroot = parseInt(req.query.Number)
    res.json(squareroot ** 0.5)
})

app.listen(8080)