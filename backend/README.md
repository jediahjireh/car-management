# Car Management API

This API allows users to manage a list of cars. Users can retrieve the list of cars, add a new car, delete a car by its ID and update the details of a car using HTTP requests.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Postman (for testing the API)

### Installation

1. Clone the repository or download the code.
2. Navigate to the `backend` project directory.
3. Run `npm install` to install the necessary dependencies.
4. Start the server with `npm start`.

### Endpoints

- `GET /api` - Retrieve the list of cars.
- `POST /api` - Add a new car to the list.
- `DELETE /api/:id` - Delete a car by its ID.
- `PUT /api/:id` - Update the details of a car by its ID.

### Testing with Postman

1. **Retrieve the list of cars**:

   - Method: `GET`
   - URL: `http://localhost:8080/api`
   - Click "Send" to retrieve the list of cars.

2. **Add a new car**:

   - Method: `POST`
   - URL: `http://localhost:8080/api`
   - Body (raw JSON):
     ```json
     {
       "id": 3,
       "make": "Mercedes-Benz",
       "model": "C63AMG (2008)",
       "seats": 5
     }
     ```
   - Click "Send" to add the new car.

3. **Delete a car by ID**:

   - Method: `DELETE`
   - URL: `http://localhost:8080/api/:id`
   - Replace `:id` with the ID of the car to delete (e.g. `http://localhost:8080/api/1`).
   - Click "Send" to delete the car.

4. **Update a car's details**:
   - Method: `PUT`
   - URL: `http://localhost:8080/api/:id`
   - Replace `:id` with the ID of the car to update (e.g. `http://localhost:8080/api/3`).
   - Body (raw JSON):
     ```json
     {
       "model": "AMG GT (2015)",
       "seats": 2
     }
     ```
   - Click "Send" to update the car's details.

## Notes

- Ensure the server is running before making requests.
- The car data is stored in a local `cars.json` file.

## Limitations

- The API uses file-based storage, which may not be suitable for production environments.
- Error handling is very basic and should be improved for robustness.
