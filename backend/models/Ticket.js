const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        ticket_id: {
            type: String,
            unique: true,
            required: true
        },

        customer_name: {
            type: String,
            required: true,
            trim: true
        },

        customer_email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Closed"],
            default: "Open"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);