# CodePath AI — API Contract

> RESTful API with JSON responses

## 1. Conventions

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://codepath.ai/api`

### Authentication
```
Authorization: Bearer <session_token>
```

### Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Response Format
```typescript
// Success
{
  "success": true,
  "data": T,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { ... }
  }
}
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Rate Limited |
| 500 | Internal Server Error |

## 2. Endpoints

### 2.1 Authentication

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login with credentials
POST   /api/auth/logout          - Logout
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password
GET    /api/auth/session         - Get current session
```

### 2.2 User Profile

```
GET    /api/user/profile         - Get current user profile
PUT    /api/user/profile         - Update profile
GET    /api/user/stats           - Get user statistics
```

### 2.3 Onboarding

```
POST   /api/onboarding/start     - Start onboarding
PUT    /api/onboarding/step      - Update onboarding step
POST   /api/onboarding/complete  - Complete onboarding
```

### 2.4 Assessment

```
POST   /api/assessment/start          - Start new assessment
GET    /api/assessment/:id            - Get assessment details
POST   /api/assessment/:id/answer     - Submit answer
POST   /api/assessment/:id/complete   - Complete assessment
GET    /api/assessment/history        - Get assessment history
```

### 2.5 Coding DNA

```
GET    /api/dna                 - Get coding DNA
POST   /api/dna/regenerate      - Regenerate coding DNA
```

### 2.6 Recommendations

```
GET    /api/recommendations             - Get career recommendations
GET    /api/recommendations/:id         - Get recommendation details
POST   /api/recommendations/generate    - Generate new recommendations
```

### 2.7 Career Paths

```
GET    /api/career-paths               - List all career paths
GET    /api/career-paths/:slug         - Get career path details
GET    /api/career-paths/:slug/compare - Compare with other paths
```

### 2.8 Learning Roadmap

```
GET    /api/roadmap                    - Get user's roadmap
POST   /api/roadmap/generate           - Generate new roadmap
PUT    /api/roadmap/node/:id           - Update roadmap node
GET    /api/roadmap/progress           - Get roadmap progress
```

### 2.9 Skills

```
GET    /api/skills                     - List all skills
GET    /api/skills/user                - Get user skills
POST   /api/skills/user                - Add user skill
PUT    /api/skills/user/:id            - Update user skill
DELETE /api/skills/user/:id            - Remove user skill
GET    /api/skills/gaps                - Get skill gaps
```

### 2.10 Projects

```
GET    /api/projects                   - List user projects
POST   /api/projects                   - Create project
GET    /api/projects/:id               - Get project details
PUT    /api/projects/:id               - Update project
POST   /api/projects/recommend         - Get project recommendations
```

### 2.11 PRD

```
GET    /api/projects/:id/prd           - Get project PRD
POST   /api/projects/:id/prd/generate  - Generate PRD
PUT    /api/projects/:id/prd           - Update PRD
```

### 2.12 Tech Spec

```
GET    /api/projects/:id/tech-spec           - Get tech spec
POST   /api/projects/:id/tech-spec/generate  - Generate tech spec
PUT    /api/projects/:id/tech-spec           - Update tech spec
```

### 2.13 Tasks

```
GET    /api/projects/:id/tasks         - Get project tasks
POST   /api/projects/:id/tasks         - Create task
POST   /api/projects/:id/tasks/generate - Generate tasks from tech spec
PUT    /api/tasks/:id                  - Update task
PUT    /api/tasks/:id/status           - Update task status
POST   /api/tasks/:id/subtasks         - Create subtask
PUT    /api/subtasks/:id               - Update subtask
```

### 2.14 Verification

```
GET    /api/projects/:id/verify        - Get verification status
POST   /api/projects/:id/verify        - Start verification
GET    /api/verify/history             - Get verification history
```

### 2.15 AI Mentor

```
POST   /api/mentor/chat                - Send message to mentor
GET    /api/mentor/conversations        - List conversations
GET    /api/mentor/conversations/:id    - Get conversation
DELETE /api/mentor/conversations/:id    - Delete conversation
```

### 2.16 Challenges

```
GET    /api/challenges                 - List challenges
GET    /api/challenges/:slug           - Get challenge details
POST   /api/challenges/:id/submit      - Submit solution
GET    /api/challenges/:id/submissions - Get user submissions
```

### 2.17 Progress & Analytics

```
GET    /api/progress                   - Get progress overview
GET    /api/progress/skills            - Get skill progress
GET    /api/progress/career            - Get career progress
GET    /api/progress/learning          - Get learning progress
GET    /api/progress/analytics         - Get detailed analytics
```

### 2.18 Settings

```
GET    /api/settings                   - Get user settings
PUT    /api/settings                   - Update settings
POST   /api/settings/avatar            - Upload avatar
DELETE /api/settings/account           - Delete account
```

## 3. Pagination

### Query Parameters
```
?page=1&limit=10&sort=created_at&order=desc
```

### Response Meta
```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 4. Filtering

### Query Parameters
```
?status=active&difficulty=intermediate&category=frontend
```

### Array Filtering
```
?skills=react,typescript,node&tags=web,api
```

## 5. Search

```
?q=react+hooks&search_fields=title,description
```

## 6. Rate Limiting

### Headers
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1631234567
```

### Limits
| Endpoint Group | Requests/min | Requests/day |
|---------------|--------------|--------------|
| Auth | 10 | 100 |
| Profile | 60 | 1000 |
| Assessment | 10 | 50 |
| AI (Mentor) | 20 | 200 |
| AI (Generate) | 10 | 100 |
| General | 60 | 1000 |

## 7. Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 422 | Input validation failed |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| RATE_LIMITED | 429 | Too many requests |
| AI_ERROR | 500 | AI provider error |
| AI_RATE_LIMITED | 429 | AI rate limit exceeded |
| ASSESSMENT_INCOMPLETE | 400 | Assessment not completed |
| ONBOARDING_INCOMPLETE | 400 | Onboarding not completed |
