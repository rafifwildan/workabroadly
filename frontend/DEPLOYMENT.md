# Deployment Guide

This guide covers deploying both the frontend and backend of WorkAbroadly to production.

## Deployment Options

### Frontend Deployment
- **Recommended:** Vercel (optimized for Next.js)
- **Alternatives:** Netlify, AWS Amplify, Cloudflare Pages

### Backend Deployment
- **Recommended:** Railway or Render (easy Node.js deployment)
- **Alternatives:** AWS EC2, DigitalOcean, Heroku, Fly.io

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Frontend code pushed to GitHub

### Steps

#### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository

#### 2. Configure Build Settings
\`\`\`
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
\`\`\`

#### 3. Set Environment Variables
In Vercel dashboard, add:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
\`\`\`

#### 4. Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Get your production URL: `https://your-app.vercel.app`

#### 5. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Backend Deployment (Railway)

### Prerequisites
- GitHub account
- Railway account (free tier available)
- Backend code pushed to GitHub

### Steps

#### 1. Create New Project
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

#### 2. Configure Service
\`\`\`
Root Directory: backend
Build Command: npm run build
Start Command: npm start
\`\`\`

#### 3. Set Environment Variables
In Railway dashboard, add:
\`\`\`
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
ELICE_API_KEY=your_production_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
OPENAI_API_KEY=your_key (optional)
\`\`\`

#### 4. Deploy
- Railway will automatically build and deploy
- Get your backend URL: `https://your-app.railway.app`

#### 5. Update Frontend
- Go back to Vercel
- Update `NEXT_PUBLIC_API_URL` to your Railway URL
- Redeploy frontend

---

## Backend Deployment (Render)

### Alternative to Railway

#### 1. Create Web Service
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository

#### 2. Configure Service
\`\`\`
Name: workabroadly-backend
Environment: Node
Region: Choose closest to your users
Branch: main
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm start
\`\`\`

#### 3. Set Environment Variables
Same as Railway (see above)

#### 4. Deploy
- Click "Create Web Service"
- Render will build and deploy
- Get your backend URL

---

## Environment Variables Checklist

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL` - Backend URL
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key

### Backend (Railway/Render)
- [ ] `PORT` - Server port (8080)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `FRONTEND_URL` - Frontend URL for CORS
- [ ] `ELICE_API_KEY` - Elice API key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `OPENAI_API_KEY` - OpenAI key (optional)

---

## Post-Deployment Checklist

### 1. Test Endpoints
\`\`\`bash
# Test backend health
curl https://your-backend-url.com/health

# Should return: {"status":"ok","message":"WorkAbroadly API is running"}
\`\`\`

### 2. Test Frontend
- Visit your frontend URL
- Try the AI chat feature
- Test Stripe checkout
- Check all pages load correctly

### 3. Monitor Logs
- **Vercel:** Check deployment logs in dashboard
- **Railway/Render:** Check application logs in dashboard

### 4. Set Up Monitoring (Recommended)
- **Sentry:** Error tracking
- **LogRocket:** Session replay
- **Uptime Robot:** Uptime monitoring

---

## Continuous Deployment

### Automatic Deployments
Both Vercel and Railway/Render support automatic deployments:

1. **Push to main branch** → Automatic production deployment
2. **Push to other branches** → Preview deployments (Vercel)
3. **Pull requests** → Preview deployments

### Deployment Workflow
\`\`\`
Developer pushes code
        ↓
GitHub receives push
        ↓
Vercel/Railway triggered
        ↓
Build process runs
        ↓
Tests run (if configured)
        ↓
Deploy to production
        ↓
Notify team (optional)
\`\`\`

---

## Rollback Strategy

### Vercel
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Railway/Render
1. Go to Deployments
2. Find previous working deployment
3. Click "Redeploy"

---

## Production Best Practices

### Security
- [ ] Use HTTPS for both frontend and backend
- [ ] Use production API keys (not test keys)
- [ ] Enable CORS only for your frontend domain
- [ ] Set secure environment variables
- [ ] Rotate API keys regularly

### Performance
- [ ] Enable caching headers
- [ ] Use CDN for static assets
- [ ] Optimize images
- [ ] Monitor response times
- [ ] Set up error tracking

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor API usage
- [ ] Track performance metrics
- [ ] Set up logging

---

## Troubleshooting

### Frontend Issues

**Build Fails**
- Check build logs in Vercel
- Verify all dependencies are in package.json
- Ensure environment variables are set

**API Calls Fail**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Verify backend is running

### Backend Issues

**Build Fails**
- Check build logs
- Verify TypeScript compiles locally
- Ensure all dependencies are installed

**API Returns Errors**
- Check environment variables are set
- Verify API keys are valid
- Check logs for error details

**CORS Errors**
- Verify `FRONTEND_URL` matches your frontend domain
- Check CORS middleware configuration
- Ensure both HTTP and HTTPS are handled

---

## Cost Estimation

### Free Tier Limits

**Vercel (Free)**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Railway (Free Trial)**
- $5 credit/month
- ~500 hours runtime
- 1 GB RAM

**Render (Free)**
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM

### Paid Plans
- **Vercel Pro:** $20/month
- **Railway:** Pay as you go (~$5-20/month)
- **Render:** $7/month per service

---

## Support

For deployment issues:
1. Check platform documentation (Vercel, Railway, Render)
2. Review deployment logs
3. Check environment variables
4. Contact platform support
5. Reach out to development team
