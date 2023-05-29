const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { APP_PORT, MONGODB_URI } = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('MongoDB connection error:', error));

// MongoDB schema and model
const todoSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Todo = mongoose.model('Todo', todoSchema);

// API route to insert data into MongoDB
app.post('/data', (req, res) => {
  const { data } = req.body;

  // Inserts the data into the MongoDB collection
  Todo.insertMany(data)
    .then(() => {
      res.status(200).send('Data inserted successfully');
    })
    .catch(error => {
      console.log('Error inserting data into MongoDB:', error);
      res.status(500).send('Error inserting data');
    });
});

// Socket event listener for 'get-data' event
io.on('connection', socket => {
  socket.on('get-data', () => {
    // Retrieves the todos from the MongoDB collection
    Todo.find({})
      .then(todos => {
        // Emits the 'receive-data' event with the todos data
        socket.emit('receive-data', todos);
      })
      .catch(error => {
        console.log('Error retrieving data from MongoDB:', error);
      });
  });
});

// Start the server
server.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
