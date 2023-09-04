const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL).then(data=>{
    console.log(`Database is connected with server ${data.connection.host}`)
})
}

module.exports = connectDatabase
