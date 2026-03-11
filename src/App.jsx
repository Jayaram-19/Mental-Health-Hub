import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Analytics from "./pages/Analytics";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";

// Maintain old components if needed temporarily inside specific pages.
// e.g. MoodSelector, Insights etc.

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mood" element={<Dashboard />} /> {/* Combined to Dashboard for now */}
            <Route path="/journal" element={<Journal />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;