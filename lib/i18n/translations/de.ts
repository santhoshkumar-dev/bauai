export const de = {
  // Navigation & Header
  nav: {
    title: "Materialanforderungs-Tracker",
    signOut: "Abmelden",
  },

  // Page Headers
  pageHeader: {
    materialRequests: "Materialanforderungen",
    materialRequestsDescription:
      "Verwalten und verfolgen Sie Materialanfragen für Ihre Bauprojekte",
  },

  // Statistics
  stats: {
    totalRequests: "Gesamte Anfragen",
    pending: "Ausstehend",
    approved: "Genehmigt",
    fulfilled: "Erfüllt",
  },

  // Table
  table: {
    materialName: "Materialname",
    quantity: "Menge",
    status: "Status",
    priority: "Priorität",
    requestedBy: "Angefragt von",
    requestedAt: "Angefragt am",
    notes: "Notizen",
    actions: "Aktionen",
    exportToCSV: "Als CSV exportieren",
    editRequest: "Anfrage bearbeiten",
    deleteRequest: "Anfrage löschen",
  },

  // Status Labels
  status: {
    pending: "Ausstehend",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    fulfilled: "Erfüllt",
  },

  // Priority Labels
  priority: {
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    urgent: "Dringend",
  },

  // Buttons
  buttons: {
    newRequest: "Neue Anfrage",
    createRequest: "Anfrage erstellen",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    delete: "Löschen",
    save: "Speichern",
    creating: "Wird erstellt...",
    saving: "Wird gespeichert...",
    aiSuggest: "KI vorschlagen",
  },

  // Create/Edit Dialog
  form: {
    createTitle: "Materialanfrage erstellen",
    createDescription:
      "Übermitteln Sie eine neue Materialanfrage für Ihr Bauprojekt.",
    editTitle: "Materialanfrage bearbeiten",
    editDescription: "Aktualisieren Sie die Details dieser Materialanfrage.",
    materialName: "Materialname",
    materialNamePlaceholder: "z.B. Portlandzement, Stahlbewehrung",
    quantity: "Menge",
    unit: "Einheit",
    priority: "Priorität",
    notes: "Notizen (Optional)",
    notesPlaceholder: "Zusätzliche Informationen zu dieser Anfrage...",
    aiSuggestion: "KI-Vorschlag",
  },

  // Filter
  filter: {
    filterByStatus: "Nach Status filtern",
    allRequests: "Alle Anfragen",
  },

  // Empty State
  emptyState: {
    noRequestsFound: "Keine Anfragen gefunden",
    getStarted: "Erstellen Sie Ihre erste Materialanfrage, um zu beginnen.",
  },

  // Confirmation Dialogs
  confirm: {
    statusChangeTitle: "Statusänderung bestätigen",
    statusChangeDescription: (status: string) =>
      `Sind Sie sicher, dass Sie den Status auf "${status}" ändern möchten? Diese Aktion kann nicht rückgängig gemacht werden.`,
    deleteTitle: "Anfrage löschen",
    deleteDescription:
      "Sind Sie sicher, dass Sie diese Anfrage löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
  },

  // Errors
  errors: {
    createFailed:
      "Anfrage konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
    updateFailed:
      "Anfrage konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
    deleteFailed:
      "Anfrage konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.",
    aiSuggestionFailed:
      "KI-Vorschlag konnte nicht abgerufen werden. Bitte versuchen Sie es erneut.",
  },

  // Language Switcher
  language: {
    english: "English",
    german: "Deutsch",
  },
} as const;
