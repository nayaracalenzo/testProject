require("dotenv").config();

const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasksRouter');
const { sequelize } = require("./models");
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

sequelize.sync()
    .then(() => {
        console.log();
    })
    .catch(err => {
        console.log("Olha o erro: ", err);
    })

app.listen(PORT, () => console.log(`Server running on ${PORT}`));