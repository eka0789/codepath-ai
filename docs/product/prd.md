# CodePath AI — Product Requirements Document

> Version: 1.0 | Status: MVP | Last Updated: 2026-09-12

## 1. Vision

CodePath AI is an AI-powered developer growth operating system that helps programmers discover their coding identity, assess skills, get career recommendations, and receive personalized learning roadmaps — moving them from uncertainty to mastery.

**Tagline**: "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan."
*(Find your coding direction. Build your skills. Ready for the future.)*

## 2. Problem Statement

Programmers at all levels face:
- **Uncertainty** about which career path fits their skills
- **Lack of personalized guidance** for skill development
- **Generic learning resources** that don't match their level or goals
- **No clear evidence** of skill progression
- **Difficulty translating** learning into real projects

## 3. Target Users

| Persona | Description | Pain Points |
|---------|-------------|-------------|
| **Beginner Coder** | Learning to code, 0-1 years experience | Doesn't know what to learn next, overwhelmed by choices |
| **Career Switcher** | Moving from non-tech to tech | Needs fast-track guidance, skill assessment |
| **Junior Developer** | 1-3 years experience | Wants to specialize, needs career direction |
| **Mid-Level Developer** | 3-5 years experience | Looking to advance, needs gap analysis |
| **Senior Developer** | 5+ years experience | Exploring leadership/architecture paths |

## 4. Core Product Loop

```
Person → Coding Foundation → Coding Preference → Career Direction
→ Skill Gap → Learning Roadmap → Project → PRD → Tech Spec
→ Tasks → Implementation → Verification → Skill Evidence → Next Career Step
```

## 5. MVP Features (10)

### F01: Authentication
- Email/password registration and login
- OAuth (Google, GitHub)
- Secure session management
- Password reset flow

### F02: Onboarding
- Welcome screen with value proposition
- Basic info collection (name, experience, goals)
- Initial skill level assessment
- Technology preferences

### F03: Coding Assessment
- Interactive coding quiz (multiple choice + code snippets)
- Skill level evaluation (beginner, intermediate, advanced)
- Topic-based assessment (frontend, backend, fullstack, mobile, etc.)
- Results with detailed breakdown

### F04: Coding DNA
- Visual representation of coding skills
- Skill fingerprint across technologies
- Experience level mapping
- Strengths and growth areas

### F05: AI Career Recommendation
- Personalized career path suggestions
- Match percentage based on skills and preferences
- Salary range information
- Required vs current skill comparison

### F06: Career Path Comparison
- Side-by-side career path analysis
- Skill requirements comparison
- Learning time estimation
- Market demand indicators

### F07: Personalized Learning Roadmap
- AI-generated learning plan
- Milestone-based progression
- Resource recommendations
- Time estimates per milestone

### F08: Skill Tracking
- Technology skill database
- Skill level assessment
- Evidence-based progression
- Skill gap identification

### F09: Project Recommendation
- Project suggestions based on skill gaps
- Difficulty-appropriate challenges
- Real-world project ideas
- Portfolio-building focus

### F10: AI Mentor
- Conversational AI assistant
- Context-aware guidance
- Progress-aware recommendations
- Q&A support

## 6. Page/Route Specifications

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, features, CTA, social proof |
| `/login` | Login | Email/password + OAuth |
| `/register` | Register | New account creation |
| `/onboarding` | Onboarding | Multi-step profile setup |
| `/assessment` | Assessment | Coding skill quiz |
| `/coding-dna` | Coding DNA | Visual skill profile |
| `/recommendations` | Recommendations | Career suggestions |
| `/career-paths` | Career Paths | Path comparison |
| `/roadmap` | Learning Roadmap | Personalized plan |
| `/skills` | Skills | Skill management |
| `/projects` | Projects | Project recommendations |
| `/projects/:id` | Project Detail | Project workspace |
| `/projects/:id/prd` | PRD | Product requirements |
| `/projects/:id/tech-spec` | Tech Spec | Technical specification |
| `/projects/:id/tasks` | Tasks | Task breakdown |
| `/projects/:id/verify` | Verification | Skill verification |
| `/mentor` | AI Mentor | Chat interface |
| `/challenges` | Challenges | Coding challenges |
| `/progress` | Progress | Analytics dashboard |
| `/settings` | Settings | Profile & preferences |

## 7. Non-Functional Requirements

### Performance
- Landing page: < 1.5s LCP
- Dashboard: < 2s initial load
- AI responses: < 5s (streaming)
- API routes: < 200ms p95

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios

### Security
- HTTPS everywhere
- CSRF protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

### Scalability
- 10K concurrent users (MVP)
- Horizontal scaling ready
- Database connection pooling
- Redis caching

## 8. Design References

- **Linear** — clean navigation, sidebar patterns
- **Vercel** — dark/light mode, minimal chrome
- **GitHub** — data tables, activity feeds
- **Notion** — content blocks, document editing
- **Raycast** — command palette, keyboard-first UX

## 9. Business Model (Future)

| Tier | Price | Features |
|------|-------|----------|
| **FREE** | $0 | Basic assessment, limited recommendations |
| **PRO** | $19/mo | Full AI features, unlimited roadmaps |
| **CAREER** | $49/mo | Career coaching, job matching |
| **TEAM** | $99/mo | Team analytics, admin dashboard |

> MVP: All features free, architecture prepared for tiering

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| User registration | 1,000 in first month |
| Assessment completion | 70% of registered users |
| Career recommendation engagement | 50% of assessed users |
| Roadmap creation | 30% of recommended users |
| Daily active users | 20% of total users |
| NPS score | > 50 |

## 11. Out of Scope (MVP)

- Payment integration
- Job matching/placement
- Team management features
- Custom coding challenges
- Mobile apps (responsive web only)
- Multi-language support (Indonesian first)

## 12. Open Questions

1. Should we support multiple languages in MVP?
2. What's the primary deployment target (Vercel vs self-hosted)?
3. Which AI provider should be default (OpenAI vs Anthropic)?
4. Should we include gamification from day one?

## 13. Appendices

### A. Competitive Analysis
- **Codecademy**: Course-focused, no career guidance
- **LeetCode**: Challenge-focused, no personalized paths
- **Coursera**: Broad courses, not developer-specific
- **LinkedIn Learning**: Generic, not code-focused

### B. Differentiators
- AI-powered personalized guidance
- Evidence-based skill tracking
- Full learning loop (assessment → path → projects → verification)
- Developer-focused design and UX
- Indonesian language support
