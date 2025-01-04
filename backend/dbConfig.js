const mongoose = require("mongoose");
require("dotenv").config()
const dbConnect = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL);
        if (res) {
            console.log("DB connected for:- Blood Reservation");
        } else {
            console.error("issue in connecting to dv")
        }
    } catch (err) {
        console.log(err.message);
    }

}
module.exports = dbConnect;
