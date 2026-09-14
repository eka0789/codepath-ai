# CodePath AI — Architecture Decision Records

> Track all significant architectural decisions

## ADR-001: Next.js App Router

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need a React framework for the full-stack application
**Decision**: Use Next.js 14+ with App Router
**Consequences**:
- ✅ Server Components for better performance
- ✅ Built-in API routes
- ✅ File-based routing
- ✅ Great DX and ecosystem
- ❌ Learning curve for App Router
- ❌ Some features still maturing

## ADR-002: PostgreSQL with Prisma

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need a relational database for complex data relationships
**Decision**: Use PostgreSQL with Prisma ORM
**Consequences**:
- ✅ ACID compliance
- ✅ Complex queries and joins
- ✅ Prisma's type safety
- ✅ Great migration system
- ❌ Requires database hosting
- ❌ Prisma can be verbose

## ADR-003: AI Provider Abstraction

**Date**: 2026-09-12
**Status**: Accepted
**Context**: AI providers may change, need flexibility
**Decision**: Implement provider abstraction layer
**Consequences**:
- ✅ Swap providers without code changes
- ✅ Fallback between providers
- ✅ Test with mocks
- ❌ Additional abstraction layer
- ❌ Provider-specific features may be lost

## ADR-004: Tailwind CSS + shadcn/ui

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need a consistent, premium design system
**Decision**: Use Tailwind CSS with shadcn/ui components
**Consequences**:
- ✅ Rapid UI development
- ✅ Consistent design tokens
- ✅ Accessible components
- ✅ Customizable
- ❌ Bundle size considerations
- ❌ Learning Tailwind syntax

## ADR-005: Zustand for Client State

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need lightweight client-side state management
**Decision**: Use Zustand for client state
**Consequences**:
- ✅ Simple API
- ✅ No boilerplate
- ✅ TypeScript support
- ✅ Small bundle size
- ❌ Less ecosystem than Redux

## ADR-006: React Query for Server State

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need to manage server state and API calls
**Decision**: Use React Query (TanStack Query)
**Consequences**:
- ✅ Caching and refetching
- ✅ Loading/error states
- ✅ Optimistic updates
- ✅ Great DevTools
- ❌ Additional dependency

## ADR-007: NextAuth.js v5 for Auth

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need secure authentication
**Decision**: Use NextAuth.js v5
**Consequences**:
- ✅ Easy OAuth integration
- ✅ Session management
- ✅ CSRF protection
- ✅ Next.js integration
- ❌ Vendor lock-in

## ADR-008: Redis for Caching/Queue

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need caching and job queue for AI operations
**Decision**: Use Redis with BullMQ
**Consequences**:
- ✅ Fast caching
- ✅ Reliable job queues
- ✅ Rate limiting
- ✅ Session storage
- ❌ Additional infrastructure
- ❌ Cost consideration

## ADR-009: Vitest for Testing

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need a fast, modern testing framework
**Decision**: Use Vitest for unit and integration tests
**Consequences**:
- ✅ Fast execution
- ✅ Vite ecosystem integration
- ✅ Jest-compatible API
- ✅ TypeScript support
- ❌ Smaller ecosystem than Jest

## ADR-010: Playwright for E2E

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need end-to-end testing
**Decision**: Use Playwright for E2E tests
**Consequences**:
- ✅ Cross-browser testing
- ✅ Auto-waiting
- ✅ Debugging tools
- ✅ CI/CD integration
- ❌ Slower than unit tests

## ADR-011: Evidence-Based Recommendations

**Date**: 2026-09-12
**Status**: Accepted
**Context**: AI recommendations should be personalized, not generic
**Decision**: Base all recommendations on user's coding DNA and skills
**Consequences**:
- ✅ Truly personalized guidance
- ✅ Better user outcomes
- ✅ Differentiation from competitors
- ❌ Requires comprehensive skill assessment
- ❌ More complex recommendation algorithm

## ADR-012: Schema-Validated AI Outputs

**Date**: 2026-09-12
**Status**: Accepted
**Context**: AI responses must be structured and reliable
**Decision**: Validate all AI outputs with Zod schemas
**Consequences**:
- ✅ Type-safe AI responses
- ✅ Predictable data structures
- ✅ Error handling
- ❌ Additional validation overhead
- ❌ May limit AI creativity

## ADR-013: Indonesian First

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Target market is Indonesian developers
**Decision**: Primary language is Indonesian, English secondary
**Consequences**:
- ✅ Better local market penetration
- ✅ Less competition
- ✅ Cultural relevance
- ❌ Limited international reach initially
- ❌ Translation overhead later

## ADR-014: MVP First, Features Later

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need to launch quickly and validate
**Decision**: Ship MVP with 10 core features, add more later
**Consequences**:
- ✅ Faster time to market
- ✅ User feedback early
- ✅ Reduced scope risk
- ❌ Missing features at launch
- ❌ May need major refactors

## ADR-015: Vercel Deployment

**Date**: 2026-09-12
**Status**: Accepted
**Context**: Need reliable, scalable deployment
**Decision**: Deploy to Vercel
**Consequences**:
- ✅ Zero-config deployment
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Great DX
- ❌ Vendor lock-in
- ❌ Cost at scale
