# CodePath AI — Testing Strategy

> Comprehensive testing approach for quality assurance

## 1. Testing Pyramid

```
         ┌─────────┐
         │  E2E    │  (10%)
         │(Playwright)│
         ├─────────┤
         │Integration│ (20%)
         │ (Vitest) │
         ├─────────┤
         │  Unit   │  (70%)
         │ (Vitest) │
         └─────────┘
```

## 2. Unit Testing

### 2.1 Framework
- **Tool**: Vitest
- **Coverage**: Lines, branches, functions, statements
- **Target**: 80%+ coverage for business logic

### 2.2 What to Test
- Utility functions
- Validation schemas
- AI prompt templates
- Data transformations
- Service methods

### 2.3 Example
```typescript
// src/lib/utils/__tests__/skills.test.ts
import { calculateSkillLevel } from '../skills';

describe('calculateSkillLevel', () => {
  it('should return beginner for score < 30', () => {
    expect(calculateSkillLevel(25)).toBe('beginner');
  });

  it('should return intermediate for score 30-69', () => {
    expect(calculateSkillLevel(50)).toBe('intermediate');
  });

  it('should return advanced for score 70-89', () => {
    expect(calculateSkillLevel(80)).toBe('advanced');
  });

  it('should return expert for score >= 90', () => {
    expect(calculateSkillLevel(95)).toBe('expert');
  });
});
```

## 3. Integration Testing

### 3.1 Framework
- **Tool**: Vitest + MSW (Mock Service Worker)
- **Scope**: API routes, database operations, AI integrations

### 3.2 What to Test
- API endpoint responses
- Database CRUD operations
- Authentication flows
- AI provider integrations
- Error handling

### 3.3 Example
```typescript
// src/app/api/skills/__tests__/skills.test.ts
import { createMocks } from 'node-mocks-http';
import { GET } from '../route';

describe('/api/skills', () => {
  it('should return user skills', async () => {
    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data).toBeInstanceOf(Array);
  });
});
```

## 4. End-to-End Testing

### 4.1 Framework
- **Tool**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Environment**: Staging

### 4.2 Critical User Flows
1. **Registration & Onboarding**
   - Register with email
   - Complete onboarding steps
   - Reach dashboard

2. **Assessment Flow**
   - Start assessment
   - Answer questions
   - View results

3. **Career Recommendations**
   - View recommendations
   - Compare career paths
   - Select path

4. **Learning Roadmap**
   - Generate roadmap
   - View milestones
   - Track progress

5. **Project Workflow**
   - Create project
   - Generate PRD
   - Generate tech spec
   - Complete tasks

6. **AI Mentor**
   - Start conversation
   - Ask questions
   - Receive guidance

### 4.3 Example
```typescript
// e2e/assessment.spec.ts
import { test, expect } from '@playwright/test';

test('complete assessment flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Navigate to assessment
  await page.goto('/assessment');
  await page.click('button:has-text("Start Assessment")');

  // Answer questions
  for (let i = 0; i < 10; i++) {
    await page.click(`[data-option="a"]`);
    await page.click('button:has-text("Next")');
  }

  // Complete and view results
  await page.click('button:has-text("Complete")');
  await expect(page.locator('[data-testid="results"]')).toBeVisible();
});
```

## 5. AI Testing

### 5.1 Response Validation
- Schema compliance testing
- Output quality metrics
- Response time monitoring
- Fallback behavior testing

### 5.2 Example
```typescript
// src/lib/ai/__tests__/orchestrator.test.ts
describe('AI Orchestrator', () => {
  it('should validate AI response schema', async () => {
    const response = await orchestrator.generateJSON({
      prompt: 'Analyze coding skills',
      schema: CodingDNASchema,
    });

    expect(CodingDNASchema.safeParse(response).success).toBe(true);
  });

  it('should fallback to secondary provider', async () => {
    mockPrimaryProvider.fail();
    
    const response = await orchestrator.chat({
      system: 'You are a mentor',
      messages: [{ role: 'user', content: 'Help me' }],
    });

    expect(response.provider).toBe('anthropic');
  });
});
```

## 6. Performance Testing

### 6.1 Metrics
- **LCP**: < 1.5s (landing), < 2s (dashboard)
- **FID**: < 100ms
- **CLS**: < 0.1
- **API Response**: < 200ms p95
- **AI Response**: < 5s (streaming)

### 6.2 Tools
- Lighthouse CI
- Web Vitals
- Custom performance monitors

## 7. Accessibility Testing

### 7.1 Standards
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast

### 7.2 Tools
- axe-core
- Lighthouse accessibility
- Manual testing

## 8. Security Testing

### 8.1 Automated
- OWASP dependency check
- Snyk vulnerability scanning
- ESLint security rules

### 8.2 Manual
- Penetration testing (quarterly)
- Code review for security
- Incident response drills

## 9. Test Data Management

### 9.1 Fixtures
- User fixtures (different roles, profiles)
- Assessment fixtures (completed, in-progress)
- Project fixtures (various stages)

### 9.2 Database
- Test database (separate from development)
- Seed data for common scenarios
- Cleanup after each test

## 10. CI/CD Integration

### 10.1 Pipeline
```yaml
stages:
  - lint
  - type-check
  - unit-test
  - integration-test
  - build
  - e2e-test
  - deploy-staging
  - smoke-test
  - deploy-production
```

### 10.2 Gates
- All tests pass
- Coverage > 80%
- Build succeeds
- E2E tests pass
- No security vulnerabilities

## 11. Test Reporting

### 11.1 Metrics
- Test pass/fail rates
- Coverage trends
- Performance metrics
- Flaky test detection

### 11.2 Dashboards
- Real-time test status
- Historical trends
- Coverage reports
- Performance benchmarks

## 12. Maintenance

### 12.1 Regular Tasks
- Update test dependencies
- Review flaky tests
- Update test data
- Refactor test code

### 12.2 Best Practices
- Tests should be deterministic
- Tests should be independent
- Tests should be fast
- Tests should be readable
