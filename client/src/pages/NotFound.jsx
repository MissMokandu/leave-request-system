import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const navigationOptions = [
    { path: "/", label: "Home Page", description: "Go to the main page" },
    { path: "/login", label: "Login", description: "Sign in to your account" },
    { path: "/register", label: "Register", description: "Create a new account" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#E8E2D4] px-4">
      <div className="text-center max-w-2xl">
        {/* Illustration/Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-[#D4C5B9] mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8B9A7A] to-[#6B5B73] mx-auto mb-6"></div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-[#6B5B73] mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-[#8B9A7A] mb-8 max-w-md mx-auto leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
        </p>

        {/* Quick Actions */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-[#8B9A7A] hover:text-[#6B5B73] font-medium transition-colors mr-6"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="bg-[#8B9A7A] text-white px-8 py-3 rounded-lg hover:bg-[#6B5B73] transition-colors font-semibold inline-block"
          >
            Go Home
          </Link>
        </div>

        {/* Alternative Navigation Options */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E2D4] p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-[#6B5B73] mb-4">Quick Links</h3>
          <div className="space-y-3">
            {navigationOptions.map((option) => (
              <div key={option.path} className="flex items-center justify-between p-3 hover:bg-[#F5F3F0] rounded-lg transition-colors">
                <div className="text-left">
                  <div className="font-medium text-[#6B5B73]">{option.label}</div>
                  <div className="text-sm text-[#8B9A7A]">{option.description}</div>
                </div>
                <Link
                  to={option.path}
                  className="text-[#8B9A7A] hover:text-[#6B5B73] font-medium text-sm whitespace-nowrap"
                >
                  Visit →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-sm text-[#8B9A7A]">
          Need help? <span className="text-[#6B5B73]">Contact support</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;