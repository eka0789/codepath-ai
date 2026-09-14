# CodePath AI — AI Architecture

> Provider-agnostic AI orchestration with evidence-based recommendations

## 1. Design Principles

1. **Provider Abstraction**: Swap between OpenAI, Anthropic, Google without code changes
2. **Schema Validation**: All AI outputs validated with Zod schemas
3. **Prompt Versioning**: Track and version prompts for reproducibility
4. **Rate Limiting**: Per-user and per-provider rate limits
5. **No System Prompt Leakage**: Never expose system prompts to clients
6. **Evidence-Based**: Never recommend based on popularity; always based on user data
7. **Graceful Fallback**: If primary provider fails, fall back to secondary

## 2. Provider Abstraction

```typescript
// src/lib/ai/providers/types.ts
interface AIProvider {
  name: string;
  chat(params: ChatParams): Promise<ChatResponse>;
  chatStream(params: ChatParams): AsyncGenerator<ChatChunk>;
  generateJSON<T>(params: JSONParams): Promise<T>;
}

interface ChatParams {
  system: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: 'json'; schema: ZodSchema };
}

interface ChatResponse {
  content: string;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };
  model: string;
}

// Provider implementations
class OpenAIProvider implements AIProvider { ... }
class AnthropicProvider implements AIProvider { ... }
class GoogleProvider implements AIProvider { ... }
```

## 3. AI Orchestrator

```typescript
// src/lib/ai/orchestrator.ts
class AIOrchestrator {
  private providers: Map<string, AIProvider>;
  private engines: Map<string, AIEngine>;

  constructor() {
    this.providers = new Map();
    this.engines = new Map();
  }

  // Provider management
  addProvider(name: string, provider: AIProvider): void;
  setPrimaryProvider(name: string): void;

  // Engine access
  getEngine<T extends AIEngine>(name: string): T;

  // Generic chat with fallback
  async chat(params: ChatParams): Promise<ChatResponse>;
  async chatStream(params: ChatParams): AsyncGenerator<ChatChunk>;
}
```

## 4. Sub-Engines

### 4.1 Profile Analyzer
**Purpose**: Analyze user profile and generate coding DNA
**Input**: User profile, assessment answers, project history
**Output**: CodingDNA scores, skill assessments

```typescript
interface ProfileAnalyzerInput {
  profile: Profile;
  assessmentAnswers: AssessmentAnswer[];
  projectHistory: Project[];
}

interface ProfileAnalyzerOutput {
  codingDNA: CodingDNA;
  strengths: string[];
  growthAreas: string[];
  recommendedFocus: string[];
}
```

### 4.2 Recommendation Engine
**Purpose**: Generate career path recommendations
**Input**: CodingDNA, skills, preferences, market data
**Output**: Ranked career recommendations with match scores

```typescript
interface RecommendationInput {
  codingDNA: CodingDNA;
  skills: UserSkill[];
  preferences: UserPreferences;
  marketData?: MarketData;
}

interface RecommendationOutput {
  recommendations: CareerRecommendation[];
  reasoning: string;
  confidence: number;
}
```

### 4.3 Roadmap Generator
**Purpose**: Create personalized learning roadmaps
**Input**: Career recommendation, current skills, learning style
**Output**: Structured learning roadmap with milestones

```typescript
interface RoadmapInput {
  careerPath: CareerPath;
  currentSkills: UserSkill[];
  learningStyle: 'visual' | 'hands-on' | 'reading';
  hoursPerWeek: number;
}

interface RoadmapOutput {
  roadmap: LearningRoadmap;
  nodes: RoadmapNode[];
  estimatedCompletion: string;
}
```

### 4.4 Project Generator
**Purpose**: Recommend and generate project ideas
**Input**: Skill gaps, interests, difficulty preference
**Output**: Project suggestions with PRD drafts

```typescript
interface ProjectInput {
  skillGaps: SkillGap[];
  interests: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ProjectOutput {
  projects: ProjectSuggestion[];
  prdDraft: PRDDraft;
}
```

### 4.5 PRD Generator
**Purpose**: Generate product requirement documents
**Input**: Project description, user goals, constraints
**Output**: Structured PRD

```typescript
interface PRDInput {
  projectDescription: string;
  targetUsers: string[];
  goals: string[];
  constraints: string[];
}

interface PRDOutput {
  prd: PRD;
  sections: {
    overview: string;
    userStories: UserStory[];
    requirements: Requirement[];
    successMetrics: string[];
  };
}
```

### 4.6 Tech Spec Generator
**Purpose**: Generate technical specifications
**Input**: PRD, tech stack preferences, constraints
**Output**: Technical specification document

```typescript
interface TechSpecInput {
  prd: PRD;
  techStack: string[];
  constraints: string[];
}

interface TechSpecOutput {
  techSpec: TechnicalSpecification;
  sections: {
    architecture: string;
    dataModel: DataModel;
    apiDesign: APIDesign[];
    implementationPlan: ImplementationStep[];
  };
}
```

### 4.7 Task Generator
**Purpose**: Break down specs into implementable tasks
**Input**: Tech spec, project scope
**Output**: Task list with subtasks

```typescript
interface TaskInput {
  techSpec: TechnicalSpecification;
  scope: 'mvp' | 'full' | 'phase1';
}

interface TaskOutput {
  tasks: Task[];
  dependencies: TaskDependency[];
  estimatedTimeline: string;
}
```

### 4.8 Verification Engine
**Purpose**: Verify skill completion and project quality
**Input**: Project code, tests, deployment status
**Output**: Verification results, skill evidence

```typescript
interface VerificationInput {
  projectId: string;
  code?: string;
  tests?: TestResult[];
  deploymentUrl?: string;
}

interface VerificationOutput {
  verification: Verification;
  skillEvidence: SkillEvidence[];
  feedback: string;
  suggestions: string[];
}
```

### 4.9 Mentor
**Purpose**: Provide conversational AI guidance
**Input**: User context, conversation history, question
**Output**: Context-aware response

```typescript
interface MentorInput {
  userId: string;
  context: {
    currentPath?: string;
    recentActivity: Activity[];
    skills: UserSkill[];
    goals: string[];
  };
  messages: Message[];
  question: string;
}

interface MentorOutput {
  response: string;
  actions?: MentorAction[]; // e.g., "update_skill", "suggest_project"
  confidence: number;
}
```

## 5. Prompt Management

### Prompt Structure
```typescript
interface PromptTemplate {
  id: string;
  version: string;
  name: string;
  description: string;
  system: string;
  user: string;
  examples?: Example[];
  outputSchema: ZodSchema;
}
```

### Prompt Registry
```typescript
// src/lib/ai/prompts/registry.ts
const promptRegistry = {
  'profile-analyzer': {
    v1: ProfileAnalyzerPromptV1,
    v2: ProfileAnalyzerPromptV2,
  },
  'recommendation-engine': {
    v1: RecommendationPromptV1,
  },
  // ...
};
```

## 6. Rate Limiting

```typescript
// src/lib/ai/rate-limiter.ts
interface RateLimitConfig {
  perUser: {
    requests: number;
    windowMs: number;
  };
  perProvider: {
    requests: number;
    windowMs: number;
  };
  tokensPerDay: number;
}

const defaultConfig: RateLimitConfig = {
  perUser: { requests: 60, windowMs: 60000 }, // 60 req/min
  perProvider: { requests: 1000, windowMs: 60000 }, // 1000 req/min
  tokensPerDay: 100000, // 100K tokens/day/user
};
```

## 7. Response Validation

```typescript
// src/lib/ai/validators.ts
function validateAIResponse<T>(
  response: string,
  schema: ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const parsed = JSON.parse(response);
    const result = schema.safeParse(parsed);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, error: result.error.message };
  } catch (e) {
    return { success: false, error: 'Invalid JSON response' };
  }
}
```

## 8. Fallback Strategy

```
Primary Provider (OpenAI)
    ↓ (failure)
Secondary Provider (Anthropic)
    ↓ (failure)
Tertiary Provider (Google)
    ↓ (failure)
Cached Response (if available)
    ↓ (failure)
Error Response (user-friendly message)
```

## 9. Monitoring & Observability

- **Token Usage**: Track per-user and total token consumption
- **Latency**: Monitor response times per provider
- **Error Rates**: Track failures and fallbacks
- **Cost**: Calculate per-user AI costs
- **Quality**: Log response quality metrics

## 10. Security

- System prompts never sent to client
- API keys stored in environment variables only
- Response content filtered for sensitive data
- User data anonymized in logs
- Rate limiting prevents abuse
