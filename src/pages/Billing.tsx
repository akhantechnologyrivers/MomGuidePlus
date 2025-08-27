import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  X,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  Star,
  Settings,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "bank_account";
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
  isActive: boolean;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  description: string;
  items: InvoiceItem[];
  pdfUrl?: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Subscription {
  id: string;
  plan: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  status: "active" | "cancelled" | "paused";
  startDate: string;
  nextBillingDate: string;
  features: string[];
  autoRenew: boolean;
}

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "credit_card",
      last4: "4242",
      brand: "Visa",
      expiryDate: "12/25",
      isDefault: true,
      isActive: true,
    },
    {
      id: "2",
      type: "credit_card",
      last4: "5555",
      brand: "Mastercard",
      expiryDate: "08/26",
      isDefault: false,
      isActive: true,
    },
  ]);

  // Invoices state
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-2023-001",
      date: "2023-12-01",
      dueDate: "2023-12-15",
      amount: 29.99,
      status: "paid",
      description: "Mom Guide Plus - Monthly Subscription",
      items: [
        {
          name: "Premium Features",
          quantity: 1,
          unitPrice: 29.99,
          total: 29.99,
        },
      ],
    },
    {
      id: "2",
      number: "INV-2023-002",
      date: "2023-11-01",
      dueDate: "2023-11-15",
      amount: 29.99,
      status: "paid",
      description: "Mom Guide Plus - Monthly Subscription",
      items: [
        {
          name: "Premium Features",
          quantity: 1,
          unitPrice: 29.99,
          total: 29.99,
        },
      ],
    },
    {
      id: "3",
      number: "INV-2023-003",
      date: "2023-10-01",
      dueDate: "2023-10-15",
      amount: 29.99,
      status: "paid",
      description: "Mom Guide Plus - Monthly Subscription",
      items: [
        {
          name: "Premium Features",
          quantity: 1,
          unitPrice: 29.99,
          total: 29.99,
        },
      ],
    },
  ]);

  // Subscription state
  const [subscription, setSubscription] = useState<Subscription>({
    id: "1",
    plan: "Premium",
    price: 29.99,
    billingCycle: "monthly",
    status: "active",
    startDate: "2023-10-01",
    nextBillingDate: "2024-01-01",
    features: [
      "Unlimited access to all features",
      "Priority customer support",
      "Advanced analytics",
      "Custom reports",
      "24/7 expert consultation",
    ],
    autoRenew: true,
  });

  // Form states
  const [paymentMethodForm, setPaymentMethodForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    isDefault: false,
  });

  // Add payment method function
  const addPaymentMethod = () => {
    if (
      !paymentMethodForm.cardNumber ||
      !paymentMethodForm.expiryDate ||
      !paymentMethodForm.cvv ||
      !paymentMethodForm.cardholderName
    )
      return;

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "credit_card",
      last4: paymentMethodForm.cardNumber.slice(-4),
      brand: "Visa", // Mock brand detection
      expiryDate: paymentMethodForm.expiryDate,
      isDefault: paymentMethodForm.isDefault,
      isActive: true,
    };

    // If this is set as default, remove default from others
    if (paymentMethodForm.isDefault) {
      setPaymentMethods(
        paymentMethods.map((method) => ({ ...method, isDefault: false }))
      );
    }

    setPaymentMethods([newPaymentMethod, ...paymentMethods]);
    setPaymentMethodForm({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      isDefault: false,
    });
    setShowAddPaymentMethod(false);
  };

  // Set default payment method
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  // Delete payment method
  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  // Cancel subscription
  const cancelSubscription = () => {
    setSubscription((prev) => ({ ...prev, status: "cancelled" }));
  };

  // Reactivate subscription
  const reactivateSubscription = () => {
    setSubscription((prev) => ({ ...prev, status: "active" }));
  };

  // Toggle auto-renew
  const toggleAutoRenew = () => {
    setSubscription((prev) => ({ ...prev, autoRenew: !prev.autoRenew }));
  };

  // Get invoice count by status
  const getInvoiceCount = (status: string) => {
    return invoices.filter((invoice) => invoice.status === status).length;
  };

  // Get total spent
  const totalSpent = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Get upcoming payment
  const upcomingPayment =
    subscription.status === "active" ? subscription.price : 0;

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Billing & Payments
        </h1>
        <p className="text-gray-600">
          Manage your subscription and payment history.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            ${totalSpent.toFixed(2)}
          </div>
          <div className="text-gray-600">Total Spent</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {getInvoiceCount("paid")}
          </div>
          <div className="text-gray-600">Paid Invoices</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {getInvoiceCount("pending")}
          </div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {paymentMethods.length}
          </div>
          <div className="text-gray-600">Payment Methods</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
        {["overview", "subscription", "payment_methods", "invoices"].map(
          (tab) => (
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
          )
        )}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Current Subscription */}
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Current Subscription
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {subscription.plan}
                </div>
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  ${subscription.price}/
                  {subscription.billingCycle === "monthly" ? "month" : "year"}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    subscription.status === "active"
                      ? "bg-green-100 text-green-800"
                      : subscription.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {subscription.status.charAt(0).toUpperCase() +
                    subscription.status.slice(1)}
                </span>
              </div>
              <button
                className="btn-primary"
                onClick={() => setShowUpgradeModal(true)}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Upgrade
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Next billing date</span>
                <span>
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Auto-renew</span>
                <button
                  onClick={toggleAutoRenew}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    subscription.autoRenew
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {subscription.autoRenew ? "On" : "Off"}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Method
            </h3>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <CreditCard className="w-8 h-8 text-gray-600" />
              <div>
                <div className="font-medium text-gray-900">
                  •••• •••• ••••{" "}
                  {paymentMethods.find((m) => m.isDefault)?.last4 || "4242"}
                </div>
                <div className="text-sm text-gray-600">
                  Expires{" "}
                  {paymentMethods.find((m) => m.isDefault)?.expiryDate ||
                    "12/25"}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-secondary w-full">
                <Edit className="w-4 h-4 mr-2" />
                Update Payment Method
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Subscription Tab */}
      {activeTab === "subscription" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Subscription Details
              </h3>
              {subscription.status === "active" ? (
                <button
                  className="text-red-600 hover:text-red-700 font-medium"
                  onClick={cancelSubscription}
                >
                  Cancel Subscription
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={reactivateSubscription}
                >
                  Reactivate
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Plan Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      ${subscription.price}/
                      {subscription.billingCycle === "monthly"
                        ? "month"
                        : "year"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium ${
                        subscription.status === "active"
                          ? "text-green-600"
                          : subscription.status === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {subscription.status.charAt(0).toUpperCase() +
                        subscription.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Billing:</span>
                    <span className="font-medium">
                      {new Date(
                        subscription.nextBillingDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                <div className="space-y-2">
                  {subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === "payment_methods" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Methods
              </h3>
              <button
                className="btn-primary"
                onClick={() => setShowAddPaymentMethod(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="w-8 h-8 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {method.brand} •••• {method.last4}
                      </div>
                      <div className="text-sm text-gray-600">
                        Expires {method.expiryDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                    {!method.isDefault && (
                      <button
                        onClick={() => setDefaultPaymentMethod(method.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deletePaymentMethod(method.id)}
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

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Invoice History
            </h3>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {invoice.description}
                      </div>
                      <div className="text-sm text-gray-600">
                        {invoice.number} •{" "}
                        {new Date(invoice.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : invoice.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Payment Method</h3>
              <button onClick={() => setShowAddPaymentMethod(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentMethodForm.cardNumber}
                  onChange={(e) =>
                    setPaymentMethodForm({
                      ...paymentMethodForm,
                      cardNumber: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentMethodForm.expiryDate}
                    onChange={(e) =>
                      setPaymentMethodForm({
                        ...paymentMethodForm,
                        expiryDate: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentMethodForm.cvv}
                    onChange={(e) =>
                      setPaymentMethodForm({
                        ...paymentMethodForm,
                        cvv: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentMethodForm.cardholderName}
                  onChange={(e) =>
                    setPaymentMethodForm({
                      ...paymentMethodForm,
                      cardholderName: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="default"
                  checked={paymentMethodForm.isDefault}
                  onChange={(e) =>
                    setPaymentMethodForm({
                      ...paymentMethodForm,
                      isDefault: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="default" className="ml-2 text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addPaymentMethod}
                  className="flex-1 btn-primary"
                >
                  Add Payment Method
                </button>
                <button
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upgrade Plan</h3>
              <button onClick={() => setShowUpgradeModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  Pro Plan
                </div>
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  $49.99/month
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Everything in Premium</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Advanced AI insights</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Priority 24/7 support</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 btn-primary">Upgrade Now</button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
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

export default Billing;
