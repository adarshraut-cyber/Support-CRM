import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function TicketDetails() {
    const { ticket_id } = useParams();

    const [ticket, setTicket] = useState(null);
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch ticket
    const fetchTicket = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch
            (`${import.meta.env.VITE_API_URL}/api/tickets/${ticket_id}`

            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch ticket"
                );
            }

            setTicket(data);
            setStatus(data.status);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [ticket_id]);


    // Update ticket
    const handleUpdate = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await fetch
            (`${import.meta.env.VITE_API_URL}/api/tickets/${ticket_id}`, 
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: status,
                        notes: note
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update ticket"
                );
            }

            setSuccess("Ticket updated successfully.");

            // Clear note after saving
            setNote("");

            // Reload ticket
            await fetchTicket();

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return (
            <div className="container">
                <p>Loading ticket...</p>
            </div>
        );
    }


    if (error && !ticket) {
        return (
            <div className="container">

                <h2>Error</h2>

                <p className="error-message">
                    {error}
                </p>

                <Link to="/">
                    ← Back to Dashboard
                </Link>

            </div>
        );
    }


    if (!ticket) {
        return null;
    }


    return (
        <div className="dashboard">

            {/* Navbar */}

            <header className="navbar">

                <h2>Support CRM</h2>

                <Link to="/">
                    ← Dashboard
                </Link>

            </header>


            <main className="details-container">

                {/* Header */}

                <div className="details-header">

                    <div>

                        <Link to="/" className="back-link">
                            ← Back to tickets
                        </Link>

                        <h1>
                            {ticket.ticket_id}
                        </h1>

                        <p>
                            Ticket Details
                        </p>

                    </div>

                    <div className="status-badge">
                        {ticket.status}
                    </div>

                </div>


                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* Customer Information */}

                <section className="details-card">

                    <h2>Customer Information</h2>

                    <div className="customer-grid">

                        <div>
                            <span className="detail-label">
                                Customer Name
                            </span>

                            <p>
                                {ticket.customer_name}
                            </p>
                        </div>

                        <div>
                            <span className="detail-label">
                                Email
                            </span>

                            <p>
                                {ticket.customer_email}
                            </p>
                        </div>

                    </div>

                </section>


                {/* Ticket Information */}

                <section className="details-card">

                    <h2>Issue Details</h2>

                    <div className="detail-section">

                        <span className="detail-label">
                            Subject
                        </span>

                        <p className="subject">
                            {ticket.subject}
                        </p>

                    </div>


                    <div className="detail-section">

                        <span className="detail-label">
                            Description
                        </span>

                        <p className="description">
                            {ticket.description}
                        </p>

                    </div>

                </section>


                {/* Update Ticket */}

                <section className="details-card">

                    <h2>Update Ticket</h2>

                    <div className="update-form">

                        <div>

                            <label>
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="Open">
                                    Open
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Closed">
                                    Closed
                                </option>

                            </select>

                        </div>


                        <div>

                            <label>
                                Add Note
                            </label>

                            <textarea
                                value={note}
                                onChange={(e) =>
                                    setNote(e.target.value)
                                }
                                placeholder="Add a note about this ticket..."
                                rows="4"
                            />

                        </div>


                        <button
                            onClick={handleUpdate}
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Ticket"}
                        </button>

                    </div>

                </section>


                {/* Notes */}

                <section className="details-card">

                    <h2>
                        Notes ({ticket.notes?.length || 0})
                    </h2>

                    {ticket.notes &&
                    ticket.notes.length > 0 ? (

                        <div className="notes-list">

                            {ticket.notes.map(
                                (item, index) => (

                                    <div
                                        className="note"
                                        key={index}
                                    >

                                        <p>
                                            {item.note_text}
                                        </p>

                                        <small>
                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}
                                        </small>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="no-notes">
                            No notes added yet.
                        </p>

                    )}

                </section>

            </main>

        </div>
    );
}

export default TicketDetails;