import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Defining the cinema data structure
interface Cinema {
    id: string;
    seats: {
      [seatNumber: string]: boolean;
    };
  }

// Create an in-memory database to store the cinemas
const cinemas: { [cinemaId: string]: Cinema } = {};


// DefiningC the API endpoints

// Creating a new cinema with N seats
app.post('/cinemas', (req: Request, res: Response) => {
    const numSeats: number = req.body.numSeats;
  
    if (numSeats <= 0) {
      return res.status(400).json({ error: 'Invalid number of seats' });
    }
  
    const cinemaId = `Cinema-${Date.now()}`;
    const seats: { [seatNumber: string]: boolean } = {};
  
    for (let i = 1; i <= numSeats; i++) {
      seats[i.toString()] = false;
    }
  
    cinemas[cinemaId] = { id: cinemaId, seats };
  
    return res.json({ cinemaId });
  });


To create a web API with Node.js using TypeScript for a Cinema Ticket Purchasing Platform, you can follow the steps below:

Step 1: Set up the Project

Create a new directory for your project and navigate into it.
Initialize a new Node.js project by running the following command:
csharp
Copy code
npm init -y
Install the required dependencies by running the following command:
css
Copy code
npm install express body-parser
Create a new file named index.ts which will serve as the entry point for your application.
Step 2: Implement the API Endpoints
In the index.ts file, you can start by importing the necessary modules and setting up the basic server structure. Here's an example of how it can be done:

typescript
Copy code
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Define the cinema data structure
interface Cinema {
  id: string;
  seats: {
    [seatNumber: string]: boolean;
  };
}

// Create an in-memory database to store the cinemas
const cinemas: { [cinemaId: string]: Cinema } = {};

// Define the API endpoints
app.post('/cinemas', (req: Request, res: Response) => {
  // Create a new cinema with N seats
  const numSeats: number = req.body.numSeats;

  if (numSeats <= 0) {
    return res.status(400).json({ error: 'Invalid number of seats' });
  }

  const cinemaId = `Cinema-${Date.now()}`;
  const seats: { [seatNumber: string]: boolean } = {};

  for (let i = 1; i <= numSeats; i++) {
    seats[i.toString()] = false;
  }

  cinemas[cinemaId] = { id: cinemaId, seats };

  return res.json({ cinemaId });
});

app.post('/cinemas/:cinemaId/purchase', (req: Request, res: Response) => {
  // Purchase a specific seat in a cinema
  const cinemaId: string = req.params.cinemaId;
  const seatNumber: string = req.body.seatNumber;

  const cinema = cinemas[cinemaId];

  if (!cinema) {
    return res.status(404).json({ error: 'Cinema not found' });
  }

  const seatExists = cinema.seats.hasOwnProperty(seatNumber);
  const seatAvailable = cinema.seats[seatNumber] === false;

  if (!seatExists || !seatAvailable) {
    return res.status(400).json({ error: 'Invalid seat' });
  }

  // Mark the seat as purchased
  cinema.seats[seatNumber] = true;

  return res.json({ seat: seatNumber });
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
