const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const connectionUrl = process.env.CONNECTION_URL

app.use(express.json());
app.use(cors)

// MODEL
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
// Create a new user
router.post('/create', async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = new User({ name, email });
      await user.save();
      res.json({ message: 'User created successfully', user });
    } catch (err) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });  

// Get all users
router.get('/users', async(req, res, next) => {
    try {
        const user = await User.find()
        if(!user) return res.json("NO User found")
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

app.use("/", router)

mongoose.connect(connectionUrl).then(()=>{
    console.log("Connected to MongoDB")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
