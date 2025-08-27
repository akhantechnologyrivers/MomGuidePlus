import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Watch,
  Activity,
  Battery,
  Wifi,
  WifiOff,
  Plus,
  Settings,
  Trash2,
  RefreshCw,
  Bluetooth,
  BluetoothOff,
  Zap,
  AlertTriangle,
  CheckCircle,
  X,
  Download,
  Upload,
  Power,
  Signal,
  Heart,
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  type:
    | "smartphone"
    | "smartwatch"
    | "fitness_tracker"
    | "blood_pressure"
    | "glucose_monitor"
    | "thermometer"
    | "scale"
    | "other";
  brand: string;
  model: string;
  batteryLevel: number;
  isConnected: boolean;
  lastSync: string;
  syncStatus: "synced" | "syncing" | "failed" | "disconnected";
  dataTypes: string[];
  firmwareVersion: string;
  isFavorite: boolean;
  notes?: string;
}

interface SyncLog {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  status: "success" | "failed" | "partial";
  dataPoints: number;
  duration: number; // in seconds
  error?: string;
}

const Devices: React.FC = () => {
  const [activeTab, setActiveTab] = useState("connected");
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Devices state
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Apple Watch Series 8",
      type: "smartwatch",
      brand: "Apple",
      model: "Series 8",
      batteryLevel: 85,
      isConnected: true,
      lastSync: "2023-12-15T14:30:00",
      syncStatus: "synced",
      dataTypes: ["heart_rate", "activity", "sleep", "ecg"],
      firmwareVersion: "9.2.1",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Fitbit Charge 5",
      type: "fitness_tracker",
      brand: "Fitbit",
      model: "Charge 5",
      batteryLevel: 45,
      isConnected: true,
      lastSync: "2023-12-15T12:15:00",
      syncStatus: "synced",
      dataTypes: ["steps", "heart_rate", "sleep", "stress"],
      firmwareVersion: "58.20001.157.51",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Omron Blood Pressure Monitor",
      type: "blood_pressure",
      brand: "Omron",
      model: "Complete",
      batteryLevel: 92,
      isConnected: false,
      lastSync: "2023-12-14T09:45:00",
      syncStatus: "disconnected",
      dataTypes: ["blood_pressure", "pulse"],
      firmwareVersion: "1.2.0",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Freestyle Libre 2",
      type: "glucose_monitor",
      brand: "Abbott",
      model: "Libre 2",
      batteryLevel: 78,
      isConnected: true,
      lastSync: "2023-12-15T16:20:00",
      syncStatus: "syncing",
      dataTypes: ["glucose", "trends"],
      firmwareVersion: "2.1.4",
      isFavorite: false,
    },
    {
      id: "5",
      name: "Withings Body+ Scale",
      type: "scale",
      brand: "Withings",
      model: "Body+",
      batteryLevel: 15,
      isConnected: true,
      lastSync: "2023-12-15T07:30:00",
      syncStatus: "failed",
      dataTypes: ["weight", "body_fat", "muscle_mass"],
      firmwareVersion: "3.0.1",
      isFavorite: false,
      notes: "Low battery - needs replacement",
    },
  ]);

  // Sync logs state
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([
    {
      id: "1",
      deviceId: "1",
      deviceName: "Apple Watch Series 8",
      timestamp: "2023-12-15T14:30:00",
      status: "success",
      dataPoints: 1250,
      duration: 45,
    },
    {
      id: "2",
      deviceId: "2",
      deviceName: "Fitbit Charge 5",
      timestamp: "2023-12-15T12:15:00",
      status: "success",
      dataPoints: 890,
      duration: 32,
    },
    {
      id: "3",
      deviceId: "5",
      deviceName: "Withings Body+ Scale",
      timestamp: "2023-12-15T07:30:00",
      status: "failed",
      dataPoints: 0,
      duration: 0,
      error: "Connection timeout",
    },
  ]);

  // Add device form state
  const [addDeviceForm, setAddDeviceForm] = useState({
    name: "",
    type: "other" as Device["type"],
    brand: "",
    model: "",
    dataTypes: [] as string[],
    notes: "",
  });

  // Available data types
  const availableDataTypes = [
    "heart_rate",
    "activity",
    "sleep",
    "steps",
    "blood_pressure",
    "glucose",
    "weight",
    "temperature",
    "ecg",
    "stress",
    "oxygen",
  ];

  // Filter devices based on active tab and search
  const filteredDevices = devices.filter((device) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "connected" && device.isConnected) ||
      (activeTab === "disconnected" && !device.isConnected);
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get device count by status
  const getDeviceCount = (status: string) => {
    switch (status) {
      case "connected":
        return devices.filter((device) => device.isConnected).length;
      case "disconnected":
        return devices.filter((device) => !device.isConnected).length;
      case "low_battery":
        return devices.filter((device) => device.batteryLevel <= 20).length;
      default:
        return devices.length;
    }
  };

  // Add device function
  const addDevice = () => {
    if (!addDeviceForm.name || !addDeviceForm.brand || !addDeviceForm.model)
      return;

    const newDevice: Device = {
      id: Date.now().toString(),
      name: addDeviceForm.name,
      type: addDeviceForm.type,
      brand: addDeviceForm.brand,
      model: addDeviceForm.model,
      batteryLevel: 100,
      isConnected: false,
      lastSync: new Date().toISOString(),
      syncStatus: "disconnected",
      dataTypes: addDeviceForm.dataTypes,
      firmwareVersion: "1.0.0",
      isFavorite: false,
      notes: addDeviceForm.notes,
    };

    setDevices([newDevice, ...devices]);
    setAddDeviceForm({
      name: "",
      type: "other",
      brand: "",
      model: "",
      dataTypes: [],
      notes: "",
    });
    setShowAddDevice(false);
  };

  // Toggle device connection
  const toggleConnection = (id: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? {
              ...device,
              isConnected: !device.isConnected,
              syncStatus: !device.isConnected ? "synced" : "disconnected",
            }
          : device
      )
    );
  };

  // Sync device
  const syncDevice = async (id: string) => {
    const device = devices.find((d) => d.id === id);
    if (!device) return;

    setSyncingDevice(id);
    setDevices(
      devices.map((d) => (d.id === id ? { ...d, syncStatus: "syncing" } : d))
    );

    // Simulate sync process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      const newSyncLog: SyncLog = {
        id: Date.now().toString(),
        deviceId: id,
        deviceName: device.name,
        timestamp: new Date().toISOString(),
        status: success ? "success" : "failed",
        dataPoints: success ? Math.floor(Math.random() * 1000) + 100 : 0,
        duration: Math.floor(Math.random() * 60) + 10,
        error: success ? undefined : "Connection failed",
      };

      setSyncLogs([newSyncLog, ...syncLogs]);
      setDevices(
        devices.map((d) =>
          d.id === id
            ? {
                ...d,
                syncStatus: success ? "synced" : "failed",
                lastSync: new Date().toISOString(),
              }
            : d
        )
      );
      setSyncingDevice(null);
    }, 2000);
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? { ...device, isFavorite: !device.isFavorite }
          : device
      )
    );
  };

  // Delete device
  const deleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  // Get device icon
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smartphone":
        return <Smartphone className="w-6 h-6 text-blue-500" />;
      case "smartwatch":
        return <Watch className="w-6 h-6 text-green-500" />;
      case "fitness_tracker":
        return <Activity className="w-6 h-6 text-purple-500" />;
      case "blood_pressure":
        return <Heart className="w-6 h-6 text-red-500" />;
      case "glucose_monitor":
        return <Zap className="w-6 h-6 text-yellow-500" />;
      case "scale":
        return <Activity className="w-6 h-6 text-indigo-500" />;
      default:
        return <Smartphone className="w-6 h-6 text-gray-500" />;
    }
  };

  // Get sync status icon
  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "syncing":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-gray-500" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get battery icon
  const getBatteryIcon = (level: number) => {
    if (level <= 20) return <Battery className="w-4 h-4 text-red-500" />;
    if (level <= 50) return <Battery className="w-4 h-4 text-yellow-500" />;
    return <Battery className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Connected Devices
        </h1>
        <p className="text-gray-600">
          Manage your health devices and wearables.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {getDeviceCount("all")}
          </div>
          <div className="text-gray-600">Total Devices</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Wifi className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {getDeviceCount("connected")}
          </div>
          <div className="text-gray-600">Connected</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <WifiOff className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">
            {getDeviceCount("disconnected")}
          </div>
          <div className="text-gray-600">Disconnected</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Battery className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {getDeviceCount("low_battery")}
          </div>
          <div className="text-gray-600">Low Battery</div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button className="btn-primary" onClick={() => setShowAddDevice(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {[
          { key: "all", label: "All Devices" },
          { key: "connected", label: "Connected" },
          { key: "disconnected", label: "Disconnected" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary-500 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label} ({getDeviceCount(tab.key)})
          </button>
        ))}
      </div>

      {/* Devices List */}
      <div className="space-y-4">
        {filteredDevices.length === 0 ? (
          <div className="card text-center py-12">
            <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No devices found
            </h3>
            <p className="text-gray-600">
              {searchTerm || activeTab !== "all"
                ? "Try adjusting your search or filters."
                : "Add your first health device to get started."}
            </p>
          </div>
        ) : (
          filteredDevices.map((device) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getDeviceIcon(device.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {device.name}
                      </h3>
                      {device.isFavorite && (
                        <span className="text-yellow-500">★</span>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          device.isConnected
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {device.isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <strong>Brand:</strong> {device.brand} {device.model}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Firmware:</strong> {device.firmwareVersion}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Data Types:</strong>{" "}
                          {device.dataTypes.join(", ")}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          {getBatteryIcon(device.batteryLevel)}
                          <span className="ml-2">
                            Battery: {device.batteryLevel}%
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          {getSyncStatusIcon(device.syncStatus)}
                          <span className="ml-2 capitalize">
                            {device.syncStatus}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Last Sync:</strong>{" "}
                          {new Date(device.lastSync).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {device.notes && (
                      <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg mb-3">
                        <strong>Notes:</strong> {device.notes}
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleConnection(device.id)}
                        className={`text-sm font-medium flex items-center ${
                          device.isConnected ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {device.isConnected ? (
                          <WifiOff className="w-4 h-4 mr-1" />
                        ) : (
                          <Wifi className="w-4 h-4 mr-1" />
                        )}
                        {device.isConnected ? "Disconnect" : "Connect"}
                      </button>
                      {device.isConnected && (
                        <button
                          onClick={() => syncDevice(device.id)}
                          disabled={syncingDevice === device.id}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center disabled:opacity-50"
                        >
                          <RefreshCw
                            className={`w-4 h-4 mr-1 ${
                              syncingDevice === device.id ? "animate-spin" : ""
                            }`}
                          />
                          {syncingDevice === device.id
                            ? "Syncing..."
                            : "Sync Now"}
                        </button>
                      )}
                      <button
                        onClick={() => toggleFavorite(device.id)}
                        className={`text-sm ${
                          device.isFavorite
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-600">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteDevice(device.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Device</h3>
              <button onClick={() => setShowAddDevice(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Apple Watch Series 8"
                  value={addDeviceForm.name}
                  onChange={(e) =>
                    setAddDeviceForm({ ...addDeviceForm, name: e.target.value })
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
                    value={addDeviceForm.type}
                    onChange={(e) =>
                      setAddDeviceForm({
                        ...addDeviceForm,
                        type: e.target.value as Device["type"],
                      })
                    }
                    className="input-field"
                  >
                    <option value="smartphone">Smartphone</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="fitness_tracker">Fitness Tracker</option>
                    <option value="blood_pressure">
                      Blood Pressure Monitor
                    </option>
                    <option value="glucose_monitor">Glucose Monitor</option>
                    <option value="scale">Smart Scale</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Apple, Fitbit"
                    value={addDeviceForm.brand}
                    onChange={(e) =>
                      setAddDeviceForm({
                        ...addDeviceForm,
                        brand: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="e.g., Series 8, Charge 5"
                  value={addDeviceForm.model}
                  onChange={(e) =>
                    setAddDeviceForm({
                      ...addDeviceForm,
                      model: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Types
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDataTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        const newTypes = addDeviceForm.dataTypes.includes(type)
                          ? addDeviceForm.dataTypes.filter((t) => t !== type)
                          : [...addDeviceForm.dataTypes, type];
                        setAddDeviceForm({
                          ...addDeviceForm,
                          dataTypes: newTypes,
                        });
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        addDeviceForm.dataTypes.includes(type)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any additional notes about this device..."
                  value={addDeviceForm.notes}
                  onChange={(e) =>
                    setAddDeviceForm({
                      ...addDeviceForm,
                      notes: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button onClick={addDevice} className="flex-1 btn-primary">
                  Add Device
                </button>
                <button
                  onClick={() => setShowAddDevice(false)}
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

export default Devices;
