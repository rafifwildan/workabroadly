# WorkAbroadly Backend

Express.js API server for WorkAbroadly - helping Indonesian professionals work abroad.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Add your environment variables to `.env`

4. Run development server:
\`\`\`bash
npm run dev
\`\`\`

Server will run on `http://localhost:3010`

## API Endpoints

### Chat
- `POST /api/chat` - Send chat message to Expat AI

### Stripe
- `GET /api/stripe/products` - Get available token packages
- `POST /api/stripe/checkout` - Create checkout session

### Health
- `GET /health` - Health check endpoint

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
