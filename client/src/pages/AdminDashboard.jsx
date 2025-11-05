import { useState, useEffect } from "react";
import api from "../api";

function AdminDashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        // Replace with actual API call when backend route is ready
        // const res = await api.get('/leave-requests');
        // setRequests(res.data);
        
        // Mock data for now
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
      } catch (err) {
        console.error('Error fetching requests:', err);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // Replace with actual API call when backend route is ready
      // await api.put(`/leave-requests/${id}`, { status: newStatus });
      
      // Update local state
      const updated = requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      );
      setRequests(updated);
    } catch (err) {
      console.error('Error updating request:', err);
    }
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
      Pending: "bg-[#D4A574]",
      Approved: "bg-[#8B9A7A]",
      Rejected: "bg-[#B85450]"
    };
    return colors[status] || "bg-[#8B9A7A]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center">
        <div className="text-xl text-[#6B5B73]">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3F0] p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#6B5B73]">Admin Dashboard</h1>
        <p className="text-[#8B9A7A]">Welcome back, {user?.name || 'Admin'}</p>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#8B9A7A] text-sm">Total Requests</h3>
          <p className="text-2xl font-bold text-[#6B5B73]">{stats.total}</p>
        </div>
        <div className="bg-[#F9F7F4] p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#D4A574] text-sm">Pending</h3>
          <p className="text-2xl font-bold text-[#D4A574]">{stats.pending}</p>
        </div>
        <div className="bg-[#F4F6F2] p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#8B9A7A] text-sm">Approved</h3>
          <p className="text-2xl font-bold text-[#8B9A7A]">{stats.approved}</p>
        </div>
        <div className="bg-[#F7F2F2] p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#B85450] text-sm">Rejected</h3>
          <p className="text-2xl font-bold text-[#B85450]">{stats.rejected}</p>
        </div>
      </div>

      {/* Leave Requests Section */}
      <section className="bg-white rounded-lg shadow border border-[#E8E2D4]">
        <div className="p-6 border-b border-[#E8E2D4]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-[#6B5B73]">Leave Requests</h2>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {["all", "pending", "approved", "rejected"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    filter === filterType
                      ? "bg-[#8B9A7A] text-white"
                      : "bg-[#E8E2D4] text-[#6B5B73] hover:bg-[#D4C5B9]"
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
              <tr className="bg-[#F5F3F0] border-b border-[#E8E2D4]">
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Employee</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Type</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Date</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Status</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#8B9A7A]">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-[#E8E2D4] hover:bg-[#F5F3F0]">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-[#6B5B73]">{req.employee}</p>
                        <p className="text-sm text-[#8B9A7A]">{req.employeeId}</p>
                      </div>
                    </td>
                    <td className="p-4 text-[#6B5B73]">{req.type}</td>
                    <td className="p-4 text-[#6B5B73]">{req.date}</td>
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
                              className="px-3 py-1 bg-[#8B9A7A] text-white rounded hover:bg-[#6B5B73] transition-colors text-sm"
                              onClick={() => updateStatus(req.id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="px-3 py-1 bg-[#B85450] text-white rounded hover:bg-[#A04A46] transition-colors text-sm"
                              onClick={() => updateStatus(req.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {req.status !== "Pending" && (
                          <span className="text-[#8B9A7A] text-sm">Completed</span>
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