const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const multer = require('multer')
const dotenv = require("dotenv").config()

const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

const app = express()

app.use(cors({
    origin:'*'
}))

app.use('/', bodyParser.json())
app.use('/', bodyParser.urlencoded({extended: true}))



app.listen(process.env.PORT, ()=>console.log(`Server is running on port ${process.env.PORT}\nhttp://localhost:${process.env.PORT}`))

app.use('/admin', adminRouter)
app.use('/product', productRouter)
app.use('/user',userRouter)
app.use('/auth', authRouter)

app.get('/',(req, res)=>{
    return res.send({message: "hello world"})
})