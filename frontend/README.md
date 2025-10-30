# WorkAbroadly

A comprehensive platform helping Indonesian professionals prepare for working abroad in Japan and South Korea, featuring an AI-powered career coach and scenario-based learning.

## Project Structure

This project is split into two separate applications:

\`\`\`
workabroadly/
├── frontend/              # Next.js frontend (port 3000)
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utilities and configurations
│   └── package.json
│
├── backend/              # Express.js backend (port 8080)
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   └── server.ts     # Express server
│   └── package.json
│
└── docs/                 # Documentation
\`\`\`

## Features

### AI Career Coach
- Personalized career guidance for working abroad
- Context-aware conversations with Expat AI
- Support for multiple career paths (Software Engineer, Designer, etc.)
- Markdown-formatted responses with proper styling

### Scenario-Based Learning
- Interactive dialogue practice
- Real-world workplace scenarios
- Feedback and performance tracking
- Cultural adaptation training

### Token System
- Purchase conversation tokens
- Stripe integration for payments
- Embedded checkout experience

### User Management
- Authentication and authorization
- Profile management
- Progress tracking

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Payments:** Stripe React SDK
- **Markdown:** react-markdown

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **AI:** Elice API (GPT-5) / OpenAI
- **Payments:** Stripe Node SDK
- **CORS:** Configured for frontend communication

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Elice API key
- Stripe account (for payments)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-org/workabroadly.git
cd workabroadly
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
npm install
npm run dev
\`\`\`

Backend will run on http://localhost:8080

### 3. Setup Frontend
\`\`\`bash
# From root directory
cp .env.local.example .env.local
# Edit .env.local and add your API keys
npm install
npm run dev
\`\`\`

Frontend will run on http://localhost:3000

### 4. Verify Setup
- Visit http://localhost:3000 to see the frontend
- Visit http://localhost:8080/health to check backend status

## Environment Variables

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed configuration guide.

### Backend (.env)
\`\`\`env
PORT=8080
FRONTEND_URL=http://localhost:3000
ELICE_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
\`\`\`

### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
\`\`\`

## Development

### Running Both Servers
\`\`\`bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
\`\`\`

### Building for Production
\`\`\`bash
# Backend
cd backend
npm run build
npm start

# Frontend
npm run build
npm start
\`\`\`

## API Documentation

### Chat Endpoint
\`\`\`
POST /api/chat
Content-Type: application/json

{
  "message": "User message",
  "role": "user"
}

Response:
{
  "reply": "AI response"
}
\`\`\`

### Stripe Checkout
\`\`\`
POST /api/stripe/checkout
Content-Type: application/json

{
  "packageId": "basic"
}

Response:
{
  "clientSecret": "cs_test_..."
}
\`\`\`

See [backend/README.md](./backend/README.md) for complete API documentation.

## Project Architecture

### Frontend Architecture
- **App Router:** Next.js 15 with server and client components
- **Component Organization:**
  - `components/chat/` - Chat interface components
  - `components/scenario/` - Scenario learning components
  - `components/shared/` - Reusable UI components
  - `components/payment/` - Stripe checkout components
- **State Management:** React hooks (useState, useEffect)
- **API Communication:** Fetch API with centralized config

### Backend Architecture
- **RESTful API:** Express.js with TypeScript
- **Route Organization:**
  - `/api/chat` - AI chat endpoints
  - `/api/stripe` - Payment processing
- **Controller Pattern:** Business logic separated from routes
- **Middleware:** CORS, JSON parsing, error handling

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `cd backend && npm run build`
4. Configure start command: `cd backend && npm start`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

## Team Structure

This split architecture supports separate teams:
- **Frontend Team:** Works on UI/UX, components, and user experience
- **Backend Team:** Works on API, business logic, and integrations

Both teams can develop independently with clear API contracts.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test both frontend and backend
4. Submit a pull request

## License

[Your License Here]

## Support

For issues or questions:
- Frontend issues: Check [frontend documentation](./README.md)
- Backend issues: Check [backend/README.md](./backend/README.md)
- Environment setup: See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
