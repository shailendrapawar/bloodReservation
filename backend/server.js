const express = require("express");
const app = express();
const userModel = require("./userModel");
const dbCOnnect = require("./dbConfig")
const cors = require("cors");
require("dotenv").config()

dbCOnnect();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("working")
})

app.post("/register", async (req, res) => {
    try {
        const { name, bloodGroup, age, number } = req.body;
        console.log(req.body)

        const newData = new userModel({
            userName: name,
            userAge: age,
            userNumber: number,
            userBloodGroup: bloodGroup

        })

        const isRegister = await newData.save();
        if (isRegister) {
            res.send({
                msg: "user registered"
            })
        }
    } catch (err) {
        console.log(err.message)
        res.send({
            msg: "internal server error"
        })
    }
})

app.post("/search", async (req, res) => {
    // console.log(req.body);
    try {
        const { bloodGroup } = req.body;
        const dbRes = await userModel.find({ userBloodGroup: bloodGroup });

        if (dbRes) {
            res.status(200).json({
                msg: "doners found",
                doners: dbRes
            })
        }else{
            res.status(200).json({
                msg: "no donars",
                doners:[]
            })
        }

    } catch (err) {
        res.status(200).send({
            msg: "internal server error"
        })
    }
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server listening  " + PORT)
});