import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Baby,
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  X,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: "Mild" | "Moderate" | "Severe";
  date: string;
  notes?: string;
}

interface Appointment {
  id: string;
  type: string;
  doctor: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed";
  notes?: string;
}

interface Milestone {
  id: string;
  title: string;
  week: number;
  achieved: boolean;
  date?: string;
  description: string;
}

const Pregnancy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  // Pregnancy info state
  const [pregnancyInfo, setPregnancyInfo] = useState({
    dueDate: "2024-03-15",
    currentWeek: 24,
    babySize: "Corn",
    babyWeight: "600g",
    babyLength: "30cm",
  });

  // Symptoms state
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: "1",
      name: "Morning Sickness",
      severity: "Mild",
      date: "2023-12-15",
      notes: "Better in the afternoon",
    },
    {
      id: "2",
      name: "Back Pain",
      severity: "Moderate",
      date: "2023-12-14",
    },
    {
      id: "3",
      name: "Fatigue",
      severity: "Mild",
      date: "2023-12-13",
    },
  ]);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      type: "Ultrasound",
      doctor: "Dr. Sarah Wilson",
      date: "2023-12-20",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: "2",
      type: "Prenatal Checkup",
      doctor: "Dr. Emily Rodriguez",
      date: "2023-12-18",
      time: "2:30 PM",
      status: "Completed",
    },
  ]);

  // Milestones state
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "First Heartbeat",
      week: 6,
      achieved: true,
      date: "2023-08-15",
      description: "Baby's heart starts beating",
    },
    {
      id: "2",
      title: "Gender Reveal",
      week: 20,
      achieved: true,
      date: "2023-11-20",
      description: "Found out it's a girl!",
    },
    {
      id: "3",
      title: "Viability Milestone",
      week: 24,
      achieved: true,
      date: "2023-12-15",
      description: "Baby can survive outside womb",
    },
    {
      id: "4",
      title: "Third Trimester",
      week: 28,
      achieved: false,
      description: "Entering final trimester",
    },
  ]);

  // Form states
  const [symptomForm, setSymptomForm] = useState({
    name: "",
    severity: "Mild" as "Mild" | "Moderate" | "Severe",
    notes: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    type: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  // Calculate pregnancy progress
  const calculateProgress = () => {
    const dueDate = new Date(pregnancyInfo.dueDate);
    const today = new Date();
    const totalDays = 280; // 40 weeks * 7 days
    const daysPassed =
      Math.floor(
        (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + totalDays;
    const progress = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));
    return Math.round(progress);
  };

  const progress = calculateProgress();

  // Add symptom function
  const addSymptom = () => {
    if (!symptomForm.name) return;

    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: symptomForm.name,
      severity: symptomForm.severity,
      date: new Date().toISOString().split("T")[0],
      notes: symptomForm.notes,
    };

    setSymptoms([newSymptom, ...symptoms]);
    setSymptomForm({ name: "", severity: "Mild", notes: "" });
    setShowAddSymptom(false);
  };

  // Add appointment function
  const addAppointment = () => {
    if (
      !appointmentForm.type ||
      !appointmentForm.doctor ||
      !appointmentForm.date ||
      !appointmentForm.time
    )
      return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      type: appointmentForm.type,
      doctor: appointmentForm.doctor,
      date: appointmentForm.date,
      time: appointmentForm.time,
      status: "Upcoming",
      notes: appointmentForm.notes,
    };

    setAppointments([newAppointment, ...appointments]);
    setAppointmentForm({ type: "", doctor: "", date: "", time: "", notes: "" });
    setShowAddAppointment(false);
  };

  // Toggle milestone achievement
  const toggleMilestone = (id: string) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              achieved: !m.achieved,
              date: !m.achieved
                ? new Date().toISOString().split("T")[0]
                : undefined,
            }
          : m
      )
    );
  };

  // Delete functions
  const deleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  // Update pregnancy info
  const updatePregnancyInfo = (field: string, value: string) => {
    setPregnancyInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pregnancy Tracker
        </h1>
        <p className="text-gray-600">
          Track your pregnancy journey week by week.
        </p>
      </div>

      {/* Pregnancy Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Current Week</h3>
          <p className="text-blue-600 font-medium">
            Week {pregnancyInfo.currentWeek}
          </p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Baby className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Baby Size</h3>
          <p className="text-green-600 font-medium">{pregnancyInfo.babySize}</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Baby Weight</h3>
          <p className="text-purple-600 font-medium">
            {pregnancyInfo.babyWeight}
          </p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Due Date</h3>
          <p className="text-pink-600 font-medium">
            {new Date(pregnancyInfo.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {["overview", "symptoms", "appointments", "milestones"].map((tab) => (
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
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Weekly Progress */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Pregnancy Progress
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">
                    {pregnancyInfo.currentWeek}
                  </div>
                  <div className="text-sm text-gray-600">Current Week</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {40 - pregnancyInfo.currentWeek}
                  </div>
                  <div className="text-sm text-gray-600">Weeks Left</div>
                </div>
              </div>
            </div>
          </div>

          {/* Baby Development */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Baby Development
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Baby className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Size</div>
                    <div className="text-sm text-gray-600">
                      Like a {pregnancyInfo.babySize}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {pregnancyInfo.babyWeight}
                  </div>
                  <div className="text-sm text-gray-600">
                    {pregnancyInfo.babyLength}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Heartbeat</div>
                    <div className="text-sm text-gray-600">
                      Strong and regular
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">140-160</div>
                  <div className="text-sm text-gray-600">BPM</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Movement</div>
                    <div className="text-sm text-gray-600">Kicks and rolls</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">Active</div>
                  <div className="text-sm text-gray-600">Daily</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Symptoms Tab */}
      {activeTab === "symptoms" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Symptom Tracker
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowAddSymptom(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Symptom
              </button>
            </div>

            <div className="space-y-4">
              {symptoms.map((symptom, index) => (
                <div
                  key={symptom.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {symptom.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {symptom.date}
                      </div>
                      {symptom.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          {symptom.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        symptom.severity === "Mild"
                          ? "bg-green-100 text-green-800"
                          : symptom.severity === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {symptom.severity}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteSymptom(symptom.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Prenatal Appointments
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowAddAppointment(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Appointment
              </button>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {appointment.type}
                      </div>
                      <div className="text-sm text-gray-600">
                        {appointment.doctor}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.date} at {appointment.time}
                      </div>
                      {appointment.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteAppointment(appointment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Pregnancy Milestones
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    milestone.achieved
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200"
                  }`}
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
                        Week {milestone.week}
                      </div>
                      <div className="text-sm text-gray-500">
                        {milestone.description}
                      </div>
                      {milestone.date && (
                        <div className="text-sm text-green-600 font-medium">
                          Achieved: {milestone.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`text-sm font-medium ${
                      milestone.achieved ? "text-green-600" : "text-gray-500"
                    }`}
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    {milestone.achieved ? "Achieved!" : "Mark Complete"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Symptom Modal */}
      {showAddSymptom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Symptom</h3>
              <button onClick={() => setShowAddSymptom(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptom
                </label>
                <input
                  type="text"
                  placeholder="e.g., Morning Sickness"
                  value={symptomForm.name}
                  onChange={(e) =>
                    setSymptomForm({ ...symptomForm, name: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <select
                  value={symptomForm.severity}
                  onChange={(e) =>
                    setSymptomForm({
                      ...symptomForm,
                      severity: e.target.value as
                        | "Mild"
                        | "Moderate"
                        | "Severe",
                    })
                  }
                  className="input-field"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Additional notes..."
                  value={symptomForm.notes}
                  onChange={(e) =>
                    setSymptomForm({ ...symptomForm, notes: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={addSymptom} className="flex-1 btn-primary">
                  Add Symptom
                </button>
                <button
                  onClick={() => setShowAddSymptom(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Schedule Appointment</h3>
              <button onClick={() => setShowAddAppointment(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ultrasound, Checkup"
                  value={appointmentForm.type}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      type: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dr. Sarah Wilson"
                  value={appointmentForm.doctor}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      doctor: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      date: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={appointmentForm.time}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      time: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Additional notes..."
                  value={appointmentForm.notes}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      notes: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={addAppointment} className="flex-1 btn-primary">
                  Schedule
                </button>
                <button
                  onClick={() => setShowAddAppointment(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pregnancy;
