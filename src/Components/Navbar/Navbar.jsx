import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, NavLink, useLocation } from "react-router";
import { FiBriefcase, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = () => {
    signOutUser().catch((err) => console.log(err));
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/allProducts", label: "All Products" },
    ...(user
      ? [
          { path: "/myProducts", label: "My Products" },
          { path: "/myBids", label: "My Bids" },
          { path: "/createAProduct", label: "Create Product" },
        ]
      : []),
  ];

  const authLinks = user
    ? []
    : [
        { path: "/auth/register", label: "Register", isPrimary: false },
        { path: "/auth/login", label: "Login", isPrimary: true },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-all duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                SmartDeals
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Best Deals Online</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-medium transition-all duration-200 relative group ${
                    isActive
                      ? "text-purple-600 bg-purple-50 font-semibold"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-3/4 ${
                    location.pathname === link.path ? "w-3/4" : ""
                  }`}
                ></span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${
                            user.displayName || user.email
                          }&background=6366f1&color=fff`
                        }
                        alt="Profile"
                        className="w-9 h-9 rounded-full border-2 border-purple-200 object-cover shadow-sm group-hover:border-purple-300 transition-colors"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in-80">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.displayName || "Welcome!"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <div className="py-2">
                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </NavLink>
                      <NavLink
                        to="/myProducts"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                       <FiBriefcase className="w-4 h-4 mr-3" />
                        My Products
                      </NavLink>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                       <FiLogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      link.isPrimary
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg hover:shadow-purple-200 hover:scale-105"
                        : "border border-gray-300 text-gray-700 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <div className="relative">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${
                      user.displayName || user.email
                    }&background=6366f1&color=fff`
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-purple-200 object-cover"
                />
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-1.5" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMobileMenuOpen ? "opacity-0" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-1.5" : "w-6"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl animate-in slide-in-from-top-4">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Auth Links */}
            {!user && (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium text-center transition-all ${
                      link.isPrimary
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                        : "border border-gray-300 text-gray-700 hover:border-purple-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* User Info & Logout */}
            {user && (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="px-4 py-2">
                  <p className="font-medium text-gray-900">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-red-600 font-medium rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-center"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;