import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Submit Leave Requests",
      description: "Employees can quickly submit leave requests with just a few clicks."
    },
    {
      title: "Manage Approvals", 
      description: "Admins can easily approve or reject leave requests in real time."
    },
    {
      title: "Track Requests",
      description: "Everyone can track the status of leave requests conveniently."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to LeaveManager
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Easily request and manage leaves for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose LeaveManager?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} LeaveManager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
