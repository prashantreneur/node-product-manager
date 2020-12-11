const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/items", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log("Database Connected");
    }).catch((e) => {
        console.log("Connection Error");
        console.log(e);
    })