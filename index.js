const express = require('express')
const connectDB = require('./config/dbConnection')
const dotenv = require('dotenv').config()

connectDB();
const app = express();
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
app.use(express.json())
// const CONNECTION_URL =`mongodb+srv://sathish:${encodeURIComponent('Smartone@3')}@nodetraining.eg0xlty.mongodb.net/mycontacts`

// mongoose.connect(CONNECTION_URL)
//     .then(() =>  console.log(`Server is running on the port ${port}`))
//     .catch((err) => console.log(err.message))
// mongoose.set('useFindAndModify', false);


app.use('/contacts', require('./routes/contactRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use(require('./middleware/errorHandler'))
app.listen(port, () => { console.log(`node js app running on port ${port}`) })
