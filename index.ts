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

// DefiningC the API endpoints //

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

// Purchase a specific seat in a cinema
  app.post('/cinemas/:cinemaId/purchase', (req: Request, res: Response) => {
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

  // Purchase the first two free consecutive seats in a cinema

  app.post('/cinemas/:cinemaId/purchase/consecutive', (req: Request, res: Response) => {
    const cinemaId: string = req.params.cinemaId;
  
    const cinema = cinemas[cinemaId];
  
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }
  
    const seats = Object.entries(cinema.seats);
    const consecutiveSeats: string[] = [];
  
    for (let i = 0; i < seats.length - 1; i++) {
      if (cinema.seats[seats[i][0]] === false && cinema.seats[seats[i + 1][0]] === false) {
        consecutiveSeats.push(seats[i][0], seats[i + 1][0]);
        break;
      }
    }
  
    if (consecutiveSeats.length !== 2) {
      return res.status(400).json({ error: 'No consecutive seats available' });
    }
  
    // Mark the consecutive seats as purchased
    cinema.seats[consecutiveSeats[0]] = true;
    cinema.seats[consecutiveSeats[1]] = true;
  
    return res.json({ seats: consecutiveSeats });
  });



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
