require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const app = express();

app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(volleyball);
app.use('/brand', require('./src/routes/brandRouter'));
app.use('/category', require('./src/routes/categoryRouter'));

const URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



const server = require('http').createServer(app);

app.get('/', (req, res) => {
  res.json({
    msg: `Hello 🤞😉🤞`
  })
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
});
