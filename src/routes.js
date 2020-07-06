const express = require("express");
const path = require('path')
const routes = express.Router();

const EventController = require('./controllers/EventController');
const PlaceController = require('./controllers/PlaceController');
const SessionController = require('./controllers/SessionController');
const BookingController = require('./controllers/BookingController');
const UserController = require('./controllers/UserController');

const authMiddleware = require('./middlewares/auth');

// Places Routes
routes.post('/registerPlace', PlaceController.store); // Register a new place
routes.get('/registeredPlaces', PlaceController.index); // Show registered places
routes.delete('/registeredPlaces/:id', PlaceController.delete); // Delete a specific place
routes.get('/deleteAllPlaces', PlaceController.deleteAll); // Delete all places

// Events Routes
routes.post('/registerEvent', EventController.store); // Register a new event
routes.get('/registeredEvents', EventController.index); // Show registered events
routes.delete('/registeredEvents/:id', EventController.delete); // Delete a specific event
routes.get('/deleteAllEvents', EventController.deleteAll); // Delete all events
routes.post('/givenPlaceReturnEvents', EventController.showEvent); // Show events in this place

// Session Routes
routes.post('/sessions', SessionController.store); // Sign Up a new user
routes.get('/sessions', SessionController.index); // Show all users in db
routes.delete('/sessions/:id', SessionController.delete); // Delete a specific user
routes.get('/deleteAllUsers', SessionController.deleteAll); // Delete all users
routes.post('/authenticate', SessionController.authenticate); // Sign In

// Booking Routes
routes.get('/booking', BookingController.index);
routes.post('/booking', BookingController.store); // Make a booking
routes.delete('/booking/:id', BookingController.delete); // Delete a specific booking
routes.get('/deleteAllBookings', BookingController.deleteAll);
routes.post('/bookingQty', BookingController.getQuantity);


routes.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'))
});


// Restrict Area
routes.use(authMiddleware);
routes.get('/user', UserController.getId);


module.exports = routes