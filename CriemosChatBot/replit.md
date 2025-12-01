# Criemos Chat Application

## Overview

A WhatsApp Web-style customer service chatbot application for Criemos, a baby carrier company. The application provides a clean, familiar chat interface where customers can ask questions about products, shipping, and speak with advisors through an AI-powered assistant.

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- Backend: Express.js + Node.js
- UI: shadcn/ui components with Tailwind CSS
- Database: Configured for Drizzle ORM with PostgreSQL (schema defined but not actively used)
- Integration: n8n webhook for AI chatbot responses

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based React Application**
- Single-page application (SPA) using Wouter for client-side routing
- Component hierarchy follows atomic design principles with reusable UI components
- State management handled through React hooks (`useChat`, `useState`, `useEffect`)
- TanStack Query (React Query) for server state management with custom query client configuration

**UI Design System**
- Based on shadcn/ui component library (New York style variant)
- WhatsApp Web aesthetic with green user bubbles (#DCF8C6) and white bot bubbles
- Responsive layout with mobile-first approach (breakpoint at 768px)
- Custom CSS variables for theming in HSL format, supporting light/dark modes
- Tailwind CSS for utility-first styling with custom border radius and color palette

**Chat Interface Components**
- `ChatPage`: Main container orchestrating the chat experience
- `ChatHeader`: Displays brand name "Criemos" with Baby icon and theme toggle
- `ChatMessages`: Scrollable message area with auto-scroll to latest message
- `MessageBubble`: Individual message display with timestamps and read indicators
- `ChatInput`: Text input with send button, supports Enter key submission
- `QuickReplies`: Preset buttons for common actions (Ver mochilas, Consultar envíos, Hablar con asesor)
- `TypingIndicator`: Animated dots showing bot is composing response

**State Management Pattern**
- Local storage persistence for chat history and session ID
- Session-based user identification using generated web session IDs
- Message state stored in component state and synchronized with localStorage
- Welcome message automatically shown on first visit

### Backend Architecture

**Express.js Server**
- RESTful API structure with single `/api/chat` endpoint
- Middleware stack: JSON body parsing with raw body preservation, URL encoding, request logging
- Production build uses esbuild for server bundling with selective dependency bundling
- Development mode integrates Vite dev server with HMR support

**API Design**
- POST `/api/chat`: Accepts user messages, forwards to n8n webhook, returns bot responses
- Request validation using Zod schemas for type safety
- Graceful degradation when webhook URL not configured (returns helpful fallback message)
- Error handling with structured error responses

**Webhook Integration Pattern**
- n8n webhook URL configured via `N8N_WEBHOOK_URL` environment variable
- Forwards user messages with session ID and channel identifier
- Expects JSON response with `text` and optional `quickReplies` array
- Fallback behavior for missing webhook provides informative user guidance

**Server Organization**
- `routes.ts`: API endpoint definitions and webhook proxy logic
- `static.ts`: Serves built frontend assets and handles SPA fallback routing
- `storage.ts`: Abstraction layer for configuration (currently environment variables)
- `vite.ts`: Development server setup with Vite middleware integration

### External Dependencies

**n8n Workflow Automation**
- Primary integration point for AI chatbot logic
- Webhook-based communication pattern
- Expected to handle natural language processing and response generation
- Required configuration: `N8N_WEBHOOK_URL` environment variable

**Database Setup**
- Drizzle ORM configured for PostgreSQL
- Connection via `DATABASE_URL` environment variable (Neon serverless driver)
- Schema defined in `shared/schema.ts` but not actively used in current implementation
- Migration system set up but no tables currently required for core chat functionality

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- Class Variance Authority (CVA) for component variant management
- CMDK for command palette patterns (included but not actively used)

**Build & Development Tools**
- Vite for fast development server and optimized production builds
- esbuild for server-side code bundling
- TypeScript with strict mode for type safety
- Replit-specific plugins for development banner and error overlay

**Font & Styling**
- Google Fonts: Open Sans (weights 400, 500, 600, 700)
- PostCSS with Tailwind CSS and Autoprefixer
- Custom CSS animations for typing indicator and other micro-interactions