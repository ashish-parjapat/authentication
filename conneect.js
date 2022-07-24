const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser: true
}).then(() => {
    console.log("successfuly connected to mongodb")
}).catch((e) => {
    console.log(e)
})