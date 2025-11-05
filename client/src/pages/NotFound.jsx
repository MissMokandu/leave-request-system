import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const navigationOptions = [
    { path: "/", label: "Home Page", description: "Go to the main page" },
    { path: "/login", label: "Login", description: "Sign in to your account" },
    { path: "/register", label: "Register", description: "Create a new account" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="text-center max-w-2xl">
        {/* Illustration/Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
        </p>

        {/* Quick Actions */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors mr-6"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Alternative Navigation Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="space-y-3">
            {navigationOptions.map((option) => (
              <div key={option.path} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-left">
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                <Link
                  to={option.path}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                >
                  Visit →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-sm text-gray-500">
          Need help? <span className="text-blue-600">Contact support</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
