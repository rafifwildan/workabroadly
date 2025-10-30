# WorkAbroadly Architecture Documentation

## Overview

WorkAbroadly is built as a modern web application with a clear separation between frontend and backend, allowing for independent development, scaling, and deployment.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
│                     (http://localhost:3000)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Frontend (Next.js 15)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App Router                                           │  │
│  │  ├── /career-coach    (AI Chat Interface)           │  │
│  │  ├── /scenario        (Learning Scenarios)           │  │
│  │  ├── /dashboard       (User Dashboard)               │  │
│  │  ├── /tokens/buy      (Token Purchase)               │  │
│  │  └── /profile         (User Profile)                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                           │  │
│  │  ├── chat/            (Chat UI components)           │  │
│  │  ├── scenario/        (Scenario components)          │  │
│  │  ├── shared/          (Reusable components)          │  │
│  │  └── payment/         (Stripe checkout)              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ REST API
                             │ (CORS enabled)
                             │
┌────────────────────────────▼────────────────────────────────┐
│                   Backend (Express.js)                       │
│                  (http://localhost:8080)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                           │  │
│  │  ├── POST /api/chat           (Chat with AI)        │  │
│  │  ├── POST /api/stripe/checkout (Create session)     │  │
│  │  └── GET  /health             (Health check)        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers                                          │  │
│  │  ├── chatController    (AI logic)                    │  │
│  │  └── stripeController (Payment logic)                │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌───────────────────┐     ┌──────────────────┐
    │   Elice API       │     │   Stripe API     │
    │   (GPT-5 Model)   │     │   (Payments)     │
    └───────────────────┘     └──────────────────┘
\`\`\`

## Technology Stack

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework | 15.x |
| React | UI library | 19.x |
| TypeScript | Type safety | 5.x |
| Tailwind CSS | Styling | 4.x |
| shadcn/ui | UI components | Latest |
| react-markdown | Markdown rendering | Latest |
| Stripe React | Payment UI | Latest |

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Express.js | Web framework | 4.x |
| TypeScript | Type safety | 5.x |
| OpenAI SDK | AI integration | Latest |
| Stripe Node | Payment processing | Latest |
| CORS | Cross-origin requests | Latest |
| dotenv | Environment variables | Latest |

## Data Flow

### Chat Flow
\`\`\`
1. User types message in frontend
   ↓
2. Frontend sends POST to /api/chat
   ↓
3. Backend receives request
   ↓
4. Backend calls Elice API with Expat AI prompt
   ↓
5. Elice API returns AI response
   ↓
6. Backend formats and returns response
   ↓
7. Frontend displays AI message with markdown rendering
\`\`\`

### Payment Flow
\`\`\`
1. User selects token package
   ↓
2. Frontend calls POST /api/stripe/checkout
   ↓
3. Backend creates Stripe checkout session
   ↓
4. Backend returns client secret
   ↓
5. Frontend displays Stripe embedded checkout
   ↓
6. User completes payment
   ↓
7. Stripe webhook notifies backend (future)
   ↓
8. Backend updates user tokens (future)
\`\`\`

## Component Organization

### Frontend Components

\`\`\`
components/
├── chat/
│   ├── ChatArea.tsx          # Message display area
│   ├── ChatInputBar.tsx      # Message input
│   ├── ChatSidebar.tsx       # Role selection sidebar
│   └── MessageBubble.tsx     # Individual message with markdown
│
├── scenario/
│   ├── DialogueBox.tsx       # Scenario dialogue display
│   ├── FeedbackModal.tsx     # Performance feedback
│   └── SummaryPanel.tsx      # Scenario summary
│
├── shared/
│   ├── ConfirmationModal.tsx # Reusable modal
│   └── theme-provider.tsx    # Theme context
│
├── payment/
│   └── Checkout.tsx          # Stripe checkout wrapper
│
└── ui/                       # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    └── ...
\`\`\`

### Backend Structure

\`\`\`
backend/src/
├── routes/
│   ├── chat.ts              # Chat route definitions
│   └── stripe.ts            # Stripe route definitions
│
├── controllers/
│   ├── chatController.ts    # Chat business logic
│   └── stripeController.ts  # Payment business logic
│
└── server.ts                # Express app setup
\`\`\`

## API Design

### RESTful Principles
- **Resource-based URLs:** `/api/chat`, `/api/stripe/checkout`
- **HTTP methods:** POST for actions, GET for retrieval
- **JSON format:** All requests and responses use JSON
- **Error handling:** Consistent error response format

### Request/Response Format

**Chat Request:**
\`\`\`json
{
  "message": "How do I prepare for a job interview in Japan?",
  "role": "user"
}
\`\`\`

**Chat Response:**
\`\`\`json
{
  "reply": "# 🎯 Persiapan Interview di Jepang\n\n..."
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "error": "Error message",
  "userMessage": "User-friendly message"
}
\`\`\`

## Security Considerations

### Frontend Security
- **Environment variables:** Only `NEXT_PUBLIC_*` variables exposed to browser
- **API keys:** Stripe publishable key only (not secret key)
- **HTTPS:** Required in production
- **Input validation:** Client-side validation for UX

### Backend Security
- **CORS:** Restricted to frontend URL only
- **API keys:** Stored in environment variables, never exposed
- **Rate limiting:** Should be implemented (future)
- **Input validation:** Server-side validation for security
- **Error handling:** Don't expose sensitive information in errors

## Scalability

### Horizontal Scaling
- **Frontend:** Can be deployed to multiple edge locations (Vercel)
- **Backend:** Can run multiple instances behind a load balancer
- **Stateless:** Both frontend and backend are stateless

### Performance Optimization
- **Frontend:**
  - Next.js automatic code splitting
  - Image optimization
  - Static generation where possible
  - Client-side caching with SWR (future)

- **Backend:**
  - Response caching (future)
  - Database connection pooling (when added)
  - Async/await for non-blocking operations

## Development Workflow

### Local Development
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev`
3. Both servers run independently
4. Frontend calls backend via `http://localhost:8080`

### Team Collaboration
- **Frontend team:** Works on UI/UX, components, pages
- **Backend team:** Works on API, business logic, integrations
- **API contract:** Defined and documented for both teams
- **Independent deployment:** Teams can deploy independently

## Deployment Architecture

### Production Setup
\`\`\`
┌─────────────────────────────────────────┐
│         CDN (Vercel Edge Network)       │
│              Frontend Assets             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Frontend (Vercel/Netlify)          │
│      https://workabroadly.com           │
└────────────────┬────────────────────────┘
                 │
                 │ HTTPS
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Backend (Railway/Render)           │
│      https://api.workabroadly.com       │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────┐           ┌──────────────┐
│ Elice   │           │   Stripe     │
│  API    │           │     API      │
└─────────┘           └──────────────┘
\`\`\`

## Future Enhancements

### Planned Features
1. **Database Integration:** PostgreSQL/Supabase for user data
2. **Authentication:** JWT-based auth system
3. **WebSocket:** Real-time chat updates
4. **Caching:** Redis for API response caching
5. **Rate Limiting:** Protect API from abuse
6. **Monitoring:** Error tracking and performance monitoring
7. **Testing:** Unit and integration tests

### Scalability Improvements
1. **Load Balancing:** Multiple backend instances
2. **CDN:** Static asset delivery
3. **Database Replication:** Read replicas for scaling
4. **Microservices:** Split backend into smaller services (if needed)

## Conclusion

This architecture provides:
- **Separation of concerns:** Clear boundaries between frontend and backend
- **Independent scaling:** Scale frontend and backend separately
- **Team autonomy:** Teams can work independently
- **Flexibility:** Easy to swap technologies or add features
- **Maintainability:** Clear structure and organization
