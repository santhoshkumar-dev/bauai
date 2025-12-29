# Material Request Tracker

A modern, full-stack web application for managing construction material requests with AI-powered priority suggestions. Built with Next.js, Supabase, and TypeScript, this application provides a comprehensive solution for tracking material requests throughout their lifecycle from creation to fulfillment.

**Recent Improvements:**

As an enhancement, this application now includes real AI-based priority suggestions using Groq API and German language support (i18n) to align with BauAI's target market. The AI integration provides context-aware priority assessments, and the i18n system enables seamless language switching between English and German.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Database Schema](#-database-schema)
- [Key Components](#-key-components)
- [Authentication](#-authentication)
- [API & Data Fetching](#-api--data-fetching)
- [AI Priority Suggestion](#-ai-priority-suggestion)
- [Deployment](#deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

The Material Request Tracker is designed to streamline the material procurement process for construction companies. It enables teams to:

- Create and manage material requests with detailed specifications
- Track request status through multiple stages (pending, approved, rejected, fulfilled)
- Prioritize requests using AI-powered suggestions
- Filter and search requests by status
- Export data to CSV for reporting
- Manage user authentication and company-based access control

The application follows modern web development best practices with a focus on type safety, user experience, and maintainability.

## ✨ Features

### Core Functionality

- **Material Request Management**

  - Create new material requests with name, quantity, unit, priority, and notes
  - Edit existing requests
  - Delete requests with confirmation dialogs
  - Update request status (pending → approved → fulfilled)
  - View comprehensive request details

- **Status Tracking**

  - Four status states: `pending`, `approved`, `rejected`, `fulfilled`
  - Visual status badges with color coding
  - Status change confirmation dialogs
  - Real-time status updates

- **Priority Management**

  - Four priority levels: `low`, `medium`, `high`, `urgent`
  - **AI-powered priority suggestions** using Groq API
  - Context-aware analysis of material characteristics
  - Automatic priority recommendations with explanations
  - AI-powered priority suggestions based on material type and quantity
  - Visual priority badges
  - Manual priority override

- **Filtering & Search**

  - Filter requests by status
  - Real-time filtering with React Query
  - Statistics dashboard showing counts by status

- **Data Export**

  - Export filtered requests to CSV
  - Includes all request details and metadata
  - Formatted for easy import into spreadsheets

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Accessible components from shadcn/ui
  - Loading states and skeletons
  - Empty states for better UX
  - Error handling with user-friendly messages
  - **Internationalization (i18n)** - English and German language support
  - Language switcher in navigation
  - Localized date formatting

### Authentication & Security

- Secure user authentication with Supabase Auth
- Session management with automatic redirects
- Company-based data isolation
- Protected routes and API endpoints
- Row-level security policies

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management**: [React Hook Form 7](https://react-hook-form.com/)
- **Form Validation**: [Zod 4](https://zod.dev/)
- **Date Formatting**: [date-fns 4](https://date-fns.org/)

### Backend & Database

- **Backend as a Service**: [Supabase](https://supabase.com/)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (available for future use)

### State Management & Data Fetching

- **Server State**: [TanStack Query (React Query) 5](https://tanstack.com/query)
- **Client State**: React hooks and context

### Development Tools

- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Type Checking**: TypeScript

## 📁 Project Structure

```
bauai/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Registration page
│   ├── material-requests/        # Main application pages
│   │   ├── page.tsx              # Material requests list page
│   │   ├── loading.tsx           # Loading UI
│   │   └── error.tsx             # Error boundary
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (redirects)
│   ├── providers.tsx             # React Query provider
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── common/                   # Reusable common components
│   │   ├── EmptyState.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── PageHeader.tsx
│   ├── material-requests/       # Feature-specific components
│   │   ├── MaterialTable.tsx    # Main data table
│   │   ├── CreateRequestDialog.tsx
│   │   ├── EditRequestDialog.tsx
│   │   ├── FilterBar.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── PriorityBadge.tsx
│   │   ├── StatusDropdown.tsx
│   │   ├── RequestForm.tsx
│   │   └── ConfirmDialog.tsx
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ...
│
├── hooks/                       # Custom React hooks
│   ├── useMaterialRequests.ts   # Fetch material requests
│   ├── useCreateRequest.ts      # Create request mutation
│   ├── useUpdateRequest.ts      # Update request mutation
│   ├── useDeleteRequest.ts      # Delete request mutation
│   └── useAIPrioritySuggestion.ts # AI priority suggestion
│
├── lib/                         # Utility libraries
│   ├── supabase/
│   │   └── client.ts            # Supabase client configuration
│   ├── react-query.ts           # React Query client setup
│   ├── exportCSV.ts             # CSV export utility
│   └── utils.ts                 # General utilities
│
├── schema/                      # Zod validation schemas
│   └── materialRequest.schema.ts
│
├── types/                       # TypeScript type definitions
│   └── index.ts
│
├── supabase/                    # Supabase configuration
│   ├── schema.sql               # Database schema
│   └── functions/
│       └── get_user_emails.sql  # Database function
│
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── components.json             # shadcn/ui configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Supabase Account** (free tier works)
- **Git** (for version control)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bauai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `lib/supabase/client.ts` with your credentials (or use environment variables)

4. **Set up the database**

   - Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
   - Run the function from `supabase/functions/get_user_emails.sql`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the login page

## 🔧 Environment Setup

### Recommended: Environment Variables

For better security, move Supabase credentials to environment variables:

1. **Create `.env.local` file**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Update `lib/supabase/client.ts`**
   ```typescript
   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );
   ```

### Supabase Configuration

1. **Enable Email Authentication**

   - Go to Authentication → Providers in Supabase dashboard
   - Enable Email provider

2. **Set up Row Level Security (RLS)**

   - The schema includes RLS policies
   - Ensure policies are enabled for `material_requests` and `profiles` tables

3. **Configure Database Functions**
   - Ensure the `get_user_emails` function is created
   - Grant appropriate permissions

## 🗄 Database Schema

### Tables

#### `profiles`

Stores user profile information linked to Supabase Auth users.

```sql
- id (UUID, Primary Key, references auth.users)
- company_id (UUID, Foreign Key)
- email (TEXT)
- created_at (TIMESTAMP)
```

#### `material_requests`

Stores all material request data.

```sql
- id (UUID, Primary Key)
- project_id (UUID, Optional)
- material_name (TEXT, Required)
- quantity (NUMERIC, Required)
- unit (TEXT, Required) -- enum: kg, m, pieces, m2, m3, liters, tons
- status (TEXT, Required) -- enum: pending, approved, rejected, fulfilled
- priority (TEXT, Required) -- enum: low, medium, high, urgent
- requested_by (UUID, Foreign Key → profiles.id)
- requested_at (TIMESTAMP, Default: now())
- notes (TEXT, Optional)
- company_id (UUID, Foreign Key)
- updated_at (TIMESTAMP, Default: now())
```

### Row Level Security (RLS)

- Users can only view/edit requests from their own company
- Users can only view their own profile
- All operations require authentication

### Database Functions

- `get_user_emails(user_ids UUID[])`: Retrieves user emails from auth.users (security definer function)

## 🧩 Key Components

### Material Requests Page (`app/material-requests/page.tsx`)

The main application page that displays:

- Navigation bar with user info and sign-out
- Statistics dashboard (total, pending, approved, fulfilled)
- Filter bar for status filtering
- Material requests table
- Create and edit dialogs

### Material Table (`components/material-requests/MaterialTable.tsx`)

Displays requests in a sortable table with:

- Material name, quantity, unit
- Status dropdown with confirmation
- Priority badge
- Requested by (email)
- Requested date
- Notes (truncated)
- Action buttons (edit, delete)
- CSV export functionality

### Create Request Dialog (`components/material-requests/CreateRequestDialog.tsx`)

Form dialog for creating new requests with:

- Material name input
- Quantity and unit selection
- Priority selection with AI suggestion button
- Notes textarea
- Form validation with Zod
- Error handling

### Edit Request Dialog (`components/material-requests/EditRequestDialog.tsx`)

Similar to create dialog but pre-populated with existing request data.

### AI Priority Suggestion (`hooks/useAIPrioritySuggestion.ts`)

Currently implements rule-based priority suggestions:

- Analyzes material name (critical materials like cement, steel → urgent/high)
- Considers quantity (large quantities → higher priority)
- Returns priority level and explanation

**Note**: Currently uses simulated AI. See [Future Improvements](#future-improvements) for real AI integration.

## 🔐 Authentication

### Authentication Flow

1. **Login** (`app/auth/login/page.tsx`)

   - Email and password authentication
   - Form validation with Zod
   - Redirects to `/material-requests` on success

2. **Registration** (`app/auth/register/page.tsx`)

   - New user registration
   - Creates profile record in database
   - Auto-login after registration

3. **Session Management**
   - Automatic session checking on protected routes
   - Redirects to login if not authenticated
   - Real-time auth state changes with Supabase listeners

### Protected Routes

- `/material-requests` - Requires authentication
- All other routes redirect to login if not authenticated

## 🔌 API & Data Fetching

### React Query Hooks

All data fetching uses TanStack Query for:

- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

#### `useMaterialRequests(statusFilter?)`

Fetches material requests with optional status filtering:

- Queries `material_requests` table
- Joins with `profiles` to get user emails
- Returns `MaterialRequestWithUser[]`

#### `useCreateRequest()`

Mutation hook for creating new requests:

- Validates data with Zod schema
- Inserts into `material_requests` table
- Invalidates queries to refresh list
- Handles errors gracefully

#### `useUpdateRequest()`

Mutation hook for updating requests:

- Updates specific fields
- Optimistic updates for better UX
- Query invalidation

#### `useDeleteRequest()`

Mutation hook for deleting requests:

- Soft delete or hard delete (configurable)
- Confirmation dialog before deletion
- Query invalidation

## 🤖 AI Priority Suggestion

### Implementation

The AI priority suggestion now uses **real AI integration with Groq API** to provide context-aware priority suggestions.

**Features:**

- Uses Groq LLM API (llama-3.1-8b-instant model) for intelligent priority assessment
- Analyzes material name, quantity, unit, and optional notes
- Understands construction-specific terminology (cement, steel, insulation, etc.)
- Provides priority level (low, medium, high, urgent) with 1-2 sentence explanation
- Secure backend implementation - API key never exposed to client

**How it works:**

1. User fills in material request form (name, quantity, unit, notes)
2. Clicks "AI Suggest" button
3. Frontend calls `/api/ai/priority` route handler
4. Backend securely calls Groq API with construction-focused prompt
5. AI analyzes context and returns priority suggestion with explanation
6. Suggestion is displayed and priority field is auto-filled

**Setup:**

1. Get a Groq API key from [console.groq.com](https://console.groq.com)
2. Add to environment variables: `GROQ_API_KEY=your_key_here`
3. The API route handles all authentication and error handling

**Architecture:**

- API Route: `app/api/ai/priority/route.ts` - Secure backend endpoint
- Hook: `hooks/useAIPrioritySuggestion.ts` - React Query mutation
- UI: Integrated into `CreateRequestDialog` component

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deployment Options

#### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

#### Other Platforms

- **Netlify**: Configure build command `npm run build` and publish directory `.next`
- **Railway**: Connect GitHub repo and configure build settings
- **Docker**: Create Dockerfile for containerized deployment

### Environment Variables for Production

Ensure these are set in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `GROQ_API_KEY` - Your Groq API key (for AI priority suggestions)

## 🌍 Internationalization (i18n)

The application now supports **English and German** languages with a lightweight, dictionary-based translation system.

**Features:**

- Language switcher in navigation bar (EN / DE)
- All UI text is translatable (buttons, labels, status, priorities, etc.)
- Localized date formatting (German format when language = de)
- Language preference persisted in localStorage
- Default language detection from browser settings

**Implementation:**

- Translation files: `lib/i18n/translations/en.ts` and `lib/i18n/translations/de.ts`
- Language context: `contexts/LanguageContext.tsx`
- Language switcher: `components/common/LanguageSwitcher.tsx`
- All components use `useLanguage()` hook for translations

**Adding new languages:**

1. Create new translation file in `lib/i18n/translations/`
2. Add locale to `Locale` type in `lib/i18n/index.ts`
3. Add to translations object
4. Add option to language switcher

## 🔮 Future Improvements

### High Priority

1. ~~**Real AI Integration**~~ ✅ **COMPLETED**

   - ✅ Integrated Groq API for intelligent priority suggestions
   - ✅ Context-aware suggestions based on material characteristics
   - ✅ Natural language processing for construction terminology

2. **Project Management**

   - Full project CRUD operations
   - Link requests to specific projects
   - Project-based filtering and reporting
   - Project timelines and milestones

3. **Advanced Filtering & Search**

   - Search by material name
   - Filter by priority
   - Filter by date range
   - Filter by requester
   - Multi-criteria filtering
   - Saved filter presets

4. **Notifications & Alerts**

   - Email notifications for status changes
   - In-app notification system
   - Priority alerts for urgent requests
   - Daily/weekly digest emails

5. **Reporting & Analytics**
   - Dashboard with charts and graphs
   - Request trends over time
   - Average fulfillment time
   - Most requested materials
   - Cost tracking and budgeting

### Medium Priority

6. **User Roles & Permissions**

   - Role-based access control (Admin, Manager, Requester, Viewer)
   - Permission-based actions (who can approve, who can delete)
   - Company admin dashboard
   - User management interface

7. **Bulk Operations**

   - Bulk status updates
   - Bulk priority changes
   - Bulk export with filters
   - Bulk delete with confirmation

8. **File Attachments**

   - Attach images/documents to requests
   - Material specifications PDFs
   - Quote attachments
   - Delivery receipts

9. **Comments & Activity Log**

   - Add comments to requests
   - Activity timeline showing all changes
   - @mentions for team collaboration
   - Change history with user attribution

10. **Mobile Responsiveness**
    - Optimize for mobile devices
    - Touch-friendly interactions
    - Mobile-specific navigation
    - Progressive Web App (PWA) support

### Low Priority

11. **Internationalization (i18n)**

    - Multi-language support
    - Date/time localization
    - Currency formatting

12. **Dark Mode**

    - Theme toggle
    - System preference detection
    - Persistent theme selection

13. **Advanced Export Options**

    - PDF export with formatting
    - Excel export with multiple sheets
    - Scheduled automated exports
    - Custom export templates

14. **Integration Capabilities**

    - API endpoints for external integrations
    - Webhook support for status changes
    - Integration with procurement systems
    - Integration with accounting software

15. **Performance Optimizations**

    - Pagination for large datasets
    - Virtual scrolling for tables
    - Image optimization
    - Code splitting improvements

16. **Testing**

    - Unit tests for hooks and utilities
    - Integration tests for components
    - E2E tests with Playwright or Cypress
    - Test coverage reporting

17. **Documentation**
    - API documentation
    - Component Storybook
    - User guide
    - Developer documentation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 📞 Support

For questions, issues, or feature requests, please contact the development team or open an issue in the repository.

**Built with ❤️ using Next.js, Supabase, and TypeScript**
