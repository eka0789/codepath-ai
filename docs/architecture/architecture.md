# CodePath AI — Architecture Document

> AI Developer Growth Operating System
> "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan."

## 1. Overview

CodePath AI is a full-stack AI-powered web application that helps programmers at all levels discover their coding identity, assess skills, get career recommendations, and receive personalized learning roadmaps.

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ (App Router, Server Components) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **Database** | PostgreSQL (via Prisma ORM) |
| **Cache/Queue** | Redis (BullMQ for async jobs) |
| **Auth** | NextAuth.js v5 (Google, GitHub, Email) |
| **AI** | Vercel AI SDK + provider abstraction (OpenAI, Anthropic, Google) |
| **State** | Zustand (client), React Query (server) |
| **Testing** | Vitest (unit), Playwright (e2e) |
| **Deployment** | Vercel (app) + managed PostgreSQL + Redis |

## 3. Architecture Pattern

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                │
│  ┌─────────┐  ┌──────────┐  ┌────────────────────┐ │
│  │ Pages   │  │ Components│  │ State (Zustand)    │ │
│  └────┬────┘  └────┬──────┘  └────────┬───────────┘ │
│       │            │                   │             │
│       └────────────┼───────────────────┘             │
│                    │                                 │
│              ┌─────▼─────┐                          │
│              │ API Layer  │ (Route Handlers)         │
│              └─────┬─────┘                          │
├─────────────────────┼───────────────────────────────┤
│                    BACKEND                           │
│  ┌─────────┐  ┌────▼────┐  ┌──────────────────┐   │
│  │ Services │◄─┤  Auth   │  │  AI Orchestrator │   │
│  │ (Domain) │  │ (NextAuth)│ │  (Sub-engines)  │   │
│  └────┬────┘  └─────────┘  └────────┬─────────┘   │
│       │                              │              │
│  ┌────▼──────────────────────────────▼─────┐       │
│  │         Database (Prisma + PostgreSQL)   │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
│  ┌──────────────────┐  ┌─────────────────────────┐ │
│  │ Redis (BullMQ)   │  │  AI Providers           │ │
│  │ - Job queues     │  │  - OpenAI               │ │
│  │ - Session cache  │  │  - Anthropic            │ │
│  │ - Rate limiting  │  │  - Google               │ │
│  └──────────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 4. Design System

### References
- **Linear** — clean navigation, sidebar patterns
- **Vercel** — dark/light mode, minimal chrome
- **GitHub** — data tables, activity feeds
- **Notion** — content blocks, document editing
- **Raycast** — command palette, keyboard-first UX

### Design Tokens
- Dark mode: `bg-gray-950`, `bg-gray-900`, `bg-gray-800`
- Light mode: `bg-white`, `bg-gray-50`, `bg-gray-100`
- Primary: `indigo-600` (actions), `emerald-500` (success/progress)
- Typography: Inter (UI), JetBrains Mono (code)
- Spacing: 4px base, consistent 8px grid

## 5. Project Structure

```
codepath-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (app)/              # Main app route group
│   │   │   ├── onboarding/
│   │   │   ├── assessment/
│   │   │   ├── coding-dna/
│   │   │   ├── recommendations/
│   │   │   ├── career-paths/
│   │   │   ├── roadmap/
│   │   │   ├── skills/
│   │   │   ├── projects/
│   │   │   ├── mentor/
│   │   │   ├── challenges/
│   │   │   ├── progress/
│   │   │   └── settings/
│   │   ├── api/                # API Route Handlers
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── layout/             # Layout components (sidebar, header)
│   │   └── features/           # Feature-specific components
│   ├── lib/
│   │   ├── ai/                 # AI orchestration + engines
│   │   ├── auth/               # NextAuth configuration
│   │   ├── db/                 # Prisma client
│   │   ├── redis/              # Redis + BullMQ setup
│   │   ├── utils/              # Shared utilities
│   │   └── validations/        # Zod schemas
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   └── types/                  # TypeScript type definitions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── public/                     # Static assets
├── docs/                       # Documentation
├── PLAN.md                     # Project plan
├── TASKS.md                    # Task tracking
└── DECISIONS.md                # Architecture decisions
```

## 6. Database Strategy

### Core Entities (30+)
- **User**: auth, profile, preferences
- **Assessment**: coding tests, skill evaluation
- **CodingDNA**: skill fingerprints, experience levels
- **Skill**: technologies, proficiency tracking
- **UserSkill**: user-skill relationships with evidence
- **SkillEvidence**: project-based skill proof
- **CareerPath**: career options with requirements
- **CareerRecommendation**: AI-generated suggestions
- **LearningRoadmap**: personalized learning plans
- **RoadmapNode**: individual learning items
- **Project**: recommended/historical projects
- **PRD**: product requirement documents
- **TechnicalSpecification**: tech specs
- **Task**: implementation tasks
- **SubTask**: granular tasks
- **Challenge**: coding challenges
- **Verification**: completion verification
- **AIConversation**: mentor chat history
- **Achievement**: gamification
- **Technology**: tech stack items

### Indexing Strategy
- Primary keys: UUID
- Foreign keys: indexed
- Query patterns: user_id lookups, career-path searches, skill queries
- Full-text search: skills, career paths

## 7. API Architecture

### REST Endpoints (15 groups)
```
/api/auth/*          - Authentication
/api/user/*          - User profile
/api/assessment/*    - Skill assessment
/api/dna/*           - Coding DNA
/api/recommendations/*- Career recommendations
/api/roadmap/*       - Learning roadmaps
/api/skills/*        - Skill management
/api/projects/*      - Project management
/api/prd/*           - PRD generation
/api/tech-spec/*     - Tech spec generation
/api/tasks/*         - Task management
/api/verify/*        - Verification
/api/mentor/*        - AI mentor chat
/api/challenges/*    - Coding challenges
/api/analytics/*     - Progress analytics
```

### Response Format
```typescript
// Success
{ success: true, data: T, meta?: { page, total } }

// Error
{ success: false, error: { code: string, message: string } }
```

## 8. AI Architecture

### Provider Abstraction
```
AIOrchestrator
├── ProfileAnalyzer      (career direction, skill assessment)
├── RecommendationEngine (career path matching)
├── RoadmapGenerator     (learning plan creation)
├── ProjectGenerator     (project suggestions)
├── PRDGenerator         (product docs)
├── TechSpecGenerator    (technical docs)
├── TaskGenerator        (task breakdown)
├── VerificationEngine   (skill verification)
└── Mentor               (conversational AI)
```

### Principles
- Schema-validated outputs (Zod)
- Prompt versioning
- Rate limiting per user
- No system prompt leakage
- Evidence-based recommendations (never popularity)
- Graceful fallback between providers

## 9. Testing Strategy

| Level | Tool | Coverage |
|-------|------|----------|
| Unit | Vitest | Components, utils, services |
| Integration | Vitest | API routes, DB operations |
| E2E | Playwright | Critical user flows |
| AI | Custom | Response validation, schema compliance |

## 10. Performance Targets

- **Landing page**: < 1.5s LCP
- **Dashboard**: < 2s initial load
- **AI responses**: < 5s (streaming)
- **API routes**: < 200ms p95
- **Lighthouse score**: > 90 all categories

## 11. Security

- HTTPS everywhere
- CSRF protection
- Rate limiting (API + AI)
- Input validation (Zod)
- SQL injection prevention (Prisma ORM)
- XSS protection (React + CSP)
- Auth: NextAuth.js v5 with secure session management
- No secrets in client bundle
- Environment variable validation

## 12. Deployment

- **Vercel**: Frontend + API routes
- **Neon/Supabase**: Managed PostgreSQL
- **Upstash**: Serverless Redis
- **Environment**: Development → Staging → Production
- **CI/CD**: GitHub Actions (lint, test, build, deploy)
