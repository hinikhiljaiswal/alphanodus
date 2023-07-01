# alphanodus

Run the Application

Transpile the TypeScript code to JavaScript by running the following command:
npx tsc

Start the server by running the following command:
node index.js

Server will run on prot 3000

API'S

1. Create a cinema with N seats:
POST http://localhost:3000/cinemas
Body: { "numSeats": 10 }

2. To purchase a specific seat in a cinema:

POST http://localhost:3000/cinemas/:cinemaId/purchase
Body: { "seatNumber": "2" }

3. To purchase the first two free consecutive seats in a cinema:

POST http://localhost:3000/cinemas/:cinemaId/purchase/consecutive


