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



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
