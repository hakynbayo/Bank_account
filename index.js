require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const { check } = require('express-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Define validation rules using express-validator
const validateParams = [
  check('departureAirport').isLength({ min: 3 }),
  check('arrivalAirport').isLength({ min: 3 }),
  check('date').isISO8601(),
];

// Swagger documentation 
const options = {
  definition: {
    info: {
      title: 'Flight Search API',
      version: '1.0.0',
    },
  },
  apis: ['index.js'], // The file containing your API routes
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /search-flights:
 *   get:
 *     summary: Search for flights.
 *     parameters:
 *       - name: departureAirport
 *         in: query
 *         required: true
 *         description: Departure airport code.
 *       - name: arrivalAirport
 *         in: query
 *         required: true
 *         description: Arrival airport code.
 *       - name: date
 *         in: query
 *         required: true
 *         description: Date of the flight.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example: { "flights": [] }
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */


// API endpoint for flight search
app.get('/search-flights', validateParams, async (req, res) => {
  try {
    const { departureAirport, arrivalAirport, date } = req.query;

    // Make API request to Flight Radar API (example)
    const response = await axios.get('https://flight-radar1.p.rapidapi.com/airports/list', {
      params: {
        departure: departureAirport,
        arrival: arrivalAirport,
        date: date,
        apiKey: process.env.RAPIDAPI_API_KEY, // Use the environment variable
      },
      headers: {
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY, // Use the environment variable
      },
    });

    // Process the response and extract relevant flight data
    const flightData = response.data;

    // Return flight data as JSON response
    res.json({ flights: flightData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

