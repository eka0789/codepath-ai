# CodePath AI — Project Plan

> "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan."

## Vision

CodePath AI is an AI-powered developer growth operating system that helps programmers discover their coding identity, assess skills, get career recommendations, and receive personalized learning roadmaps.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **AI**: Vercel AI SDK, OpenAI/Anthropic/Google abstraction
- **Cache**: Redis (BullMQ)
- **Auth**: NextAuth.js v5
- **State**: Zustand, React Query
- **Testing**: Vitest, Playwright
- **Deployment**: Vercel, managed PostgreSQL, Redis

## Phase 1: Foundation (Week 1-2)

### 1.1 Architecture & Design
- [x] Architecture document
- [x] PRD document
- [x] Database schema
- [x] API contract
- [x] AI architecture
- [x] Security document
- [x] Testing strategy

### 1.2 Project Setup
- [ ] Initialize Next.js project
- [ ] Configure TypeScript (strict mode)
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Configure ESLint + Prettier
- [ ] Set up Prisma + PostgreSQL
- [ ] Configure Redis
- [ ] Set up NextAuth.js

### 1.3 Database
- [ ] Create Prisma schema
- [ ] Generate migrations
- [ ] Seed database
- [ ] Set up connection pooling

### 1.4 Core Components
- [ ] Layout components (sidebar, header)
- [ ] UI components (buttons, forms, cards)
- [ ] Authentication components
- [ ] Navigation components

## Phase 2: Authentication & Onboarding (Week 2-3)

### 2.1 Authentication
- [ ] Email/password registration
- [ ] Email/password login
- [ ] Google OAuth
- [ ] GitHub OAuth
- [ ] Session management
- [ ] Password reset

### 2.2 Onboarding
- [ ] Welcome screen
- [ ] Basic info collection
- [ ] Experience level selection
- [ ] Technology preferences
- [ ] Goals selection
- [ ] Onboarding completion

## Phase 3: Assessment & DNA (Week 3-4)

### 3.1 Assessment
- [ ] Assessment engine
- [ ] Question bank
- [ ] Quiz UI
- [ ] Timer functionality
- [ ] Results calculation
- [ ] History tracking

### 3.2 Coding DNA
- [ ] DNA calculation algorithm
- [ ] DNA visualization
- [ ] Skill radar chart
- [ ] Strengths/growth areas
- [ ] DNA regeneration

## Phase 4: Recommendations (Week 4-5)

### 4.1 Career Recommendations
- [ ] AI recommendation engine
- [ ] Career path database
- [ ] Match score calculation
- [ ] Skill gap analysis
- [ ] Salary information

### 4.2 Career Paths
- [ ] Career path listing
- [ ] Path comparison
- [ ] Path details
- [ ] Required skills

## Phase 5: Roadmap & Skills (Week 5-6)

### 5.1 Learning Roadmap
- [ ] Roadmap generation
- [ ] Milestone creation
- [ ] Resource linking
- [ ] Progress tracking
- [ ] Time estimation

### 5.2 Skills
- [ ] Skill database
- [ ] User skill management
- [ ] Skill evidence tracking
- [ ] Skill gap identification
- [ ] Skill verification

## Phase 6: Projects (Week 6-7)

### 6.1 Projects
- [ ] Project recommendation
- [ ] Project creation
- [ ] Project workspace
- [ ] Tech stack selection
- [ ] Difficulty levels

### 6.2 PRD
- [ ] PRD generation
- [ ] PRD editor
- [ ] PRD versioning
- [ ] PRD export

### 6.3 Tech Spec
- [ ] Tech spec generation
- [ ] Architecture diagrams
- [ ] Data model design
- [ ] API design

### 6.4 Tasks
- [ ] Task generation
- [ ] Task management
- [ ] Subtask creation
- [ ] Status tracking

## Phase 7: AI Mentor (Week 7-8)

### 7.1 Mentor
- [ ] Chat interface
- [ ] Context awareness
- [ ] Progress awareness
- [ ] Conversation history
- [ ] Action suggestions

## Phase 8: Verification (Week 8-9)

### 8.1 Verification
- [ ] Code review
- [ ] Test validation
- [ ] Deployment check
- [ ] Skill evidence creation

## Phase 9: Challenges (Week 9-10)

### 9.1 Challenges
- [ ] Challenge database
- [ ] Challenge UI
- [ ] Code editor
- [ ] Submission system
- [ ] Scoring

## Phase 10: Analytics (Week 10-11)

### 10.1 Progress
- [ ] Dashboard
- [ ] Skill progress charts
- [ ] Career progress
- [ ] Learning analytics

## Phase 11: Testing (Week 11-12)

### 11.1 Testing
- [ ] Unit tests (80% coverage)
- [ ] Integration tests
- [ ] E2E tests (critical flows)
- [ ] Performance testing
- [ ] Accessibility testing

## Phase 12: Security (Week 12)

### 12.1 Security
- [ ] Security audit
- [ ] Penetration testing
- [ ] Dependency scanning
- [ ] Code review

## Phase 13: Performance (Week 13)

### 13.1 Performance
- [ ] Lighthouse optimization
- [ ] Bundle analysis
- [ ] Image optimization
- [ ] Caching strategy

## Phase 14: Production (Week 14)

### 14.1 Deployment
- [ ] Vercel deployment
- [ ] Database setup
- [ ] Redis setup
- [ ] Environment variables
- [ ] Domain configuration

### 14.2 Monitoring
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Analytics
- [ ] Logging

## Phase 15: Polish (Week 15)

### 15.1 Polish
- [ ] UI refinement
- [ ] Animation
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

## Success Metrics

| Metric | Target |
|--------|--------|
| User registration | 1,000 in first month |
| Assessment completion | 70% of registered users |
| Career recommendation engagement | 50% of assessed users |
| Roadmap creation | 30% of recommended users |
| Daily active users | 20% of total users |
| NPS score | > 50 |

## Open Questions

1. Should we support multiple languages in MVP?
2. What's the primary deployment target (Vercel vs self-hosted)?
3. Which AI provider should be default (OpenAI vs Anthropic)?
4. Should we include gamification from day one?

## Next Steps

1. Initialize Next.js project
2. Set up database
3. Build authentication
4. Create onboarding flow
5. Implement assessment engine
