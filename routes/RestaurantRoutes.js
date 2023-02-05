const express = require('express');
const restaurantModel = require('../models/Restaurant')
const app = express();

// return all restaurant details OR pick certain columns and sort by restaurant_id (if provided query param) 
app.get('/restaurants', async (req, res) => {
  const sort = req.query.sortBy
  let restaurants;
  if (sort) {
    restaurants = await restaurantModel.find({}).select("cuisine name city restaurant_id").sortByRestaurantId(sort === "ASC" ? -1 : 1)
  }
  else {
    restaurants = await restaurantModel.find({})
  }

  try {
    res.status(200).send(restaurants)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// return all restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisineName', async (req, res) => {
  const cuisineName = req.params.cuisineName
  const restaurants = await restaurantModel.find({ cuisine: cuisineName })

  try {
    if (restaurants.length != 0) {
      res.send(restaurants)
    }
    else {
      res.send(JSON.stringify({ status: false, message: "No data found" }))
    }
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// use path param
app.get('/restaurants/Delicatessen', async (req, res) => {
  const restaurants = await restaurantModel.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } }, 'cuisine name city', { sort: { name: 1 } })
  console.log(restaurants)

  try {
    res.send(restaurants)
  }
  catch (err) {
    res.status(500).send(err)
  }
})



module.exports = app