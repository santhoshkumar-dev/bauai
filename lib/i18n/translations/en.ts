export const en = {
  // Navigation & Header
  nav: {
    title: "Material Request Tracker",
    signOut: "Sign Out",
  },

  // Page Headers
  pageHeader: {
    materialRequests: "Material Requests",
    materialRequestsDescription:
      "Manage and track material requests for your construction projects",
  },

  // Statistics
  stats: {
    totalRequests: "Total Requests",
    pending: "Pending",
    approved: "Approved",
    fulfilled: "Fulfilled",
  },

  // Table
  table: {
    materialName: "Material Name",
    quantity: "Quantity",
    status: "Status",
    priority: "Priority",
    requestedBy: "Requested By",
    requestedAt: "Requested At",
    notes: "Notes",
    actions: "Actions",
    exportToCSV: "Export to CSV",
    editRequest: "Edit request",
    deleteRequest: "Delete request",
  },

  // Status Labels
  status: {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    fulfilled: "Fulfilled",
  },

  // Priority Labels
  priority: {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  },

  // Buttons
  buttons: {
    newRequest: "New Request",
    createRequest: "Create Request",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    save: "Save",
    creating: "Creating...",
    saving: "Saving...",
    aiSuggest: "AI Suggest",
  },

  // Create/Edit Dialog
  form: {
    createTitle: "Create Material Request",
    createDescription:
      "Submit a new material request for your construction project.",
    editTitle: "Edit Material Request",
    editDescription: "Update the details of this material request.",
    materialName: "Material Name",
    materialNamePlaceholder: "e.g., Portland Cement, Steel Rebar",
    quantity: "Quantity",
    unit: "Unit",
    priority: "Priority",
    notes: "Notes (Optional)",
    notesPlaceholder: "Additional information about this request...",
    aiSuggestion: "AI Suggestion",
  },

  // Filter
  filter: {
    filterByStatus: "Filter by Status",
    allRequests: "All Requests",
  },

  // Empty State
  emptyState: {
    noRequestsFound: "No requests found",
    getStarted: "Get started by creating your first material request.",
  },

  // Confirmation Dialogs
  confirm: {
    statusChangeTitle: "Confirm Status Change",
    statusChangeDescription: (status: string) =>
      `Are you sure you want to change the status to "${status}"? This action cannot be undone.`,
    deleteTitle: "Delete Request",
    deleteDescription:
      "Are you sure you want to delete this request? This action cannot be undone.",
  },

  // Errors
  errors: {
    createFailed: "Failed to create request. Please try again.",
    updateFailed: "Failed to update request. Please try again.",
    deleteFailed: "Failed to delete request. Please try again.",
    aiSuggestionFailed: "Failed to get AI suggestion. Please try again.",
  },

  // Language Switcher
  language: {
    english: "English",
    german: "Deutsch",
  },
} as const;
