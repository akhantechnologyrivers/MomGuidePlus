import React, { useState } from "react";
import { motion } from "framer-motion";
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
  X,
} from "lucide-react";

interface Feeding {
  id: string;
  time: string;
  type: string;
  duration: string;
  amount: string;
  date: string;
}

interface SleepLog {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: "night" | "nap";
  date: string;
}

interface Milestone {
  id: string;
  title: string;
  achieved: boolean;
  date: string;
  expectedDate: string;
  notes?: string;
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddFeeding, setShowAddFeeding] = useState(false);
  const [showAddSleep, setShowAddSleep] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editingFeeding, setEditingFeeding] = useState<Feeding | null>(null);

  // Baby info state
  const [babyInfo, setBabyInfo] = useState({
    name: "Emma",
    age: "6 months",
    weight: "7.2 kg",
    height: "65 cm",
  });

  // Baby info form state
  const [babyInfoForm, setBabyInfoForm] = useState({
    name: "Emma",
    age: "6 months",
    weight: "7.2 kg",
    height: "65 cm",
  });

  // Feedings state
  const [feedings, setFeedings] = useState<Feeding[]>([
    {
      id: "1",
      time: "08:30",
      type: "Breastfeeding",
      duration: "15 min",
      amount: "120ml",
      date: "2023-12-15",
    },
    {
      id: "2",
      time: "11:45",
      type: "Formula",
      duration: "10 min",
      amount: "150ml",
      date: "2023-12-15",
    },
    {
      id: "3",
      time: "15:20",
      type: "Breastfeeding",
      duration: "12 min",
      amount: "110ml",
      date: "2023-12-15",
    },
  ]);

  // Sleep logs state
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([
    {
      id: "1",
      startTime: "20:00",
      endTime: "06:00",
      duration: 10,
      type: "night",
      date: "2023-12-14",
    },
    {
      id: "2",
      startTime: "09:00",
      endTime: "10:30",
      duration: 1.5,
      type: "nap",
      date: "2023-12-15",
    },
    {
      id: "3",
      startTime: "13:00",
      endTime: "14:30",
      duration: 1.5,
      type: "nap",
      date: "2023-12-15",
    },
  ]);

  // Milestones state
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "First Smile",
      achieved: true,
      date: "2 months",
      expectedDate: "2 months",
    },
    {
      id: "2",
      title: "Rolling Over",
      achieved: true,
      date: "4 months",
      expectedDate: "4 months",
    },
    {
      id: "3",
      title: "Sitting Up",
      achieved: false,
      date: "6 months",
      expectedDate: "6 months",
    },
    {
      id: "4",
      title: "First Words",
      achieved: false,
      date: "8 months",
      expectedDate: "8 months",
    },
  ]);

  // Form states
  const [feedingForm, setFeedingForm] = useState({
    time: "",
    type: "Breastfeeding",
    duration: "",
    amount: "",
  });

  const [sleepForm, setSleepForm] = useState({
    startTime: "",
    endTime: "",
    type: "night" as "night" | "nap",
  });

  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    expectedDate: "",
    notes: "",
  });

  // Calculate today's summary
  const today = new Date().toISOString().split("T")[0];
  const todayFeedings = feedings.filter((f) => f.date === today);
  const todaySleep = sleepLogs.filter((s) => s.date === today);
  const totalSleepHours = todaySleep.reduce(
    (sum, sleep) => sum + sleep.duration,
    0
  );

  // Calculate weekly sleep data
  const getWeekData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => {
      // Mock data for demo - in real app, calculate from actual sleep logs
      return { day, hours: Math.random() * 3 + 12 };
    });
  };

  const sleepData = getWeekData();

  // Add feeding function
  const addFeeding = () => {
    if (!feedingForm.time || !feedingForm.duration || !feedingForm.amount)
      return;

    const newFeeding: Feeding = {
      id: Date.now().toString(),
      ...feedingForm,
      date: today,
    };

    setFeedings([newFeeding, ...feedings]);
    setFeedingForm({
      time: "",
      type: "Breastfeeding",
      duration: "",
      amount: "",
    });
    setShowAddFeeding(false);
  };

  // Edit feeding function
  const editFeeding = (feeding: Feeding) => {
    setEditingFeeding(feeding);
    setFeedingForm({
      time: feeding.time,
      type: feeding.type,
      duration: feeding.duration,
      amount: feeding.amount,
    });
    setShowAddFeeding(true);
  };

  // Update feeding function
  const updateFeeding = () => {
    if (
      !editingFeeding ||
      !feedingForm.time ||
      !feedingForm.duration ||
      !feedingForm.amount
    )
      return;

    const updatedFeeding: Feeding = {
      ...editingFeeding,
      ...feedingForm,
    };

    setFeedings(
      feedings.map((f) => (f.id === editingFeeding.id ? updatedFeeding : f))
    );
    setFeedingForm({
      time: "",
      type: "Breastfeeding",
      duration: "",
      amount: "",
    });
    setEditingFeeding(null);
    setShowAddFeeding(false);
  };

  // Cancel edit feeding
  const cancelEditFeeding = () => {
    setFeedingForm({
      time: "",
      type: "Breastfeeding",
      duration: "",
      amount: "",
    });
    setEditingFeeding(null);
    setShowAddFeeding(false);
  };

  // Update baby info function
  const updateBabyInfo = () => {
    setBabyInfo(babyInfoForm);
    setShowEditProfile(false);
  };

  // Add sleep log function
  const addSleepLog = () => {
    if (!sleepForm.startTime || !sleepForm.endTime) return;

    const start = new Date(`2000-01-01T${sleepForm.startTime}`);
    const end = new Date(`2000-01-01T${sleepForm.endTime}`);
    let duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (duration < 0) duration += 24; // Handle overnight sleep

    const newSleep: SleepLog = {
      id: Date.now().toString(),
      startTime: sleepForm.startTime,
      endTime: sleepForm.endTime,
      duration,
      type: sleepForm.type,
      date: today,
    };

    setSleepLogs([newSleep, ...sleepLogs]);
    setSleepForm({ startTime: "", endTime: "", type: "night" });
    setShowAddSleep(false);
  };

  // Add milestone function
  const addMilestone = () => {
    if (!milestoneForm.title || !milestoneForm.expectedDate) return;

    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: milestoneForm.title,
      achieved: false,
      date: milestoneForm.expectedDate,
      expectedDate: milestoneForm.expectedDate,
      notes: milestoneForm.notes,
    };

    setMilestones([...milestones, newMilestone]);
    setMilestoneForm({ title: "", expectedDate: "", notes: "" });
    setShowAddMilestone(false);
  };

  // Toggle milestone achievement
  const toggleMilestone = (id: string) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, achieved: !m.achieved } : m))
    );
  };

  // Delete functions
  const deleteFeeding = (id: string) => {
    setFeedings(feedings.filter((f) => f.id !== id));
  };

  const deleteSleepLog = (id: string) => {
    setSleepLogs(sleepLogs.filter((s) => s.id !== id));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your baby's overview.
        </p>
      </div>

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
          <button
            className="btn-primary"
            onClick={() => {
              setBabyInfoForm(babyInfo);
              setShowEditProfile(true);
            }}
          >
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
                <span className="font-semibold">{todayFeedings.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sleep</span>
                <span className="font-semibold">
                  {totalSleepHours.toFixed(1)} hrs
                </span>
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
              <button
                className="text-primary-500 hover:text-primary-600"
                onClick={() => setShowAddFeeding(true)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {todayFeedings.slice(0, 3).map((feeding, index) => (
                <div
                  key={feeding.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {feeding.time}
                    </div>
                    <div className="text-sm text-gray-600">{feeding.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{feeding.amount}</div>
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
                {sleepData.reduce((sum, day) => sum + day.hours, 0) / 7}
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
              <button
                className="btn-primary"
                onClick={() => setShowAddFeeding(true)}
              >
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
                  {feedings.map((feeding, index) => (
                    <tr key={feeding.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">{feeding.time}</td>
                      <td className="py-3 px-4">{feeding.type}</td>
                      <td className="py-3 px-4">{feeding.amount}</td>
                      <td className="py-3 px-4">{feeding.duration}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => editFeeding(feeding)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => deleteFeeding(feeding.id)}
                          >
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
              <button
                className="btn-primary"
                onClick={() => setShowAddSleep(true)}
              >
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
                    <span className="font-medium">
                      {sleepLogs
                        .filter((s) => s.type === "night")
                        .reduce((sum, s) => sum + s.duration, 0)
                        .toFixed(1)}{" "}
                      hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Sun className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Day Naps</span>
                    </div>
                    <span className="font-medium">
                      {sleepLogs
                        .filter((s) => s.type === "nap")
                        .reduce((sum, s) => sum + s.duration, 0)
                        .toFixed(1)}{" "}
                      hours
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Recent Sleep Logs
                </h4>
                <div className="space-y-2">
                  {sleepLogs.slice(0, 5).map((sleep) => (
                    <div
                      key={sleep.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {sleep.startTime} - {sleep.endTime}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {sleep.type}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {sleep.duration.toFixed(1)}h
                      </div>
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
              <button
                className="btn-primary"
                onClick={() => setShowAddMilestone(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
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
                        Expected: {milestone.expectedDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`text-sm font-medium ${
                        milestone.achieved ? "text-green-600" : "text-gray-500"
                      }`}
                      onClick={() => toggleMilestone(milestone.id)}
                    >
                      {milestone.achieved ? "Achieved!" : "Mark Complete"}
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteMilestone(milestone.id)}
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

      {/* Add/Edit Feeding Modal */}
      {showAddFeeding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingFeeding ? "Edit Feeding" : "Add Feeding"}
              </h3>
              <button
                onClick={() =>
                  editingFeeding
                    ? cancelEditFeeding()
                    : setShowAddFeeding(false)
                }
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={feedingForm.time}
                  onChange={(e) =>
                    setFeedingForm({ ...feedingForm, time: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={feedingForm.type}
                  onChange={(e) =>
                    setFeedingForm({ ...feedingForm, type: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="Breastfeeding">Breastfeeding</option>
                  <option value="Formula">Formula</option>
                  <option value="Solid Food">Solid Food</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 15 min"
                  value={feedingForm.duration}
                  onChange={(e) =>
                    setFeedingForm({ ...feedingForm, duration: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="e.g., 120ml"
                  value={feedingForm.amount}
                  onChange={(e) =>
                    setFeedingForm({ ...feedingForm, amount: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={editingFeeding ? updateFeeding : addFeeding}
                  className="flex-1 btn-primary"
                >
                  {editingFeeding ? "Update Feeding" : "Add Feeding"}
                </button>
                <button
                  onClick={() =>
                    editingFeeding
                      ? cancelEditFeeding()
                      : setShowAddFeeding(false)
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

      {/* Add Sleep Modal */}
      {showAddSleep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Log Sleep</h3>
              <button onClick={() => setShowAddSleep(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={sleepForm.startTime}
                  onChange={(e) =>
                    setSleepForm({ ...sleepForm, startTime: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={sleepForm.endTime}
                  onChange={(e) =>
                    setSleepForm({ ...sleepForm, endTime: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={sleepForm.type}
                  onChange={(e) =>
                    setSleepForm({
                      ...sleepForm,
                      type: e.target.value as "night" | "nap",
                    })
                  }
                  className="input-field"
                >
                  <option value="night">Night Sleep</option>
                  <option value="nap">Nap</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button onClick={addSleepLog} className="flex-1 btn-primary">
                  Log Sleep
                </button>
                <button
                  onClick={() => setShowAddSleep(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {showAddMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Milestone</h3>
              <button onClick={() => setShowAddMilestone(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Milestone
                </label>
                <input
                  type="text"
                  placeholder="e.g., First Steps"
                  value={milestoneForm.title}
                  onChange={(e) =>
                    setMilestoneForm({
                      ...milestoneForm,
                      title: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Date
                </label>
                <input
                  type="text"
                  placeholder="e.g., 12 months"
                  value={milestoneForm.expectedDate}
                  onChange={(e) =>
                    setMilestoneForm({
                      ...milestoneForm,
                      expectedDate: e.target.value,
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
                  value={milestoneForm.notes}
                  onChange={(e) =>
                    setMilestoneForm({
                      ...milestoneForm,
                      notes: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={addMilestone} className="flex-1 btn-primary">
                  Add Milestone
                </button>
                <button
                  onClick={() => setShowAddMilestone(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Baby Profile</h3>
              <button onClick={() => setShowEditProfile(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Baby Name
                </label>
                <input
                  type="text"
                  value={babyInfoForm.name}
                  onChange={(e) =>
                    setBabyInfoForm({ ...babyInfoForm, name: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="e.g., 6 months"
                  value={babyInfoForm.age}
                  onChange={(e) =>
                    setBabyInfoForm({ ...babyInfoForm, age: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="e.g., 7.2 kg"
                  value={babyInfoForm.weight}
                  onChange={(e) =>
                    setBabyInfoForm({ ...babyInfoForm, weight: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  placeholder="e.g., 65 cm"
                  value={babyInfoForm.height}
                  onChange={(e) =>
                    setBabyInfoForm({ ...babyInfoForm, height: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={updateBabyInfo} className="flex-1 btn-primary">
                  Update Profile
                </button>
                <button
                  onClick={() => setShowEditProfile(false)}
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

export default Home;
