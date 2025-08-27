import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Baby,
  Calendar,
  Pill,
  FileText,
  Brain,
  Smartphone,
  Video,
  BarChart3,
  CreditCard,
  Menu,
  X,
  Heart,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: Home, path: "/", color: "text-blue-600" },
    {
      name: "Pregnancy",
      icon: Baby,
      path: "/pregnancy",
      color: "text-pink-600",
    },
    {
      name: "Appointments",
      icon: Calendar,
      path: "/appointments",
      color: "text-green-600",
    },
    {
      name: "Medications",
      icon: Pill,
      path: "/medications",
      color: "text-purple-600",
    },
    {
      name: "Records",
      icon: FileText,
      path: "/records",
      color: "text-orange-600",
    },
    {
      name: "Mental Health",
      icon: Brain,
      path: "/mental",
      color: "text-indigo-600",
    },
    {
      name: "Devices",
      icon: Smartphone,
      path: "/devices",
      color: "text-gray-600",
    },
    { name: "Video", icon: Video, path: "/video", color: "text-red-600" },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
      color: "text-teal-600",
    },
    {
      name: "Billing",
      icon: CreditCard,
      path: "/billing",
      color: "text-yellow-600",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 w-64`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Mom Guide Plus</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-primary-50 text-primary-600 border-r-2 border-primary-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    // Close sidebar on mobile when item is clicked
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
