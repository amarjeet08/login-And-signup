const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDb database')
    })
    .catch((err) => {
        console.log('Error connecting', err)
    })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema)


//Routes

app.post("/login", (req, res) => {
    const { email, password } = req.body

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login successful", user: user })
                } else {
                    res.send({ message: "Password didn't matche" })
                }
            } else {
                res.send({ message: "User not found" })
            }
        })
})


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.send({ message: "User already exists" });
            }

            const newUser = new User({
                name,
                email,
                password
            });

            newUser.save()
                .then(() => {
                    res.send({ message: "User created" });
                })
                .catch((err) => {
                    console.log(err.message);
                    res.status(500).send({ error: "Internal Server Error" });
                });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ error: "Internal Server Error" });
        });
});

app.listen(9002, () => {
    console.log('Server running on port 9002')
})