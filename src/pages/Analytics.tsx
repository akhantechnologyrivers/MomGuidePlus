import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Heart,
  Moon,
  Droplets,
  Calendar,
  Clock,
  Plus,
  Download,
  Filter,
  X,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertTriangle,
  Brain,
} from "lucide-react";

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  trend: "up" | "down" | "stable";
  change: number;
  period: string;
  category: "sleep" | "activity" | "nutrition" | "vitals" | "mental";
  status: "excellent" | "good" | "warning" | "critical";
  lastUpdated: string;
}

interface TrendData {
  date: string;
  value: number;
  target: number;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  isCompleted: boolean;
}

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Health metrics state
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: "1",
      name: "Sleep Quality",
      value: 8.2,
      unit: "hours",
      target: 8.0,
      trend: "up",
      change: 5.2,
      period: "vs last week",
      category: "sleep",
      status: "excellent",
      lastUpdated: "2023-12-15T08:00:00",
    },
    {
      id: "2",
      name: "Daily Steps",
      value: 8500,
      unit: "steps",
      target: 10000,
      trend: "up",
      change: 12.5,
      period: "vs last week",
      category: "activity",
      status: "good",
      lastUpdated: "2023-12-15T23:59:00",
    },
    {
      id: "3",
      name: "Water Intake",
      value: 2.1,
      unit: "L",
      target: 2.5,
      trend: "down",
      change: -8.3,
      period: "vs last week",
      category: "nutrition",
      status: "warning",
      lastUpdated: "2023-12-15T20:00:00",
    },
    {
      id: "4",
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      target: 70,
      trend: "stable",
      change: 0.5,
      period: "vs last week",
      category: "vitals",
      status: "good",
      lastUpdated: "2023-12-15T14:30:00",
    },
    {
      id: "5",
      name: "Stress Level",
      value: 2.8,
      unit: "/5",
      target: 2.0,
      trend: "down",
      change: -15.2,
      period: "vs last week",
      category: "mental",
      status: "good",
      lastUpdated: "2023-12-15T18:00:00",
    },
    {
      id: "6",
      name: "Blood Pressure",
      value: 120,
      unit: "/80 mmHg",
      target: 120,
      trend: "stable",
      change: 0,
      period: "vs last week",
      category: "vitals",
      status: "excellent",
      lastUpdated: "2023-12-15T09:15:00",
    },
  ]);

  // Goals state
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Increase Daily Steps",
      target: 10000,
      current: 8500,
      unit: "steps",
      deadline: "2024-01-15",
      category: "activity",
      isCompleted: false,
    },
    {
      id: "2",
      name: "Improve Sleep Quality",
      target: 8.5,
      current: 8.2,
      unit: "hours",
      deadline: "2024-01-30",
      category: "sleep",
      isCompleted: false,
    },
    {
      id: "3",
      name: "Reduce Stress Level",
      target: 2.0,
      current: 2.8,
      unit: "/5",
      deadline: "2024-02-15",
      category: "mental",
      isCompleted: false,
    },
  ]);

  // Goal form state
  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    unit: "",
    deadline: "",
    category: "activity",
  });

  // Generate trend data for charts
  const generateTrendData = (metric: HealthMetric) => {
    const days = 7;
    const data: TrendData[] = [];
    const baseValue = metric.value;
    const target = metric.target;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.max(0, baseValue * (1 + variation)),
        target: target,
      });
    }
    return data;
  };

  // Add goal function
  const addGoal = () => {
    if (
      !goalForm.name ||
      !goalForm.target ||
      !goalForm.unit ||
      !goalForm.deadline
    )
      return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalForm.name,
      target: parseFloat(goalForm.target),
      current: 0,
      unit: goalForm.unit,
      deadline: goalForm.deadline,
      category: goalForm.category,
      isCompleted: false,
    };

    setGoals([newGoal, ...goals]);
    setGoalForm({
      name: "",
      target: "",
      unit: "",
      deadline: "",
      category: "activity",
    });
    setShowGoalModal(false);
  };

  // Update goal progress
  const updateGoalProgress = (id: string, newCurrent: number) => {
    setGoals(
      goals.map((goal) => {
        const updatedGoal = { ...goal, current: newCurrent };
        if (newCurrent >= goal.target) {
          updatedGoal.isCompleted = true;
        }
        return goal.id === id ? updatedGoal : goal;
      })
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get trend icon
  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    } else if (trend === "down") {
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sleep":
        return <Moon className="w-5 h-5 text-indigo-500" />;
      case "activity":
        return <Activity className="w-5 h-5 text-green-500" />;
      case "nutrition":
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case "vitals":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "mental":
        return <Brain className="w-5 h-5 text-purple-500" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  // Calculate overall health score
  const overallHealthScore = Math.round(
    healthMetrics.reduce((sum, metric) => {
      const progress = Math.min((metric.value / metric.target) * 100, 100);
      return sum + progress;
    }, 0) / healthMetrics.length
  );

  // Get metrics by category
  const getMetricsByCategory = (category: string) => {
    return healthMetrics.filter((metric) => metric.category === category);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Health Analytics
        </h1>
        <p className="text-gray-600">Track your health metrics and progress.</p>
      </div>

      {/* Overall Health Score */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Overall Health Score
            </h2>
            <p className="text-gray-600">Based on all your health metrics</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-1">
              {overallHealthScore}%
            </div>
            <div className="text-sm text-gray-600">Excellent</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              style={{ width: `${overallHealthScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {healthMetrics.filter((m) => m.trend === "up").length}
          </div>
          <div className="text-gray-600">Improving</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {goals.filter((g) => g.isCompleted).length}/{goals.length}
          </div>
          <div className="text-gray-600">Goals Met</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {healthMetrics.length}
          </div>
          <div className="text-gray-600">Metrics Tracked</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {selectedPeriod}
          </div>
          <div className="text-gray-600">Period</div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1">
          {["day", "week", "month", "quarter"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowGoalModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {[
          "overview",
          "sleep",
          "activity",
          "nutrition",
          "vitals",
          "mental",
          "goals",
        ].map((tab) => (
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
          {healthMetrics.map((metric) => (
            <div key={metric.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(metric.category)}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {metric.name}
                    </h3>
                    <div className="text-2xl font-bold text-teal-600 mb-1">
                      {metric.value}
                      {metric.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Target: {metric.target}
                      {metric.unit}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(metric.trend, metric.change)}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up"
                        ? "text-green-600"
                        : metric.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (metric.value / metric.target) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    metric.status
                  )}`}
                >
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Category-specific tabs */}
      {["sleep", "activity", "nutrition", "vitals", "mental"].includes(
        activeTab
      ) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Metrics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {getMetricsByCategory(activeTab).map((metric) => (
                <div
                  key={metric.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {metric.name}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        metric.status
                      )}`}
                    >
                      {metric.status}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                    {metric.unit}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Target: {metric.target}
                      {metric.unit}
                    </span>
                    <span>{metric.period}</span>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (metric.value / metric.target) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Goals Tab */}
      {activeTab === "goals" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Health Goals
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowGoalModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </button>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {goal.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Target className="w-5 h-5 text-blue-500" />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {goal.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {goal.isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          goal.isCompleted ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (goal.current / goal.target) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {!goal.isCompleted && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          updateGoalProgress(
                            goal.id,
                            goal.current + goal.target * 0.1
                          )
                        }
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Update Progress
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Health Goal</h3>
              <button onClick={() => setShowGoalModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Increase Daily Steps"
                  value={goalForm.name}
                  onChange={(e) =>
                    setGoalForm({ ...goalForm, name: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={goalForm.target}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, target: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    placeholder="steps"
                    value={goalForm.unit}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, unit: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={goalForm.category}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, category: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="activity">Activity</option>
                    <option value="sleep">Sleep</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="vitals">Vitals</option>
                    <option value="mental">Mental Health</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={goalForm.deadline}
                    onChange={(e) =>
                      setGoalForm({ ...goalForm, deadline: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button onClick={addGoal} className="flex-1 btn-primary">
                  Add Goal
                </button>
                <button
                  onClick={() => setShowGoalModal(false)}
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

export default Analytics;
