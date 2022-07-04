require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const playerRoute = require("./routes/player.route")

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))


app.use("/top", playerRoute)





async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            directConnection: true
        }).then(() => console.log("Connected to MongoDB server"))
            .catch((error) => console.log(error));

        app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}`)
        })

    } catch (e) {
        console.log(e.message)
    }
}

start()