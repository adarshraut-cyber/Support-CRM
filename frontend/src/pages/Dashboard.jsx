import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (search.trim()) {
                params.append("search", search);
            }

            if (status) {
                params.append("status", status);
            }

            const API_URL = import.meta.env.VITE_API_URL;

                             const url =
                             `${API_URL}/api/tickets` +
                (params.toString() ? `?${params.toString()}` : "");

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch tickets");
            }

            const data = await response.json();

            setTickets(data);
        } catch (err) {
            console.error(err);
            setError("Unable to connect to the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [search, status]);

    const openTickets = tickets.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === "In Progress"
    ).length;

    const closedTickets = tickets.filter(
        (ticket) => ticket.status === "Closed"
    ).length;

    return (
        <div className="dashboard">

            <header className="navbar">
                <h2>Support CRM</h2>

                <Link to="/create-ticket">
                    + New Ticket
                </Link>
            </header>

            <main className="container">

                <h1>Support Dashboard</h1>

                <p>
                    Manage and track customer support tickets
                </p>

                <div className="stats">

                    <div className="stat-card">
                        <h3>Total Tickets</h3>
                        <strong>{tickets.length}</strong>
                    </div>

                    <div className="stat-card">
                        <h3>Open</h3>
                        <strong>{openTickets}</strong>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <strong>{inProgressTickets}</strong>
                    </div>

                    <div className="stat-card">
                        <h3>Closed</h3>
                        <strong>{closedTickets}</strong>
                    </div>

                </div>

                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">
                            In Progress
                        </option>
                        <option value="Closed">Closed</option>
                    </select>

                </div>

                {loading && <p>Loading tickets...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <table>

                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {tickets.map((ticket) => (
                                <tr key={ticket.ticket_id}>

                                    <td>
                                        {ticket.ticket_id}
                                    </td>

                                    <td>
                                        {ticket.customer_name}
                                    </td>

                                    <td>
                                        {ticket.customer_email}
                                    </td>

                                    <td>
                                        {ticket.subject}
                                    </td>

                                    <td>
                                   <span
                                     className={`status status-${ticket.status
                                       .toLowerCase()
                                         .replace(" ", "-")}`}
                                        >
                                    {ticket.status}
                                      </span>
                                      </td>
                                    <td>
                                     {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/tickets/${ticket.ticket_id}`}
                                        >
                                            View
                                        </Link>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                )}

                {!loading && !error && tickets.length === 0 && (
                    <p>No tickets found.</p>
                )}

            </main>
        </div>
    );
}

export default Dashboard;