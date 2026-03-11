import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Send, Book, HeartPulse, LifeBuoy } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/journal", label: "Journal", icon: Book },
    { path: "/analytics", label: "Analytics", icon: Send },
    { path: "/tools", label: "Tools", icon: HeartPulse },
    { path: "/resources", label: "Resources", icon: LifeBuoy },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity size={24} color="var(--accent-blue)" />
        MentalHub
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="flex justify-between items-center px-4">
          <span className="text-sm text-muted font-medium">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
