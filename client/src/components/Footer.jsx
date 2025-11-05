import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left text-sm text-gray-300">
          &copy; {currentYear} LeaveManager. All rights reserved.
        </p>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          {footerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
