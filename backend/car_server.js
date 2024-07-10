// import the express module to create the server
const express = require('express');

// import the fs (file system) module to handle file operations
const fs = require('fs');

// create an instance of express
const app = express();

// set the port for the server to listen on
const port = process.env.PORT || 8080;

// use express.json middleware to parse json bodies in requests
app.use(express.json());

// define the name of the file where car data will be stored
const carsFile = 'cars.json';

// function to get the list of cars from the file
function getCars() {
  try {
    // read the content of the cars file
    const content = fs.readFileSync(carsFile);
    // parse the content and return as an array
    return JSON.parse(content);
  }
  // if the file doesn't exist
  catch (e) {
    // create file and return an empty array
    fs.writeFileSync(carsFile, '[]');
    return [];
  }
}

// function to save the list of cars to the file
function saveCars(cars) {
  // write the cars array to the file as a json string
  fs.writeFileSync(carsFile, JSON.stringify(cars));
}

// handle GET requests to retrieve all cars
app.get('/api', (req, res) => {
  // get the list of cars
  const cars = getCars();
  // respond with the list of cars as json
  res.json(cars);
});

// handle POST requests to add a new car
app.post('/api', (req, res) => {
  // get the current list of cars
  const cars = getCars();

  // create new car object
  const newCar = {
    // get the new car data from the request body
    id: cars.length ? cars[cars.length - 1].id + 1 : 1,
    // assign an id to the new car (incremental id)
    ...req.body
  };

  // add the new car to the list
  cars.push(newCar);
  // save the updated list of cars
  saveCars(cars);
  // respond with a success message and the new car data
  res.json({ message: 'Car added successfully', car: newCar });
});

// handle DELETE requests to delete a car by id
app.delete('/api/:id', (req, res) => {
  // get the current list of cars
  const cars = getCars();
  // get the car id from the request parameters and parse it as an integer
  const carId = parseInt(req.params.id, 10);
  // find the index of the car with the given id
  const carIndex = cars.findIndex(car => car.id === carId);

  // check if the car is found to delete from list
  if (carIndex > -1) {
    // remove the car from the list
    cars.splice(carIndex, 1);
    // save the updated list of cars
    saveCars(cars);
    // respond with a success message
    res.json({ message: 'Car deleted successfully' });
  } else {
    // respond with a 404 status and error message if car not found
    res.status(404).json({ message: 'Car not found' });
  }
});

// handle PUT requests to update a car's details by id
app.put('/api/:id', (req, res) => {
  // get the current list of cars
  const cars = getCars();
  // get the car id from the request parameters and parse it as an integer
  const carId = parseInt(req.params.id, 10);
  // find the index of the car with the given id
  const carIndex = cars.findIndex(car => car.id === carId);

  // check if the car is found to update details
  if (carIndex > -1) {
    // merge the existing car data with the new data from the request body
    const updatedCar = { ...cars[carIndex], ...req.body };
    // update the car in the list
    cars[carIndex] = updatedCar;
    // save the updated list of cars
    saveCars(cars);
    // respond with a success message and the updated car data
    res.json({ message: 'Car updated successfully', car: updatedCar });
  } else {
    // respond with a 404 status and error message if car not found
    res.status(404).json({ message: 'Car not found' });
  }
});

// handle GET requests to retrieve a specific car by id
app.get('/api/:id', (req, res) => {
  // get the current list of cars
  const cars = getCars();
  // get the car id from the request parameters and parse it as an integer
  const carId = parseInt(req.params.id, 10);
  // find the car with the given id
  const car = cars.find(car => car.id === carId);

  // check if the car is found
  if (car) {
    // respond with the car details as json
    res.json(car);
  } else {
    // respond with a 404 status and error message if car not found
    res.status(404).json({ message: 'Car not found' });
  }
});

// start the server and listen on the allocated port
app.listen(port, () => {
  // log a message to the console indicating the server is running
  console.log(`Server running on http://localhost:${port}`);
});