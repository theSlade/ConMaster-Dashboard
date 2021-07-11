require("dotenv").config();
require("./strategies/discord")
const express = require('express');
const app = express();
const routes = require("./routes")
const passport = require('passport')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.info("MongoDB ✅"));

app.use( passport.initialize() );
app.use( passport.session() );

app.use("/api", routes)



app.listen(process.env.PORT, () => console.info("Server is up and running on port " + process.env.PORT))
