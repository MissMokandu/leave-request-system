import { useState, useEffect } from "react";

function AdminDashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockRequests = [
          { id: 1, employee: "Alice Johnson", type: "Sick Leave", date: "2025-11-10", status: "Pending", employeeId: "EMP001" },
          { id: 2, employee: "Bob Smith", type: "Vacation", date: "2025-11-15", status: "Pending", employeeId: "EMP002" },
          { id: 3, employee: "Charlie Brown", type: "Personal", date: "2025-11-20", status: "Approved", employeeId: "EMP003" },
          { id: 4, employee: "Diana Prince", type: "Emergency", date: "2025-11-25", status: "Rejected", employeeId: "EMP004" },
        ];
        setRequests(mockRequests);
        setLoading(false);
      }, 1000);
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    // Simulate API call
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    
    // Here you would typically make an API call to update the status
    console.log(`Updated request ${id} to ${newStatus}`);
  };

  const filteredRequests = requests.filter(req => 
    filter === "all" ? true : req.status.toLowerCase() === filter
  );

  const stats = {
    total: requests.length,
    pending: requests.filter(req => req.status === "Pending").length,
    approved: requests.filter(req => req.status === "Approved").length,
    rejected: requests.filter(req => req.status === "Rejected").length,
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-500",
      Approved: "bg-green-500",
      Rejected: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Requests</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-yellow-600 text-sm">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-green-600 text-sm">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <h3 className="text-red-600 text-sm">Rejected</h3>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>

      {/* Leave Requests Section */}
      <section className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {["all", "pending", "approved", "rejected"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    filter === filterType
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-medium text-gray-600">Employee</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{req.employee}</p>
                        <p className="text-sm text-gray-500">{req.employeeId}</p>
                      </div>
                    </td>
                    <td className="p-4">{req.type}</td>
                    <td className="p-4">{req.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(req.status)}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {req.status === "Pending" && (
                          <>
                            <button
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                              onClick={() => updateStatus(req.id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                              onClick={() => updateStatus(req.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {req.status !== "Pending" && (
                          <span className="text-gray-400 text-sm">Completed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
