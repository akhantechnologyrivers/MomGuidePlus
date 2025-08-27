import React from "react";
import { motion } from "framer-motion";
import { Video, Phone, Calendar, Clock, User } from "lucide-react";

const VideoConsultations: React.FC = () => {
  const consultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      type: "Prenatal Checkup",
      date: "Dec 20, 2023",
      time: "2:00 PM",
      status: "Scheduled",
    },
    {
      id: 2,
      doctor: "Dr. Emily Rodriguez",
      type: "Nutrition Consultation",
      date: "Dec 18, 2023",
      time: "10:30 AM",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Video Consultations
        </h1>
        <p className="text-gray-600">
          Connect with healthcare providers remotely.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Video className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-red-600">1</div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        <div className="card text-center">
          <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-gray-600">This Month</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Consultations</h2>
        <button className="btn-primary">
          <Video className="w-4 h-4 mr-2" />
          Schedule Consultation
        </button>
      </div>

      <div className="space-y-4">
        {consultations.map((consultation) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {consultation.type}
                  </h3>
                  <p className="text-gray-600">{consultation.doctor}</p>
                  <p className="text-sm text-gray-500">
                    {consultation.date} at {consultation.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    consultation.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {consultation.status}
                </span>
                <button className="text-red-500 hover:text-red-600">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoConsultations;
