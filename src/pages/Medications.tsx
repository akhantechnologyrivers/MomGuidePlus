import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Pill,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Bell,
  Calendar,
  Activity,
  RotateCcw,
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  refillDate: string;
  remainingPills: number;
  totalPills: number;
  instructions: string;
  doctor: string;
  pharmacy: string;
  status: "active" | "completed" | "discontinued";
  lastTaken?: string;
  nextDose?: string;
  notes?: string;
}

interface DoseLog {
  id: string;
  medicationId: string;
  medicationName: string;
  takenAt: string;
  dosage: string;
  notes?: string;
}

const Medications: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showDoseLog, setShowDoseLog] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Medications state
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Prenatal Vitamins",
      dosage: "1 tablet",
      frequency: "Daily",
      time: "Morning",
      refillDate: "2024-01-15",
      remainingPills: 15,
      totalPills: 30,
      instructions: "Take with food",
      doctor: "Dr. Sarah Wilson",
      pharmacy: "CVS Pharmacy",
      status: "active",
      lastTaken: "2023-12-15T08:00:00",
      nextDose: "2023-12-16T08:00:00",
    },
    {
      id: "2",
      name: "Folic Acid",
      dosage: "400mcg",
      frequency: "Daily",
      time: "Morning",
      refillDate: "2024-02-01",
      remainingPills: 45,
      totalPills: 90,
      instructions: "Take on empty stomach",
      doctor: "Dr. Sarah Wilson",
      pharmacy: "Walgreens",
      status: "active",
      lastTaken: "2023-12-15T08:00:00",
      nextDose: "2023-12-16T08:00:00",
    },
    {
      id: "3",
      name: "Iron Supplement",
      dosage: "27mg",
      frequency: "Daily",
      time: "Evening",
      refillDate: "2023-12-25",
      remainingPills: 5,
      totalPills: 30,
      instructions: "Take with orange juice for better absorption",
      doctor: "Dr. Emily Rodriguez",
      pharmacy: "CVS Pharmacy",
      status: "active",
      lastTaken: "2023-12-14T20:00:00",
      nextDose: "2023-12-15T20:00:00",
      notes: "Low on pills - need refill soon",
    },
  ]);

  // Dose logs state
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([
    {
      id: "1",
      medicationId: "1",
      medicationName: "Prenatal Vitamins",
      takenAt: "2023-12-15T08:00:00",
      dosage: "1 tablet",
    },
    {
      id: "2",
      medicationId: "2",
      medicationName: "Folic Acid",
      takenAt: "2023-12-15T08:00:00",
      dosage: "400mcg",
    },
    {
      id: "3",
      medicationId: "3",
      medicationName: "Iron Supplement",
      takenAt: "2023-12-14T20:00:00",
      dosage: "27mg",
    },
  ]);

  // Form state
  const [medicationForm, setMedicationForm] = useState({
    name: "",
    dosage: "",
    frequency: "Daily",
    time: "Morning",
    refillDate: "",
    totalPills: "",
    instructions: "",
    doctor: "",
    pharmacy: "",
    notes: "",
  });

  const [doseLogForm, setDoseLogForm] = useState({
    dosage: "",
    notes: "",
  });

  // Filter medications based on active tab and search
  const filteredMedications = medications.filter((medication) => {
    const matchesStatus = medication.status === activeTab;
    const matchesSearch =
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Add medication function
  const addMedication = () => {
    if (
      !medicationForm.name ||
      !medicationForm.dosage ||
      !medicationForm.refillDate ||
      !medicationForm.totalPills
    )
      return;

    const newMedication: Medication = {
      id: Date.now().toString(),
      name: medicationForm.name,
      dosage: medicationForm.dosage,
      frequency: medicationForm.frequency,
      time: medicationForm.time,
      refillDate: medicationForm.refillDate,
      remainingPills: parseInt(medicationForm.totalPills),
      totalPills: parseInt(medicationForm.totalPills),
      instructions: medicationForm.instructions,
      doctor: medicationForm.doctor,
      pharmacy: medicationForm.pharmacy,
      status: "active",
      notes: medicationForm.notes,
    };

    setMedications([newMedication, ...medications]);
    setMedicationForm({
      name: "",
      dosage: "",
      frequency: "Daily",
      time: "Morning",
      refillDate: "",
      totalPills: "",
      instructions: "",
      doctor: "",
      pharmacy: "",
      notes: "",
    });
    setShowAddMedication(false);
  };

  // Log dose function
  const logDose = (medicationId: string) => {
    const medication = medications.find((m) => m.id === medicationId);
    if (!medication) return;

    const now = new Date();
    const newDoseLog: DoseLog = {
      id: Date.now().toString(),
      medicationId,
      medicationName: medication.name,
      takenAt: now.toISOString(),
      dosage: doseLogForm.dosage || medication.dosage,
      notes: doseLogForm.notes,
    };

    setDoseLogs([newDoseLog, ...doseLogs]);

    // Update medication
    const updatedMedication = {
      ...medication,
      remainingPills: Math.max(0, medication.remainingPills - 1),
      lastTaken: now.toISOString(),
      nextDose: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // Next day
    };

    setMedications(
      medications.map((m) => (m.id === medicationId ? updatedMedication : m))
    );
    setDoseLogForm({ dosage: "", notes: "" });
    setShowDoseLog(null);
  };

  // Refill medication
  const refillMedication = (id: string) => {
    const medication = medications.find((m) => m.id === id);
    if (!medication) return;

    const updatedMedication = {
      ...medication,
      remainingPills: medication.totalPills,
      refillDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days from now
    };

    setMedications(
      medications.map((m) => (m.id === id ? updatedMedication : m))
    );
  };

  // Update medication status
  const updateMedicationStatus = (
    id: string,
    status: "active" | "completed" | "discontinued"
  ) => {
    setMedications(
      medications.map((medication) =>
        medication.id === id ? { ...medication, status } : medication
      )
    );
  };

  // Delete medication
  const deleteMedication = (id: string) => {
    setMedications(medications.filter((medication) => medication.id !== id));
  };

  // Get medication count by status
  const getMedicationCount = (status: string) => {
    return medications.filter((medication) => medication.status === status)
      .length;
  };

  // Check for low stock medications
  const lowStockMedications = medications.filter(
    (medication) =>
      medication.status === "active" && medication.remainingPills <= 7
  );

  // Check for overdue doses
  const overdueMedications = medications.filter((medication) => {
    if (medication.status !== "active" || !medication.nextDose) return false;
    return new Date(medication.nextDose) < new Date();
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medications</h1>
        <p className="text-gray-600">
          Track your medications and prescriptions.
        </p>
      </div>

      {/* Alerts */}
      {(lowStockMedications.length > 0 || overdueMedications.length > 0) && (
        <div className="mb-6 space-y-3">
          {lowStockMedications.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Low Stock Alert
                  </h3>
                  <p className="text-sm text-yellow-700">
                    {lowStockMedications.length} medication(s) running low on
                    pills
                  </p>
                </div>
              </div>
            </div>
          )}
          {overdueMedications.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Overdue Doses
                  </h3>
                  <p className="text-sm text-red-700">
                    {overdueMedications.length} medication(s) overdue for next
                    dose
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Pill className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {getMedicationCount("active")}
          </div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {getMedicationCount("completed")}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {lowStockMedications.length}
          </div>
          <div className="text-gray-600">Low Stock</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">
            {overdueMedications.length}
          </div>
          <div className="text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Pill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAddMedication(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {["current", "completed", "discontinued"].map((tab) => (
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
            {getMedicationCount(tab)})
          </button>
        ))}
      </div>

      {/* Medications List */}
      <div className="space-y-4">
        {filteredMedications.length === 0 ? (
          <div className="card text-center py-12">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} medications
            </h3>
            <p className="text-gray-600">
              You don't have any {activeTab} medications.
            </p>
          </div>
        ) : (
          filteredMedications.map((medication) => (
            <motion.div
              key={medication.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {medication.name}
                      </h3>
                      {medication.remainingPills <= 7 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Low Stock
                        </span>
                      )}
                      {medication.nextDose &&
                        new Date(medication.nextDose) < new Date() && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            Overdue
                          </span>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Dosage:</strong> {medication.dosage} •{" "}
                          {medication.frequency} • {medication.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Doctor:</strong> {medication.doctor}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Pharmacy:</strong> {medication.pharmacy}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Pills:</strong> {medication.remainingPills}/
                          {medication.totalPills} remaining
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Refill:</strong>{" "}
                          {new Date(medication.refillDate).toLocaleDateString()}
                        </div>
                        {medication.lastTaken && (
                          <div className="text-sm text-gray-600">
                            <strong>Last taken:</strong>{" "}
                            {new Date(
                              medication.lastTaken
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {medication.instructions && (
                      <div className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg">
                        <strong>Instructions:</strong> {medication.instructions}
                      </div>
                    )}

                    {medication.notes && (
                      <div className="text-sm text-gray-600 mb-3 p-3 bg-blue-50 rounded-lg">
                        <strong>Notes:</strong> {medication.notes}
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      {medication.status === "active" && (
                        <>
                          <button
                            onClick={() => setShowDoseLog(medication.id)}
                            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Log Dose
                          </button>
                          <button
                            onClick={() => refillMedication(medication.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Refill
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          updateMedicationStatus(medication.id, "completed")
                        }
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteMedication(medication.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Medication Modal */}
      {showAddMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Medication</h3>
              <button onClick={() => setShowAddMedication(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Prenatal Vitamins"
                  value={medicationForm.name}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      name: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1 tablet, 400mcg"
                  value={medicationForm.dosage}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      dosage: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={medicationForm.frequency}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        frequency: e.target.value,
                      })
                    }
                    className="input-field"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    value={medicationForm.time}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        time: e.target.value,
                      })
                    }
                    className="input-field"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Bedtime">Bedtime</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Pills
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={medicationForm.totalPills}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        totalPills: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refill Date
                  </label>
                  <input
                    type="date"
                    value={medicationForm.refillDate}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        refillDate: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dr. Sarah Wilson"
                  value={medicationForm.doctor}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      doctor: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pharmacy
                </label>
                <input
                  type="text"
                  placeholder="e.g., CVS Pharmacy"
                  value={medicationForm.pharmacy}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      pharmacy: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <textarea
                  placeholder="e.g., Take with food"
                  value={medicationForm.instructions}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      instructions: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Additional notes..."
                  value={medicationForm.notes}
                  onChange={(e) =>
                    setMedicationForm({
                      ...medicationForm,
                      notes: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={2}
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={addMedication} className="flex-1 btn-primary">
                  Add Medication
                </button>
                <button
                  onClick={() => setShowAddMedication(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Dose Modal */}
      {showDoseLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Log Dose</h3>
              <button onClick={() => setShowDoseLog(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage Taken
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1 tablet"
                  value={doseLogForm.dosage}
                  onChange={(e) =>
                    setDoseLogForm({ ...doseLogForm, dosage: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any side effects or notes..."
                  value={doseLogForm.notes}
                  onChange={(e) =>
                    setDoseLogForm({ ...doseLogForm, notes: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => logDose(showDoseLog)}
                  className="flex-1 btn-primary"
                >
                  Log Dose
                </button>
                <button
                  onClick={() => setShowDoseLog(null)}
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

export default Medications;
