import { useState, useEffect } from "react";
import api from "../api";

function EmployeeDashboard({ user }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        // Replace with actual API call when backend route is ready
        // const res = await api.get('/my-leave-requests');
        // setLeaveRequests(res.data);
        
        // Mock data for now
        setTimeout(() => {
          const mockRequests = [
            { id: 1, type: "Sick Leave", startDate: "2025-11-10", endDate: "2025-11-12", status: "Approved" },
            { id: 2, type: "Vacation", startDate: "2025-12-15", endDate: "2025-12-20", status: "Pending" },
            { id: 3, type: "Personal", startDate: "2025-10-05", endDate: "2025-10-05", status: "Rejected" },
          ];
          setLeaveRequests(mockRequests);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API call when backend route is ready
      // const res = await api.post('/leave-requests', newRequest);
      // setLeaveRequests([res.data, ...leaveRequests]);
      
      // Mock submission for now
      const request = {
        id: leaveRequests.length + 1,
        type: newRequest.type,
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        status: "Pending",
        reason: newRequest.reason
      };
      
      setLeaveRequests([request, ...leaveRequests]);
      setNewRequest({ type: "Sick Leave", startDate: "", endDate: "", reason: "" });
      setShowRequestForm(false);
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-[#D4A574]",
      Approved: "bg-[#8B9A7A]",
      Rejected: "bg-[#B85450]"
    };
    return colors[status] || "bg-[#8B9A7A]";
  };

  const pendingRequests = leaveRequests.filter(req => req.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#F5F3F0] p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#6B5B73]">Employee Dashboard</h1>
        <p className="text-[#8B9A7A]">Welcome back, {user?.name || 'Employee'}!</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#8B9A7A] text-sm">Total Requests</h3>
          <p className="text-2xl font-bold text-[#6B5B73]">{leaveRequests.length}</p>
        </div>
        <div className="bg-[#F9F7F4] p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#D4A574] text-sm">Pending</h3>
          <p className="text-2xl font-bold text-[#D4A574]">{pendingRequests}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-[#E8E2D4]">
          <h3 className="text-[#8B9A7A] text-sm">Approved</h3>
          <p className="text-2xl font-bold text-[#6B5B73]">
            {leaveRequests.filter(req => req.status === "Approved").length}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-[#8B9A7A] text-white px-6 py-3 rounded-lg hover:bg-[#6B5B73] transition-colors font-semibold"
        >
          + New Leave Request
        </button>
      </div>

      {/* Leave Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-[#E8E2D4]">
            <h2 className="text-xl font-bold mb-4 text-[#6B5B73]">New Leave Request</h2>
            <form onSubmit={handleSubmitRequest}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B73] mb-1">
                    Leave Type
                  </label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                    className="w-full p-2 border border-[#D4C5B9] rounded-md focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A]"
                    required
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Personal">Personal</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B5B73] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                    className="w-full p-2 border border-[#D4C5B9] rounded-md focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B5B73] mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                    className="w-full p-2 border border-[#D4C5B9] rounded-md focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B5B73] mb-1">
                    Reason
                  </label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    className="w-full p-2 border border-[#D4C5B9] rounded-md focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A]"
                    rows="3"
                    placeholder="Brief reason for leave..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#8B9A7A] text-white py-2 rounded-md hover:bg-[#6B5B73] transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 bg-[#E8E2D4] text-[#6B5B73] py-2 rounded-md hover:bg-[#D4C5B9] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Requests Table */}
      <section className="bg-white rounded-lg shadow border border-[#E8E2D4]">
        <div className="p-6 border-b border-[#E8E2D4]">
          <h2 className="text-xl font-semibold text-[#6B5B73]">My Leave Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#F5F3F0] border-b border-[#E8E2D4]">
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Type</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Start Date</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">End Date</th>
                <th className="p-4 text-left text-sm font-medium text-[#6B5B73]">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-[#8B9A7A]">
                    No leave requests yet
                  </td>
                </tr>
              ) : (
                leaveRequests.map((request) => (
                  <tr key={request.id} className="border-b border-[#E8E2D4] hover:bg-[#F5F3F0]">
                    <td className="p-4 text-[#6B5B73]">{request.type}</td>
                    <td className="p-4 text-[#6B5B73]">{request.startDate}</td>
                    <td className="p-4 text-[#6B5B73]">{request.endDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
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

export default EmployeeDashboard;