import { useState } from "react";

function EmployeeDashboard({ user }) {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: "Sick Leave", startDate: "2025-11-10", endDate: "2025-11-12", status: "Approved" },
    { id: 2, type: "Vacation", startDate: "2025-12-15", endDate: "2025-12-20", status: "Pending" },
    { id: 3, type: "Personal", startDate: "2025-10-05", endDate: "2025-10-05", status: "Rejected" },
  ]);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleSubmitRequest = (e) => {
    e.preventDefault();
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
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-500",
      Approved: "bg-green-500",
      Rejected: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const pendingRequests = leaveRequests.filter(req => req.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Employee'}!</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Requests</h3>
          <p className="text-2xl font-bold">{leaveRequests.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-yellow-600 text-sm">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Approved</h3>
          <p className="text-2xl font-bold">
            {leaveRequests.filter(req => req.status === "Approved").length}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          + New Leave Request
        </button>
      </div>

      {/* Leave Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Leave Request</h2>
            <form onSubmit={handleSubmitRequest}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Personal">Personal</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Brief reason for leave..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Requests Table */}
      <section className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">My Leave Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Start Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">End Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    No leave requests yet
                  </td>
                </tr>
              ) : (
                leaveRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{request.type}</td>
                    <td className="p-4">{request.startDate}</td>
                    <td className="p-4">{request.endDate}</td>
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
