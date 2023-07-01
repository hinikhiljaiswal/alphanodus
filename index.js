"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Create an in-memory database to store the cinemas
const cinemas = {};
// Define the API endpoints
// Creating a new cinema with N seats
app.post('/cinemas', (req, res) => {
    // Create a new cinema with N seats
    const numSeats = req.body.numSeats;
    if (numSeats <= 0) {
        return res.status(400).json({ error: 'Invalid number of seats' });
    }
    const cinemaId = `Cinema-${Date.now()}`;
    const seats = {};
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
