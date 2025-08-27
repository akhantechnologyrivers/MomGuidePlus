import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Baby,
  Clock,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Bell,
  Heart,
  Activity,
  Moon,
  Sun,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const babyInfo = {
    name: "Emma",
    age: "6 months",
    weight: "7.2 kg",
    height: "65 cm",
  };

  const recentFeedings = [
    {
      time: "08:30",
      type: "Breastfeeding",
      duration: "15 min",
      amount: "120ml",
    },
    { time: "11:45", type: "Formula", duration: "10 min", amount: "150ml" },
    {
      time: "15:20",
      type: "Breastfeeding",
      duration: "12 min",
      amount: "110ml",
    },
  ];

  const milestones = [
    { title: "First Smile", achieved: true, date: "2 months" },
    { title: "Rolling Over", achieved: true, date: "4 months" },
    { title: "Sitting Up", achieved: false, date: "6 months" },
    { title: "First Words", achieved: false, date: "8 months" },
  ];

  const sleepData = [
    { day: "Mon", hours: 14 },
    { day: "Tue", hours: 13.5 },
    { day: "Wed", hours: 15 },
    { day: "Thu", hours: 14.5 },
    { day: "Fri", hours: 13 },
    { day: "Sat", hours: 14.5 },
    { day: "Sun", hours: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Mom Guide Plus
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Baby Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Baby className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {babyInfo.name}
                </h2>
                <p className="text-gray-600">{babyInfo.age} old</p>
                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                  <span>Weight: {babyInfo.weight}</span>
                  <span>Height: {babyInfo.height}</span>
                </div>
              </div>
            </div>
            <button className="btn-primary">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
          {["overview", "feeding", "sleep", "milestones"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Today's Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Today's Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Feedings</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sleep</span>
                  <span className="font-semibold">14.5 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Diapers</span>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </div>

            {/* Recent Feedings */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Feedings
                </h3>
                <button className="text-primary-500 hover:text-primary-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentFeedings.map((feeding, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {feeding.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        {feeding.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {feeding.amount}
                      </div>
                      <div className="text-xs text-gray-500">
                        {feeding.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sleep This Week
              </h3>
              <div className="flex items-end justify-between h-32">
                {sleepData.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center">
                    <div
                      className="bg-secondary-500 rounded-t w-8 mb-2"
                      style={{ height: `${(day.hours / 16) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-secondary-500">
                  14.2
                </div>
                <div className="text-sm text-gray-600">Avg hours/day</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feeding Tab */}
        {activeTab === "feeding" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Feeding Log
                </h3>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feeding
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Time
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Duration
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentFeedings.map((feeding, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">{feeding.time}</td>
                        <td className="py-3 px-4">{feeding.type}</td>
                        <td className="py-3 px-4">{feeding.amount}</td>
                        <td className="py-3 px-4">{feeding.duration}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sleep Tab */}
        {activeTab === "sleep" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Sleep Tracking
                </h3>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Sleep
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Sleep Pattern
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Moon className="w-4 h-4 text-blue-500 mr-2" />
                        <span>Night Sleep</span>
                      </div>
                      <span className="font-medium">10.5 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 text-yellow-500 mr-2" />
                        <span>Day Naps</span>
                      </div>
                      <span className="font-medium">3.5 hours</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Weekly Overview
                  </h4>
                  <div className="flex items-end justify-between h-32">
                    {sleepData.map((day, index) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <div
                          className="bg-secondary-500 rounded-t w-6 mb-2"
                          style={{ height: `${(day.hours / 16) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-600">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Milestones Tab */}
        {activeTab === "milestones" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Development Milestones
                </h3>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          milestone.achieved ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {milestone.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          Expected: {milestone.date}
                        </div>
                      </div>
                    </div>
                    {milestone.achieved && (
                      <span className="text-green-600 text-sm font-medium">
                        Achieved!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
