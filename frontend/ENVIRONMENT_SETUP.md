# Environment Variables Setup Guide

This guide explains how to set up environment variables for both the frontend and backend of the WorkAbroadly application.

## Overview

The application is split into two separate projects:
- **Frontend** (Next.js) - Runs on port 3000
- **Backend** (Express.js) - Runs on port 8080

Each project has its own environment variables that need to be configured.

---

## Backend Environment Variables

### Location
Create a `.env` file in the `backend/` directory.

### Required Variables

\`\`\`env
# Server Configuration
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Elice API
ELICE_API_KEY=your_elice_api_key_here
ELICE_API_ENDPOINT=https://mlapi.run/1f0accc6-a96b-4bb2-9a0f-670c8aa0fd62/v1

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# OpenAI (Optional - Fallback)
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | Yes | `8080` |
| `NODE_ENV` | Environment mode | Yes | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | `http://localhost:3000` |
| `ELICE_API_KEY` | Elice API authentication key | Yes | Get from mlapi.run |
| `ELICE_API_ENDPOINT` | Elice API endpoint URL | Yes | Provided by Elice |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side) | Yes | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | `pk_test_...` |
| `OPENAI_API_KEY` | OpenAI API key (fallback) | No | Get from OpenAI |

---

## Frontend Environment Variables

### Location
Create a `.env.local` file in the root directory (same level as `package.json`).

### Required Variables

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Stripe (Public Key Only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
\`\`\`

### Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes | `http://localhost:8080` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-side) | Yes | `pk_test_...` |

**Important:** All frontend environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

---

## Getting API Keys

### Elice API
1. Visit [mlapi.run](https://mlapi.run)
2. Sign up or log in
3. Create a new API key
4. Copy the key and endpoint URL

### Stripe
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Sign up or log in
3. Get your test keys:
   - **Secret Key** (sk_test_...) - Use in backend only
   - **Publishable Key** (pk_test_...) - Use in both backend and frontend
4. For production, use live keys (sk_live_... and pk_live_...)

### OpenAI (Optional)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key

---

## Development Setup

### 1. Backend Setup
\`\`\`bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
npm install
npm run dev
\`\`\`

### 2. Frontend Setup
\`\`\`bash
# In the root directory
cp .env.local.example .env.local
# Edit .env.local and add your API keys
npm install
npm run dev
\`\`\`

### 3. Verify Setup
- Backend should be running on http://localhost:8080
- Frontend should be running on http://localhost:3000
- Test the health endpoint: http://localhost:8080/health

---

## Production Setup

### Backend
\`\`\`env
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
ELICE_API_KEY=your_production_elice_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
\`\`\`

### Frontend
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
\`\`\`

---

## Security Best Practices

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Use different keys for development and production**
3. **Keep secret keys on the server** - Never expose them in the frontend
4. **Use environment variables in deployment platforms** (Vercel, Railway, etc.)
5. **Rotate API keys regularly**
6. **Use HTTPS in production** for both frontend and backend

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend URL
- Check that both servers are running
- Verify the frontend is calling the correct backend URL

### API Key Errors
- Verify all required API keys are set
- Check for typos in variable names
- Ensure keys are valid and not expired

### Connection Errors
- Verify both servers are running on correct ports
- Check firewall settings
- Ensure `NEXT_PUBLIC_API_URL` points to the correct backend URL

---

## Support

For issues or questions:
1. Check the README files in both frontend and backend directories
2. Review the API documentation
3. Contact the development team
