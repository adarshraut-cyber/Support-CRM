const Ticket = require("../models/Ticket");
const Note = require("../models/note");
// CREATE TICKET
const createTicket = async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            subject,
            description
        } = req.body;

        // Validate required fields
        if (
            !customer_name ||
            !customer_email ||
            !subject ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find the latest ticket
        const lastTicket = await Ticket.findOne()
            .sort({ createdAt: -1 });

        let nextNumber = 1;

        if (lastTicket) {
            const lastNumber = parseInt(
                lastTicket.ticket_id.replace("TKT-", "")
            );

            nextNumber = lastNumber + 1;
        }

        // Generate ticket ID
        const ticket_id = `TKT-${String(nextNumber).padStart(3, "0")}`;

        // Create ticket
        const ticket = await Ticket.create({
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description
        });

        res.status(201).json({
            ticket_id: ticket.ticket_id,
            created_at: ticket.createdAt
        });

    } catch (error) {
        console.error("Create ticket error:", error);

        res.status(500).json({
            message: "Failed to create ticket"
        });
    }
};


// GET ALL TICKETS
// Supports search and status filter
const getTickets = async (req, res) => {
    try {
        const { status, search } = req.query;

        const filter = {};

        // Filter by status
        if (status) {
            filter.status = status;
        }

        // Search
        if (search) {
            filter.$or = [
                {
                    ticket_id: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    customer_name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    customer_email: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const tickets = await Ticket.find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json(tickets);

    } catch (error) {
        console.error("Get tickets error:", error);

        res.status(500).json({
            message: "Failed to fetch tickets"
        });
    }
};

// GET SINGLE TICKET
const getTicketById = async (req, res) => {
    try {
        const { ticket_id } = req.params;

        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        const notes = await Note.find({ ticket_id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            ticket_id: ticket.ticket_id,
            customer_name: ticket.customer_name,
            customer_email: ticket.customer_email,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
            notes: notes.map((note) => ({
                note_text: note.note_text,
                created_at: note.createdAt
            }))
        });

    } catch (error) {
        console.error("Get ticket error:", error);

        res.status(500).json({
            message: "Failed to fetch ticket"
        });
    }
};

// UPDATE TICKET
const updateTicket = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const { status, notes } = req.body;

        // Find ticket
        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        // Update status if provided
        if (status) {
            const allowedStatuses = [
                "Open",
                "In Progress",
                "Closed"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }

            ticket.status = status;
        }

        // Save ticket
        await ticket.save();

        // Add note if provided
        if (notes && notes.trim() !== "") {
            await Note.create({
                ticket_id: ticket.ticket_id,
                note_text: notes
            });
        }

        res.status(200).json({
            success: true,
            updated_at: ticket.updatedAt
        });

    } catch (error) {
        console.error("Update ticket error:", error);

        res.status(500).json({
            message: "Failed to update ticket"
        });
    }
};

// EXPORT CONTROLLERS
module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket
};