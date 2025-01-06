const express = require('express')
const app = express()
const port = 3001

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ehdrms940:!!Rhkddks@cluster0.s7c9z.mongodb.net/',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


