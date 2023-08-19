FLIGHT-SEARCH-API

This code is an example of an Express.js server that provides an API endpoint for searching flights using the RapidAPI service. It follows the structure of a standard Express.js application and uses the express-validator library for route parameter validation. Here's an explanation of each section of the code:

Environment Variables: Using environment variables to store sensitive information, like API keys, is a good security practice. It keeps such information separate from the codebase and allows for easy configuration.

Express and Middleware: Using Express.js simplifies building APIs. Middleware like express.json() helps parse JSON data in requests, and express-validator streamlines parameter validation.

Validation: Implementing validation helps ensure that the data provided to the API is correct and prevents potential issues down the line.

Error Handling: The try...catch block around the API request handles errors gracefully and provides meaningful error responses to clients.

API Key Usage: The code correctly uses the RapidAPI key as a header in the request. Storing the key in an environment variable enhances security.

CHALLENGE:
API Rate Limits: The  RapidAPI has rate limits, managing and adhering to these limits is important to ensure the API is available consistently. The limitation is a hinderence as i had to limit the number of tests i could run.

