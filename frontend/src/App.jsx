import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/create-ticket"
                    element={<CreateTicket />}
                />

                <Route
                    path="/tickets/:ticket_id"
                    element={<TicketDetails />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;