# CodePath AI — Security Document

> Security-first development practices for CodePath AI

## 1. Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimal permissions for all operations
3. **Secure by Default**: Security enabled without configuration
4. **Never Trust User Input**: Validate and sanitize everything
5. **Keep Secrets Secret**: Never expose credentials or keys

## 2. Authentication & Authorization

### 2.1 Authentication
- **Provider**: NextAuth.js v5
- **Methods**: Email/password, Google OAuth, GitHub OAuth
- **Session**: JWT with secure HTTP-only cookies
- **Token Rotation**: Refresh tokens on each request
- **Password Hashing**: bcrypt with salt rounds ≥ 12

### 2.2 Authorization
- **Model**: Role-based (user, admin)
- **Resource-Level**: Users can only access their own data
- **API Protection**: All API routes require authentication
- **Middleware**: Auth middleware on protected routes

### 2.3 Session Management
```typescript
// Secure session configuration
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/',
}
```

## 3. Input Validation

### 3.1 Zod Schemas
All API inputs validated with Zod schemas:

```typescript
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(128),
});
```

### 3.2 Sanitization
- HTML sanitization for rich text
- SQL injection prevention (Prisma ORM)
- XSS prevention (React escaping)

## 4. API Security

### 4.1 Rate Limiting
```typescript
const rateLimiter = {
  auth: { requests: 10, windowMs: 60000 },
  api: { requests: 60, windowMs: 60000 },
  ai: { requests: 20, windowMs: 60000 },
};
```

### 4.2 CORS Configuration
```typescript
{
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
```

### 4.3 CSRF Protection
- CSRF tokens on state-changing requests
- SameSite cookie attribute
- Origin/Referer header validation

### 4.4 Request Validation
- Content-Type validation
- Request size limits (1MB default)
- File upload validation (type, size)

## 5. Data Protection

### 5.1 Encryption at Rest
- Database encryption (managed PostgreSQL)
- File storage encryption
- Backup encryption

### 5.2 Encryption in Transit
- TLS 1.3 for all connections
- HTTPS everywhere
- HSTS headers

### 5.3 Data Classification
| Type | Storage | Retention |
|------|---------|-----------|
| PII | Encrypted DB | Until account deletion |
| Auth tokens | Secure cookies | 30 days |
| AI conversations | DB | 1 year |
| Analytics | Anonymized | 2 years |

### 5.4 PII Handling
- Email: Hashed for lookup, encrypted for storage
- Name: Encrypted at rest
- Password: Never stored, only bcrypt hash
- API keys: Environment variables only

## 6. AI Security

### 6.1 System Prompt Protection
- System prompts never sent to client
- Prompts stored in server-side registry
- Response content filtering

### 6.2 Rate Limiting
- Per-user AI request limits
- Token usage tracking
- Cost monitoring

### 6.3 Content Filtering
- Filter sensitive data from AI responses
- Block prompt injection attempts
- Validate AI output schemas

### 6.4 Provider Security
- API keys in environment variables only
- Key rotation schedule
- Minimal provider permissions

## 7. Infrastructure Security

### 7.1 Environment Variables
```bash
# .env.example
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
```

### 7.2 Secrets Management
- Never commit secrets to git
- Use environment variables
- Rotate secrets regularly
- Audit secret access

### 7.3 Dependency Security
- Regular dependency updates
- Automated vulnerability scanning
- Lock file integrity checks
- Minimal dependency surface

## 8. Monitoring & Logging

### 8.1 Security Events
- Failed login attempts
- Rate limit violations
- Unauthorized access attempts
- AI abuse attempts

### 8.2 Logging
- Structured JSON logging
- No sensitive data in logs
- Log rotation and retention
- Centralized log aggregation

### 8.3 Alerting
- Failed login threshold
- Rate limit breaches
- Unusual API patterns
- AI cost anomalies

## 9. Compliance

### 9.1 GDPR
- Data minimization
- Right to erasure
- Data portability
- Consent management

### 9.2 Privacy Policy
- Clear data collection disclosure
- Usage purpose explanation
- Third-party sharing details
- User rights information

## 10. Security Checklist

### Development
- [ ] Input validation on all endpoints
- [ ] Authentication on protected routes
- [ ] Authorization checks on resources
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] CSRF protection enabled
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention (React)

### Deployment
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database encrypted
- [ ] Backups encrypted
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Logging enabled
- [ ] Dependencies updated

### AI
- [ ] System prompts protected
- [ ] Rate limiting enforced
- [ ] Output validation enabled
- [ ] Content filtering active
- [ ] Cost monitoring enabled
- [ ] Provider keys secured
- [ ] Prompt injection prevention
- [ ] Response sanitization

## 11. Incident Response

### 11.1 Response Plan
1. **Detection**: Monitor for security events
2. **Containment**: Isolate affected systems
3. **Eradication**: Remove threat
4. **Recovery**: Restore normal operations
5. **Lessons Learned**: Document and improve

### 11.2 Contact
- Security issues: security@codepath.ai
- Vulnerability reports: Responsible disclosure program

## 12. Regular Audits

- **Weekly**: Dependency vulnerability scan
- **Monthly**: Security configuration review
- **Quarterly**: Penetration testing
- **Annually**: Full security audit
