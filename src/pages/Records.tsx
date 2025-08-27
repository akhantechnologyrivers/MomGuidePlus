import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  File,
  Image,
  FileText as FilePdf,
  Video,
  X,
  Upload,
  Folder,
} from "lucide-react";

interface MedicalRecord {
  id: string;
  name: string;
  type:
    | "lab"
    | "imaging"
    | "prescription"
    | "vaccination"
    | "consultation"
    | "other";
  category: string;
  date: string;
  doctor: string;
  size: string;
  format: string;
  description: string;
  tags: string[];
  uploadedAt: string;
  isFavorite: boolean;
}

const Records: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Records state
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      name: "Blood Test Results - December 2023",
      type: "lab",
      category: "Laboratory",
      date: "2023-12-15",
      doctor: "Dr. Sarah Wilson",
      size: "2.4 MB",
      format: "PDF",
      description: "Complete blood count, glucose, and cholesterol levels",
      tags: ["blood test", "glucose", "cholesterol"],
      uploadedAt: "2023-12-16T10:30:00",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Ultrasound - 20 Week Scan",
      type: "imaging",
      category: "Imaging",
      date: "2023-11-20",
      doctor: "Dr. Emily Rodriguez",
      size: "15.2 MB",
      format: "DICOM",
      description: "Anatomy scan showing healthy development",
      tags: ["ultrasound", "anatomy scan", "20 weeks"],
      uploadedAt: "2023-11-21T14:15:00",
      isFavorite: true,
    },
    {
      id: "3",
      name: "Prenatal Vitamin Prescription",
      type: "prescription",
      category: "Prescriptions",
      date: "2023-10-15",
      doctor: "Dr. Sarah Wilson",
      size: "0.8 MB",
      format: "PDF",
      description: "Prescription for prenatal vitamins and folic acid",
      tags: ["prescription", "vitamins", "folic acid"],
      uploadedAt: "2023-10-15T09:45:00",
      isFavorite: false,
    },
    {
      id: "4",
      name: "TDAP Vaccination Record",
      type: "vaccination",
      category: "Vaccinations",
      date: "2023-09-30",
      doctor: "Dr. Michael Chen",
      size: "1.1 MB",
      format: "PDF",
      description: "Tdap vaccination record for pregnancy",
      tags: ["vaccination", "tdap", "pregnancy"],
      uploadedAt: "2023-10-01T11:20:00",
      isFavorite: false,
    },
    {
      id: "5",
      name: "First Trimester Consultation Notes",
      type: "consultation",
      category: "Consultations",
      date: "2023-08-15",
      doctor: "Dr. Sarah Wilson",
      size: "3.2 MB",
      format: "PDF",
      description: "Detailed notes from first prenatal visit",
      tags: ["consultation", "first trimester", "prenatal"],
      uploadedAt: "2023-08-16T16:30:00",
      isFavorite: true,
    },
    {
      id: "6",
      name: "Glucose Screening Results",
      type: "lab",
      category: "Laboratory",
      date: "2023-12-10",
      doctor: "Dr. Emily Rodriguez",
      size: "1.8 MB",
      format: "PDF",
      description: "1-hour glucose screening test results",
      tags: ["glucose", "screening", "gestational diabetes"],
      uploadedAt: "2023-12-11T13:45:00",
      isFavorite: false,
    },
  ]);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "other" as MedicalRecord["type"],
    category: "",
    date: "",
    doctor: "",
    description: "",
    tags: "",
  });

  // Filter records based on active tab, search, and category
  const filteredRecords = records.filter((record) => {
    const matchesTab = activeTab === "all" || record.type === activeTab;
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || record.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(records.map((record) => record.category))),
  ];

  // Get record count by type
  const getRecordCount = (type: string) => {
    return records.filter((record) =>
      type === "all" ? true : record.type === type
    ).length;
  };

  // Add new record function
  const addRecord = () => {
    if (!uploadForm.name || !uploadForm.date || !uploadForm.doctor) return;

    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      name: uploadForm.name,
      type: uploadForm.type,
      category: uploadForm.category || uploadForm.type,
      date: uploadForm.date,
      doctor: uploadForm.doctor,
      size: "1.5 MB", // Mock size
      format: "PDF", // Mock format
      description: uploadForm.description,
      tags: uploadForm.tags
        ? uploadForm.tags.split(",").map((tag) => tag.trim())
        : [],
      uploadedAt: new Date().toISOString(),
      isFavorite: false,
    };

    setRecords([newRecord, ...records]);
    setUploadForm({
      name: "",
      type: "other",
      category: "",
      date: "",
      doctor: "",
      description: "",
      tags: "",
    });
    setShowUploadModal(false);
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setRecords(
      records.map((record) =>
        record.id === id
          ? { ...record, isFavorite: !record.isFavorite }
          : record
      )
    );
  };

  // Delete record
  const deleteRecord = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  // Get file icon based on format
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FilePdf className="w-6 h-6 text-red-500" />;
      case "dicom":
      case "jpg":
      case "png":
        return <Image className="w-6 h-6 text-blue-500" />;
      case "mp4":
      case "avi":
        return <Video className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lab":
        return "bg-blue-100 text-blue-800";
      case "imaging":
        return "bg-green-100 text-green-800";
      case "prescription":
        return "bg-purple-100 text-purple-800";
      case "vaccination":
        return "bg-yellow-100 text-yellow-800";
      case "consultation":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Medical Records
        </h1>
        <p className="text-gray-600">
          Access and manage your medical documents.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {getRecordCount("all")}
          </div>
          <div className="text-gray-600">Total</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {getRecordCount("lab")}
          </div>
          <div className="text-gray-600">Lab Results</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {getRecordCount("imaging")}
          </div>
          <div className="text-gray-600">Imaging</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {getRecordCount("prescription")}
          </div>
          <div className="text-gray-600">Prescriptions</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-600 mb-1">
            {getRecordCount("consultation")}
          </div>
          <div className="text-gray-600">Consultations</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "list"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              List
            </button>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Record
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {[
          { key: "all", label: "All Records" },
          { key: "lab", label: "Lab Results" },
          { key: "imaging", label: "Imaging" },
          { key: "prescription", label: "Prescriptions" },
          { key: "vaccination", label: "Vaccinations" },
          { key: "consultation", label: "Consultations" },
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
            {tab.label} ({getRecordCount(tab.key)})
          </button>
        ))}
      </div>

      {/* Records Display */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No records found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters."
                : "Upload your first medical record to get started."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(record.format)}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {record.name}
                      </h3>
                      <p className="text-xs text-gray-500">{record.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(record.id)}
                      className={`text-sm ${
                        record.isFavorite ? "text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => deleteRecord(record.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      record.type
                    )}`}
                  >
                    {record.type}
                  </span>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {record.description}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(record.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {record.doctor}
                  </div>
                </div>

                {record.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {record.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {record.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{record.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(record.format)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {record.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            record.type
                          )}`}
                        >
                          {record.type}
                        </span>
                        {record.isFavorite && (
                          <span className="text-yellow-500">★</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {record.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{record.size}</span>
                        <span>•</span>
                        <span>
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-500 hover:text-green-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteRecord(record.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Medical Record</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Blood Test Results - December 2023"
                  value={uploadForm.name}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, name: e.target.value })
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
                    value={uploadForm.type}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        type: e.target.value as MedicalRecord["type"],
                      })
                    }
                    className="input-field"
                  >
                    <option value="lab">Lab Results</option>
                    <option value="imaging">Imaging</option>
                    <option value="prescription">Prescription</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={uploadForm.date}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, date: e.target.value })
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
                  value={uploadForm.doctor}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, doctor: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of the record..."
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      description: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., blood test, glucose, cholesterol"
                  value={uploadForm.tags}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, tags: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG, DICOM files up to 50MB
                </p>
              </div>
              <div className="flex space-x-3">
                <button onClick={addRecord} className="flex-1 btn-primary">
                  Upload Record
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
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

export default Records;
