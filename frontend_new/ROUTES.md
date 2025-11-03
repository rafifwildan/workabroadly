# WorkAbroadly Application Routes

## User Journey & Available Routes

### Public Routes (No Authentication Required)

#### Landing & Marketing
- `/` - Homepage with hero, features, pricing, and FAQ
- `/contact` - Contact form and support information

#### Authentication
- `/login` - User login page (includes demo account button)
- `/signup` - User registration page
- `/logout` - Logout handler

---

### Authenticated Routes (Login Required)

#### Dashboard & Home
- `/dashboard` - Main dashboard after login (default landing page)
  - Shows credits balance, plan tier
  - Quick access cards to Role-Play and AI Chat
  - Recent activity feed
- `/home` - Alternative home page

#### Core Features

**AI Career Coach / Expat Chat Bot**
- `/career-coach` - AI-powered chat interface for career guidance
  - Visa requirements help
  - Job search strategies
  - Workplace communication advice
  - Cultural adaptation guidance

**Cultural Role-Play Scenarios**
- `/role-play` - Scenario library (browse all scenarios)
  - Filter by country (Japan/Korea)
  - Filter by difficulty
  - Categories: Pre-Departure, Workplace, Daily Life, Emergency
- `/scenario/[id]` - Individual scenario detail page
  - Scenario description
  - Learning objectives
  - Cultural tips
  - Preparation checklist
- `/scenario/[id]/simulation` - Active role-play session
  - Interactive conversation with AI characters
  - Real-time cultural feedback
  - Multiple choice responses
- `/scenario/[id]/results` - Scenario completion results
  - Performance score
  - Strengths and areas to improve
  - Recommendations for next scenarios

#### User Management
- `/profile` - User profile settings
  - Personal information
  - Target country preferences
  - Career goals
  - Account settings
- `/progress` - Learning progress tracking
  - Completed scenarios
  - Performance metrics
  - Skill development charts
  - Achievements and badges
- `/onboarding` - New user onboarding flow

#### Credits & Payments
- `/tokens` - Credit management dashboard
  - Current balance display
  - Usage history
  - Available packages
- `/tokens/buy` - Purchase credits (checkout page)
  - Package selection
  - Payment form (demo mode)
  - Order confirmation

---

### Admin Routes (Admin Access Only)

- `/admin` - Admin dashboard overview
- `/admin/users` - User management
- `/admin/scenarios` - Scenario content management
- `/admin/content` - General content management
- `/admin/analytics` - Platform analytics and metrics

---

### API Routes

- `/api/chat` - AI chat endpoint for career coach conversations

---

## User Journey Flow

### New User Journey
1. `/` (Homepage) → Learn about platform
2. `/signup` → Create account
3. `/onboarding` → Complete profile setup
4. `/dashboard` → View main dashboard
5. Choose feature:
   - `/role-play` → Browse scenarios → `/scenario/[id]` → `/scenario/[id]/simulation` → `/scenario/[id]/results`
   - `/career-coach` → Start AI chat session

### Returning User Journey
1. `/login` → Sign in (or use demo account)
2. `/dashboard` → Main hub
3. Continue learning or purchase more credits

### Credit Purchase Journey
1. `/dashboard` or `/tokens` → View current balance
2. `/tokens/buy` → Select package
3. Complete payment (demo mode)
4. Return to `/tokens` → Credits added

---

## Navigation Structure

### Main Navigation (Sidebar)
- Dashboard
- AI Career Coach
- Cultural Role-Play
- Progress
- Profile
- Contact Us

### Mobile Navigation (Bottom Bar)
- Dashboard
- Coach
- Role-Play
- Profile
- Contact

---

## Route Naming Conventions

- **Credits** (not "tokens") - User-facing terminology
- **Plans/Tiers** - Starter, Professional, Premium
- **Scenarios** - Role-play practice sessions
- **Sessions** - AI chat conversations

---

## Demo Account

**Email:** demo@workabroadly.com  
**Password:** demo123

Available on `/login` page with auto-fill button.
