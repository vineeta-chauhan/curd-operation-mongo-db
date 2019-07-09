const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://root:root@cluster0-qr6um.mongodb.net/EmployeeDB?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    err => {
        if (!err) {
            console.log('MongoDB connection Succeeded')
        } else {
            console.log('Error in DB connection:' + err)
        }
    }
)
require('./employee.model')
