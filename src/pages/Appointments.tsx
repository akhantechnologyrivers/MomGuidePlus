import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Filter,
  Search,
} from "lucide-react";

interface Appointment {
  id: string;
  type: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  phone: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  reminder?: boolean;
}

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  // Available doctors list
  const availableDoctors = [
    { id: "1", name: "Dr. Sarah Wilson", specialty: "Obstetrics & Gynecology" },
    { id: "2", name: "Dr. Emily Rodriguez", specialty: "Radiology" },
    { id: "3", name: "Dr. Michael Chen", specialty: "Laboratory Medicine" },
    { id: "4", name: "Dr. Lisa Thompson", specialty: "Dental Care" },
    { id: "5", name: "Dr. James Anderson", specialty: "Pediatrics" },
    { id: "6", name: "Dr. Maria Garcia", specialty: "Cardiology" },
    { id: "7", name: "Dr. Robert Johnson", specialty: "Neurology" },
    { id: "8", name: "Dr. Jennifer Lee", specialty: "Dermatology" },
  ];

  // Available appointment types
  const appointmentTypes = [
    "Prenatal Checkup",
    "Ultrasound",
    "Blood Test",
    "Dental Checkup",
    "Follow-up Visit",
    "Physical Examination",
    "Vaccination",
    "Consultation",
    "Emergency Visit",
    "Surgery",
    "Therapy Session",
    "Other",
  ];

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      type: "Prenatal Checkup",
      doctor: "Dr. Sarah Wilson",
      date: "2025-01-15",
      time: "10:00",
      location: "Women's Health Clinic",
      phone: "(555) 123-4567",
      status: "upcoming",
      notes: "Bring ultrasound results",
      reminder: true,
    },
    {
      id: "2",
      type: "Ultrasound",
      doctor: "Dr. Emily Rodriguez",
      date: "2024-11-18",
      time: "14:30",
      location: "Radiology Department",
      phone: "(555) 987-6543",
      status: "completed",
      notes: "Everything looks great!",
    },
    {
      id: "3",
      type: "Blood Test",
      doctor: "Dr. Michael Chen",
      date: "2025-01-20",
      time: "09:15",
      location: "Lab Services",
      phone: "(555) 456-7890",
      status: "upcoming",
      reminder: true,
    },
    {
      id: "4",
      type: "Dental Checkup",
      doctor: "Dr. Lisa Thompson",
      date: "2024-11-15",
      time: "11:00",
      location: "Dental Care Center",
      phone: "(555) 321-0987",
      status: "cancelled",
      notes: "Rescheduled for next week",
    },
    {
      id: "5",
      type: "Follow-up Visit",
      doctor: "Dr. Sarah Wilson",
      date: "2025-01-25",
      time: "14:00",
      location: "Women's Health Clinic",
      phone: "(555) 123-4567",
      status: "upcoming",
      notes: "Routine follow-up",
      reminder: true,
    },
  ]);

  // Form state
  const [appointmentForm, setAppointmentForm] = useState({
    type: "",
    doctor: "",
    date: "",
    time: "",
    location: "",
    phone: "",
    notes: "",
    reminder: false,
  });

  // Filter appointments based on active tab and search
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = appointment.status === activeTab;
    const matchesSearch =
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      location: appointmentForm.location,
      phone: appointmentForm.phone,
      status: "upcoming",
      notes: appointmentForm.notes,
      reminder: appointmentForm.reminder,
    };

    setAppointments([newAppointment, ...appointments]);
    setAppointmentForm({
      type: "",
      doctor: "",
      date: "",
      time: "",
      location: "",
      phone: "",
      notes: "",
      reminder: false,
    });
    setShowAddAppointment(false);
  };

  // Edit appointment function
  const editAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      type: appointment.type,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      phone: appointment.phone,
      notes: appointment.notes || "",
      reminder: appointment.reminder || false,
    });
    setShowAddAppointment(true);
  };

  // Update appointment function
  const updateAppointment = () => {
    if (
      !editingAppointment ||
      !appointmentForm.type ||
      !appointmentForm.doctor ||
      !appointmentForm.date ||
      !appointmentForm.time
    )
      return;

    const updatedAppointment: Appointment = {
      ...editingAppointment,
      type: appointmentForm.type,
      doctor: appointmentForm.doctor,
      date: appointmentForm.date,
      time: appointmentForm.time,
      location: appointmentForm.location,
      phone: appointmentForm.phone,
      notes: appointmentForm.notes,
      reminder: appointmentForm.reminder,
    };

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? updatedAppointment
          : appointment
      )
    );
    setAppointmentForm({
      type: "",
      doctor: "",
      date: "",
      time: "",
      location: "",
      phone: "",
      notes: "",
      reminder: false,
    });
    setEditingAppointment(null);
    setShowAddAppointment(false);
  };

  // Cancel edit appointment
  const cancelEditAppointment = () => {
    setAppointmentForm({
      type: "",
      doctor: "",
      date: "",
      time: "",
      location: "",
      phone: "",
      notes: "",
      reminder: false,
    });
    setEditingAppointment(null);
    setShowAddAppointment(false);
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Check if appointment is in the past
  const isAppointmentInPast = (appointment: Appointment) => {
    const appointmentDate = new Date(appointment.date + " " + appointment.time);
    const now = new Date();
    return appointmentDate < now;
  };

  // Check if a date is in the past
  const isDateInPast = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return selectedDate < today;
  };

  // Show delete confirmation
  const showDeleteConfirmation = (id: string) => {
    setAppointmentToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Confirm delete appointment
  const confirmDeleteAppointment = () => {
    if (appointmentToDelete) {
      deleteAppointment(appointmentToDelete);
      setAppointmentToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  // Cancel delete confirmation
  const cancelDeleteAppointment = () => {
    setAppointmentToDelete(null);
    setShowDeleteConfirm(false);
  };

  // Update appointment status
  const updateAppointmentStatus = (
    id: string,
    status: "upcoming" | "completed" | "cancelled"
  ) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  // Toggle reminder
  const toggleReminder = (id: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, reminder: !appointment.reminder }
          : appointment
      )
    );
  };

  // Delete appointment
  const deleteAppointment = (id: string) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  // Get appointment count by status
  const getAppointmentCount = (status: string) => {
    return appointments.filter((appointment) => appointment.status === status)
      .length;
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600">
          Manage your medical appointments and schedule.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {getAppointmentCount("upcoming")}
          </div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {getAppointmentCount("completed")}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">
            {getAppointmentCount("cancelled")}
          </div>
          <div className="text-gray-600">Cancelled</div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAddAppointment(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {["upcoming", "completed", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-primary-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} (
            {getAppointmentCount(tab)})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} appointments
            </h3>
            <p className="text-gray-600">
              You don't have any {activeTab} appointments scheduled.
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.type}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          {appointment.doctor}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {appointment.location}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {new Date(
                            appointment.date
                          ).toLocaleDateString()} at {appointment.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {appointment.phone}
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg">
                        <strong>Notes:</strong> {appointment.notes}
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      {appointment.status === "upcoming" && (
                        <>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "completed"
                              )
                            }
                            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Complete
                          </button>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "cancelled"
                              )
                            }
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => toggleReminder(appointment.id)}
                        className={`text-sm font-medium flex items-center ${
                          appointment.reminder
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {appointment.reminder ? "Reminder On" : "Set Reminder"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {appointment.status === "upcoming" &&
                    !isAppointmentInPast(appointment) && (
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => editAppointment(appointment)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => showDeleteConfirmation(appointment.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingAppointment
                  ? "Edit Appointment"
                  : "Schedule Appointment"}
              </h3>
              <button
                onClick={() =>
                  editingAppointment
                    ? cancelEditAppointment()
                    : setShowAddAppointment(false)
                }
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type
                </label>
                <select
                  value={appointmentForm.type}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      type: e.target.value,
                    })
                  }
                  className="input-field"
                >
                  <option value="">Select appointment type</option>
                  {appointmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  value={appointmentForm.doctor}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      doctor: e.target.value,
                    })
                  }
                  className="input-field"
                >
                  <option value="">Select a doctor</option>
                  {availableDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    min={getTodayDate()}
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Women's Health Clinic"
                  value={appointmentForm.location}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      location: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g., (555) 123-4567"
                  value={appointmentForm.phone}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      phone: e.target.value,
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={appointmentForm.reminder}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      reminder: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="reminder"
                  className="ml-2 text-sm text-gray-700"
                >
                  Set reminder notification
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={
                    editingAppointment ? updateAppointment : addAppointment
                  }
                  className="flex-1 btn-primary"
                >
                  {editingAppointment ? "Update Appointment" : "Schedule"}
                </button>
                <button
                  onClick={() =>
                    editingAppointment
                      ? cancelEditAppointment()
                      : setShowAddAppointment(false)
                  }
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Appointment
                </h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <div className="text-gray-700 mb-6">
              Are you sure you want to delete this appointment? This will
              permanently remove it from your records.
            </div>
            <div className="flex space-x-3">
              <button
                onClick={confirmDeleteAppointment}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
              <button
                onClick={cancelDeleteAppointment}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
