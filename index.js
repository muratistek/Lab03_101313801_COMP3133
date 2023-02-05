const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json());

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://murat96:123456murka@cluster0.okt8nyq.mongodb.net/w2023_comp3133?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(restaurantRouter);

app.listen(8082, () => { console.log('Server is running...') });