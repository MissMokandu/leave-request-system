import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/");
  };

  const getDashboardPath = () => {
    return user?.role === "admin" ? "/admin-dashboard" : "/employee-dashboard";
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      label: "Dashboard", 
      path: getDashboardPath(),
      visible: true // Always visible when logged in
    },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-xl font-bold cursor-pointer hover:text-blue-200 transition-colors"
          onClick={() => navigate(getDashboardPath())}
        >
          LeaveManager
          <span className="text-sm font-normal ml-2 text-blue-200">
            ({user?.role || 'user'})
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            item.visible && (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 rounded transition-colors ${
                  isActiveRoute(item.path)
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            )
          ))}
          
          {/* User info & Logout */}
          <div className="flex items-center space-x-4 border-l border-blue-500 pl-4">
            <span className="text-sm text-blue-200">
              {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;