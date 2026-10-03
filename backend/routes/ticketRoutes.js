const express = require("express");

const router = express.Router();

const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket
} = require("../controllers/ticketController");

// Create ticket
router.post("/", createTicket);

// Get all tickets
router.get("/", getTickets);

// Get single ticket
router.get("/:ticket_id", getTicketById);

// Update ticket
router.put("/:ticket_id", updateTicket);

module.exports = router;