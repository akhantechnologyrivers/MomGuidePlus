import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Activity,
  Plus,
  Edit,
  Trash2,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Clock,
  Smile,
  Frown,
  Meh,
  Zap,
  BookOpen,
  Music,
  Coffee,
  Moon,
} from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: "excellent" | "good" | "neutral" | "poor" | "terrible";
  stressLevel: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  activities: string[];
}

interface WellnessActivity {
  id: string;
  name: string;
  type: "exercise" | "meditation" | "social" | "hobby" | "rest" | "other";
  duration: number; // in minutes
  mood: "excellent" | "good" | "neutral" | "poor";
  date: string;
  notes?: string;
}

interface Resource {
  id: string;
  title: string;
  type: "hotline" | "app" | "article" | "video";
  description: string;
  contact?: string;
  url?: string;
  isEmergency: boolean;
}

const MentalHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMoodEntry, setShowMoodEntry] = useState(false);
  const [showActivityEntry, setShowActivityEntry] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Mood entries state
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      date: "2023-12-15",
      mood: "good",
      stressLevel: 2,
      notes: "Feeling positive today, good energy",
      activities: ["exercise", "meditation"],
    },
    {
      id: "2",
      date: "2023-12-14",
      mood: "neutral",
      stressLevel: 3,
      notes: "A bit tired but managing well",
      activities: ["rest", "reading"],
    },
    {
      id: "3",
      date: "2023-12-13",
      mood: "excellent",
      stressLevel: 1,
      notes: "Great day! Baby was very active",
      activities: ["exercise", "social", "hobby"],
    },
  ]);

  // Wellness activities state
  const [wellnessActivities, setWellnessActivities] = useState<
    WellnessActivity[]
  >([
    {
      id: "1",
      name: "Morning Yoga",
      type: "exercise",
      duration: 30,
      mood: "excellent",
      date: "2023-12-15",
      notes: "Gentle prenatal yoga session",
    },
    {
      id: "2",
      name: "Meditation",
      type: "meditation",
      duration: 15,
      mood: "good",
      date: "2023-12-15",
    },
    {
      id: "3",
      name: "Coffee with Friend",
      type: "social",
      duration: 60,
      mood: "excellent",
      date: "2023-12-14",
      notes: "Great conversation and support",
    },
    {
      id: "4",
      name: "Reading",
      type: "hobby",
      duration: 45,
      mood: "good",
      date: "2023-12-14",
    },
  ]);

  // Resources state
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Crisis Hotline",
      type: "hotline",
      description: "24/7 Support: 1-800-273-8255",
      contact: "1-800-273-8255",
      isEmergency: true,
    },
    {
      id: "2",
      title: "Pregnancy Support",
      type: "hotline",
      description: "Specialized counseling for expectant mothers",
      contact: "1-800-944-4773",
      isEmergency: false,
    },
    {
      id: "3",
      title: "Meditation App",
      type: "app",
      description: "Guided sessions for stress relief",
      url: "https://headspace.com",
      isEmergency: false,
    },
    {
      id: "4",
      title: "Prenatal Depression Guide",
      type: "article",
      description: "Understanding and managing prenatal depression",
      url: "https://example.com/prenatal-depression",
      isEmergency: false,
    },
  ]);

  // Form states
  const [moodForm, setMoodForm] = useState({
    mood: "neutral" as MoodEntry["mood"],
    stressLevel: 3 as MoodEntry["stressLevel"],
    notes: "",
    activities: [] as string[],
  });

  const [activityForm, setActivityForm] = useState({
    name: "",
    type: "exercise" as WellnessActivity["type"],
    duration: "",
    mood: "good" as WellnessActivity["mood"],
    notes: "",
  });

  // Available activities for mood tracking
  const availableActivities = [
    "exercise",
    "meditation",
    "social",
    "hobby",
    "rest",
    "reading",
    "music",
    "nature",
    "cooking",
    "art",
    "journaling",
    "therapy",
  ];

  // Get mood data for chart
  const getMoodData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => {
      // Mock data for demo - in real app, calculate from actual mood entries
      const moodValues = {
        excellent: 5,
        good: 4,
        neutral: 3,
        poor: 2,
        terrible: 1,
      };
      const randomMood =
        Object.values(moodValues)[Math.floor(Math.random() * 5)];
      return { day, mood: randomMood };
    });
  };

  const moodData = getMoodData();

  // Add mood entry function
  const addMoodEntry = () => {
    const newMoodEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: moodForm.mood,
      stressLevel: moodForm.stressLevel,
      notes: moodForm.notes,
      activities: moodForm.activities,
    };

    setMoodEntries([newMoodEntry, ...moodEntries]);
    setMoodForm({
      mood: "neutral",
      stressLevel: 3,
      notes: "",
      activities: [],
    });
    setShowMoodEntry(false);
  };

  // Add wellness activity function
  const addWellnessActivity = () => {
    if (!activityForm.name || !activityForm.duration) return;

    const newActivity: WellnessActivity = {
      id: Date.now().toString(),
      name: activityForm.name,
      type: activityForm.type,
      duration: parseInt(activityForm.duration),
      mood: activityForm.mood,
      date: selectedDate,
      notes: activityForm.notes,
    };

    setWellnessActivities([newActivity, ...wellnessActivities]);
    setActivityForm({
      name: "",
      type: "exercise",
      duration: "",
      mood: "good",
      notes: "",
    });
    setShowActivityEntry(false);
  };

  // Toggle activity selection
  const toggleActivity = (activity: string) => {
    setMoodForm((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  // Delete functions
  const deleteMoodEntry = (id: string) => {
    setMoodEntries(moodEntries.filter((entry) => entry.id !== id));
  };

  const deleteActivity = (id: string) => {
    setWellnessActivities(
      wellnessActivities.filter((activity) => activity.id !== id)
    );
  };

  // Get mood icon
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "excellent":
        return <Smile className="w-5 h-5 text-green-500" />;
      case "good":
        return <Smile className="w-5 h-5 text-blue-500" />;
      case "neutral":
        return <Meh className="w-5 h-5 text-yellow-500" />;
      case "poor":
        return <Frown className="w-5 h-5 text-orange-500" />;
      case "terrible":
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "exercise":
        return <Activity className="w-5 h-5 text-green-500" />;
      case "meditation":
        return <Brain className="w-5 h-5 text-purple-500" />;
      case "social":
        return <Heart className="w-5 h-5 text-pink-500" />;
      case "hobby":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "rest":
        return <Moon className="w-5 h-5 text-indigo-500" />;
      default:
        return <Zap className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Calculate average mood
  const averageMood =
    moodEntries.length > 0
      ? moodEntries.reduce((sum, entry) => {
          const moodValues = {
            excellent: 5,
            good: 4,
            neutral: 3,
            poor: 2,
            terrible: 1,
          };
          return sum + moodValues[entry.mood];
        }, 0) / moodEntries.length
      : 3;

  // Calculate average stress level
  const averageStress =
    moodEntries.length > 0
      ? moodEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) /
        moodEntries.length
      : 3;

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health</h1>
        <p className="text-gray-600">
          Track your mental wellness and find support resources.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Smile className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {averageMood.toFixed(1)}
          </div>
          <div className="text-gray-600">Avg Mood</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">
            {averageStress.toFixed(1)}
          </div>
          <div className="text-gray-600">Avg Stress</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {wellnessActivities.length}
          </div>
          <div className="text-gray-600">Activities</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {moodEntries.length}
          </div>
          <div className="text-gray-600">Entries</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {["overview", "mood", "activities", "resources"].map((tab) => (
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
          {/* Weekly Mood Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Mood & Stress
            </h3>
            <div className="flex items-end justify-between h-32">
              {moodData.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center">
                  <div
                    className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t w-8 mb-2"
                    style={{ height: `${(day.mood / 5) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-indigo-600">
                {averageMood.toFixed(1)}/5
              </div>
              <div className="text-sm text-gray-600">
                Average mood this week
              </div>
            </div>
          </div>

          {/* Recent Mood Entries */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Mood Entries
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowMoodEntry(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Log Mood
              </button>
            </div>
            <div className="space-y-3">
              {moodEntries.slice(0, 5).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getMoodIcon(entry.mood)}
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {entry.mood}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Stress: {entry.stressLevel}/5
                    </div>
                    <div className="text-xs text-gray-500">
                      {entry.activities.length} activities
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mood Tab */}
      {activeTab === "mood" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Mood Tracking
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowMoodEntry(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Log Today's Mood
              </button>
            </div>

            <div className="space-y-4">
              {moodEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getMoodIcon(entry.mood)}
                      <div>
                        <div className="font-semibold text-gray-900 capitalize">
                          {entry.mood} Mood
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Stress Level:
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-3 h-3 rounded-full ${
                              level <= entry.stressLevel
                                ? "bg-red-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {entry.notes && (
                    <p className="text-gray-600 mb-3">{entry.notes}</p>
                  )}

                  {entry.activities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.activities.map((activity) => (
                        <span
                          key={activity}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Activities Tab */}
      {activeTab === "activities" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Wellness Activities
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowActivityEntry(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Log Activity
              </button>
            </div>

            <div className="space-y-4">
              {wellnessActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getActivityIcon(activity.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.name}
                      </h3>
                      <p className="text-gray-600">
                        {activity.duration} minutes
                      </p>
                      {activity.notes && (
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-600 font-medium">
                      {activity.mood}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteActivity(activity.id)}
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

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mental Health Resources
            </h3>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className={`p-4 rounded-lg ${
                    resource.isEmergency
                      ? "bg-red-50 border border-red-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4
                        className={`font-medium mb-2 ${
                          resource.isEmergency
                            ? "text-red-900"
                            : "text-gray-900"
                        }`}
                      >
                        {resource.title}
                      </h4>
                      <p
                        className={`text-sm mb-2 ${
                          resource.isEmergency
                            ? "text-red-700"
                            : "text-gray-700"
                        }`}
                      >
                        {resource.description}
                      </p>
                      {resource.contact && (
                        <p className="text-sm font-medium text-blue-600">
                          {resource.contact}
                        </p>
                      )}
                    </div>
                    {resource.isEmergency && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        Emergency
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mood Entry Modal */}
      {showMoodEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Log Your Mood</h3>
              <button onClick={() => setShowMoodEntry(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling today?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {["excellent", "good", "neutral", "poor", "terrible"].map(
                    (mood) => (
                      <button
                        key={mood}
                        onClick={() =>
                          setMoodForm({
                            ...moodForm,
                            mood: mood as MoodEntry["mood"],
                          })
                        }
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          moodForm.mood === mood
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {getMoodIcon(mood)}
                        <div className="text-xs mt-1 capitalize">{mood}</div>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level (1-5)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setMoodForm({
                          ...moodForm,
                          stressLevel: level as MoodEntry["stressLevel"],
                        })
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        moodForm.stressLevel === level
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities Today
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableActivities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        moodForm.activities.includes(activity)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="How are you feeling? Any specific thoughts or concerns?"
                  value={moodForm.notes}
                  onChange={(e) =>
                    setMoodForm({ ...moodForm, notes: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <button onClick={addMoodEntry} className="flex-1 btn-primary">
                  Log Mood
                </button>
                <button
                  onClick={() => setShowMoodEntry(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Entry Modal */}
      {showActivityEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Log Wellness Activity</h3>
              <button onClick={() => setShowActivityEntry(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Morning Yoga, Meditation"
                  value={activityForm.name}
                  onChange={(e) =>
                    setActivityForm({ ...activityForm, name: e.target.value })
                  }
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={activityForm.type}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        type: e.target.value as WellnessActivity["type"],
                      })
                    }
                    className="input-field"
                  >
                    <option value="exercise">Exercise</option>
                    <option value="meditation">Meditation</option>
                    <option value="social">Social</option>
                    <option value="hobby">Hobby</option>
                    <option value="rest">Rest</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={activityForm.duration}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        duration: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How did it make you feel?
                </label>
                <select
                  value={activityForm.mood}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      mood: e.target.value as WellnessActivity["mood"],
                    })
                  }
                  className="input-field"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="neutral">Neutral</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any thoughts about this activity..."
                  value={activityForm.notes}
                  onChange={(e) =>
                    setActivityForm({ ...activityForm, notes: e.target.value })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={addWellnessActivity}
                  className="flex-1 btn-primary"
                >
                  Log Activity
                </button>
                <button
                  onClick={() => setShowActivityEntry(false)}
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

export default MentalHealth;
