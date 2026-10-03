import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateTicket() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch
            (`${import.meta.env.VITE_API_URL}/api/tickets`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create ticket"
                );
            }

            setMessage(
                `Ticket created successfully: ${data.ticket_id}`
            );

            // Clear form
            setFormData({
                customer_name: "",
                customer_email: "",
                subject: "",
                description: ""
            });

            // Go to ticket after a short delay
            setTimeout(() => {
                navigate(`/tickets/${data.ticket_id}`);
            }, 1000);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">

            <header className="navbar">
                <h2>Support CRM</h2>

                <Link to="/">
                    ← Back to Dashboard
                </Link>
            </header>

            <main className="form-container">

                <div className="form-card">

                    <h1>Create New Ticket</h1>

                    <p>
                        Enter the customer's issue details below.
                    </p>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Customer Name
                            </label>

                            <input
                                type="text"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleChange}
                                placeholder="Enter customer name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Customer Email
                            </label>

                            <input
                                type="email"
                                name="customer_email"
                                value={formData.customer_email}
                                onChange={handleChange}
                                placeholder="Enter customer email"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter ticket subject"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the customer's issue..."
                                rows="6"
                                required
                            />

                        </div>


                        <div className="form-actions">

                            <Link
                                to="/"
                                className="cancel-button"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Ticket"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateTicket;