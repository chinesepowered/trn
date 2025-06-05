# 🚀 TRN Battle Arena - Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended - One-Click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/YOUR_USERNAME/trn-battle-arena)

```bash
# Or deploy manually
npx vercel --prod
```

### 2. Netlify

```bash
# Build command
pnpm build

# Publish directory
.next
```

### 3. Docker Deployment

```bash
# Build the image
docker build -t trn-battle-arena .

# Run the container
docker run -p 3000:3000 trn-battle-arena
```

### 4. Static Export (IPFS/GitHub Pages)

```bash
# Build for static export
pnpm build

# Deploy to IPFS
npx ipfs-deploy .next/

# Or deploy to GitHub Pages
npx gh-pages -d .next/
```

## Environment Setup

### Required Environment Variables

Create a `.env.local` file:

```env
# The Root Network Configuration
NEXT_PUBLIC_TRN_RPC_URL=wss://root.rootnet.live/ws
NEXT_PUBLIC_TRN_CHAIN_ID=7672
NEXT_PUBLIC_FUTUREPASS_WALLET_URL=https://wallet.futurepass.futureverse.app

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Production Optimizations

1. **Performance Settings** (already configured in `next.config.ts`)
   - Standalone output for Docker
   - Image optimization
   - Package imports optimization

2. **CDN Assets**
   - Fighter images hosted on IPFS
   - Static assets optimized for global delivery

3. **Caching Strategy**
   - Static generation for landing pages
   - Client-side caching for game state
   - Service worker for offline capability

## Blockchain Integration

### For Production Deployment

1. **Replace Mock Functions**
   ```typescript
   // In app/store/gameStore.ts
   // Replace simulation functions with real TRN calls
   
   connectWallet: async () => {
     // Implement real FuturePass connection
     const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
     // ... real implementation
   }
   ```

2. **Add Smart Contract Integration**
   ```typescript
   // Add actual NFT minting
   mintFighter: async () => {
     // Call TRN NFT pallet
     const api = await ApiPromise.create({ provider: wsProvider });
     // ... real minting logic
   }
   ```

3. **Implement Real Battle System**
   ```typescript
   // Replace simulation with on-chain battles
   startBattle: async () => {
     // Submit battle transaction to TRN
     // Use VRF for random outcomes
   }
   ```

## Performance Benchmarks

Target metrics for production:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** - Web vitals monitoring
2. **Google Analytics** - User behavior tracking
3. **Sentry** - Error tracking and performance monitoring
4. **PostHog** - Product analytics for game metrics

### Game-Specific Metrics

Track these key gaming metrics:
- Daily Active Users (DAU)
- Fighter minting rate
- Battle completion rate
- Average session duration
- ROOT token transaction volume

## Security Considerations

1. **Client-Side Security**
   - Never expose private keys
   - Validate all user inputs
   - Implement rate limiting

2. **Smart Contract Security**
   - Audit all contract interactions
   - Implement proper access controls
   - Use secure random number generation

3. **Infrastructure Security**
   - Enable HTTPS everywhere
   - Implement proper CORS policies
   - Regular dependency updates

## Scaling Strategy

### Horizontal Scaling
- Load balancing across multiple instances
- CDN for static assets
- Database replication for user data

### Vertical Scaling
- Optimize React rendering
- Implement virtualization for large fighter collections
- Use Web Workers for heavy computations

## Maintenance

### Regular Tasks
- Monitor blockchain connection health
- Update fighter metadata
- Analyze game economy balance
- Security updates

### Automated Monitoring
```bash
# Health check endpoint
curl https://your-domain.com/api/health

# Response
{
  "status": "healthy",
  "blockchain": "connected",
  "database": "operational",
  "uptime": "99.9%"
}
```

---

**Ready to deploy your TRN Battle Arena and win the hackathon! 🏆** 