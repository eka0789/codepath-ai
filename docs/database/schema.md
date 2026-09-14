# CodePath AI — Database Schema

> PostgreSQL + Prisma ORM

## Overview

This document defines the complete database schema for CodePath AI, covering ~30 core entities organized into logical domains.

## Entity Groups

### 1. User & Authentication

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  avatar        String?
  passwordHash  String?
  provider      String    @default("credentials") // credentials, google, github
  providerId    String?
  onboarded     Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  profile       Profile?
  assessments   Assessment[]
  codingDNA     CodingDNA?
  skills        UserSkill[]
  careers       CareerRecommendation[]
  roadmaps      LearningRoadmap[]
  projects      Project[]
  achievements  Achievement[]
  conversations AIConversation[]
  sessions      Session[]
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 2. Profile

```prisma
model Profile {
  id              String  @id @default(uuid())
  userId          String  @unique
  bio             String?
  experienceLevel String? // beginner, intermediate, advanced, expert
  yearsExperience Int?
  currentRole     String?
  targetRole      String?
  preferredStack  String[] // ["javascript", "react", "node"]
  goals           String[] // ["get_hired", "switch_career", "improve_skills"]
  location        String?
  website         String?
  github          String?
  linkedin        String?

  user            User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 3. Assessment

```prisma
model Assessment {
  id          String   @id @default(uuid())
  userId      String
  type        String   // coding_fundamentals, career_interest, skill_level
  status      String   @default("pending") // pending, in_progress, completed
  score       Int?
  maxScore    Int?
  duration    Int?     // seconds
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  answers     AssessmentAnswer[]
}

model AssessmentAnswer {
  id           String     @id @default(uuid())
  assessmentId String
  questionId   String
  answer       String
  isCorrect    Boolean?
  timeSpent    Int?       // seconds

  assessment   Assessment @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
}
```

### 4. Coding DNA

```prisma
model CodingDNA {
  id            String  @id @default(uuid())
  userId        String  @unique
  frontend      Int     @default(0) // 0-100
  backend       Int     @default(0)
  fullstack     Int     @default(0)
  mobile        Int     @default(0)
  devops        Int     @default(0)
  dataScience   Int     @default(0)
  aiMl          Int     @default(0)
  gameDev       Int     @default(0)
  security      Int     @default(0)
  problemSolving Int    @default(0)
  systemDesign  Int     @default(0)
  updatedAt     DateTime @updatedAt

  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 5. Skills & Technologies

```prisma
model Technology {
  id          String  @id @default(uuid())
  name        String  @unique
  slug        String  @unique
  category    String  // frontend, backend, database, devops, mobile, ai
  icon        String?
  description String?
  website     String?

  skills      UserSkill[]
  roadmaps    RoadmapNode[]
  challenges  Challenge[]
}

model Skill {
  id          String  @id @default(uuid())
  name        String  @unique
  slug        String  @unique
  category    String
  description String?

  users       UserSkill[]
  evidence    SkillEvidence[]
}

model UserSkill {
  id           String   @id @default(uuid())
  userId       String
  skillId      String
  level        String   @default("beginner") // beginner, intermediate, advanced, expert
  score        Int      @default(0) // 0-100
  verified     Boolean  @default(false)
  lastUsed     DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  skill        Skill    @relation(fields: [skillId], references: [id], onDelete: Cascade)

  @@unique([userId, skillId])
}

model SkillEvidence {
  id           String   @id @default(uuid())
  userSkillId  String
  type         String   // project, challenge, assessment, contribution
  title        String
  description  String?
  url          String?
  score        Int?
  verifiedAt   DateTime?
  createdAt    DateTime @default(now())

  userSkill    UserSkill @relation(fields: [userSkillId], references: [id], onDelete: Cascade)
}
```

### 6. Career Paths & Recommendations

```prisma
model CareerPath {
  id              String  @id @default(uuid())
  title           String  @unique
  slug            String  @unique
  description     String
  avgSalary       String?
  growthRate      String? // "above_average", "average", "below_average"
  requiredSkills  Json    // [{skill: "react", level: "intermediate", weight: 0.8}]
  technologies    Technology[]
  createdAt       DateTime @default(now())

  recommendations CareerRecommendation[]
  roadmaps        LearningRoadmap[]
}

model CareerRecommendation {
  id            String   @id @default(uuid())
  userId        String
  careerPathId  String
  matchScore    Int      // 0-100
  reason        String   // AI-generated explanation
  skillGaps     Json     // [{skill: "kubernetes", current: "beginner", required: "intermediate"}]
  timeEstimate  String?  // "3-6 months"
  createdAt     DateTime @default(now())

  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  careerPath    CareerPath @relation(fields: [careerPathId], references: [id], onDelete: Cascade)

  @@unique([userId, careerPathId])
}
```

### 7. Learning Roadmaps

```prisma
model LearningRoadmap {
  id              String   @id @default(uuid())
  userId          String
  careerPathId    String
  title           String
  description     String?
  status          String   @default("active") // active, paused, completed
  progress        Int      @default(0) // 0-100
  estimatedHours  Int?
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  createdAt       DateTime @default(now())

  user            User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  careerPath      CareerPath @relation(fields: [careerPathId], references: [id], onDelete: Cascade)
  nodes           RoadmapNode[]
}

model RoadmapNode {
  id              String        @id @default(uuid())
  roadmapId       String
  title           String
  description     String?
  type            String        // learning, practice, project, assessment
  status          String        @default("pending") // pending, in_progress, completed
  order           Int
  duration        Int?          // estimated hours
  resources       Json?         // [{type: "course", url: "...", title: "..."}]
  technologyId    String?
  prerequisites   String[]      // node IDs

  roadmap         LearningRoadmap @relation(fields: [roadmapId], references: [id], onDelete: Cascade)
  technology      Technology?     @relation(fields: [technologyId], references: [id])
}
```

### 8. Projects & Workspace

```prisma
model Project {
  id              String   @id @default(uuid())
  userId          String
  title           String
  description     String?
  difficulty      String   // beginner, intermediate, advanced
  status          String   @default("suggested") // suggested, in_progress, completed
  techStack       String[]
  estimatedHours  Int?
  repositoryUrl   String?
  deployedUrl     String?
  startedAt       DateTime?
  completedAt     DateTime?
  createdAt       DateTime @default(now())

  user            User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  prd             PRD?
  techSpec        TechnicalSpecification?
  tasks           Task[]
  verifications   Verification[]
}

model PRD {
  id          String   @id @default(uuid())
  projectId   String   @unique
  title       String
  content     Json     // Structured PRD content
  version     String   @default("1.0")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model TechnicalSpecification {
  id          String   @id @default(uuid())
  projectId   String   @unique
  title       String
  content     Json     // Structured tech spec content
  version     String   @default("1.0")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Task {
  id          String    @id @default(uuid())
  projectId   String
  title       String
  description String?
  status      String    @default("pending") // pending, in_progress, completed
  priority    String    @default("medium") // low, medium, high
  order       Int
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  project     Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  subTasks    SubTask[]
}

model SubTask {
  id          String   @id @default(uuid())
  taskId      String
  title       String
  completed   Boolean  @default(false)
  order       Int

  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
}
```

### 9. Verification & Challenges

```prisma
model Verification {
  id          String   @id @default(uuid())
  projectId   String
  userId      String
  type        String   // code_review, test_pass, deployment, peer_review
  status      String   @default("pending") // pending, passed, failed
  score       Int?
  feedback    String?
  verifiedAt  DateTime?
  createdAt   DateTime @default(now())

  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Challenge {
  id              String   @id @default(uuid())
  title           String
  slug            String   @unique
  description     String
  difficulty      String   // easy, medium, hard
  category        String   // algorithms, data_structures, system_design, etc.
  timeLimit       Int?     // minutes
  content         Json     // challenge content
  technologyId    String?
  createdAt       DateTime @default(now())

  technology      Technology? @relation(fields: [technologyId], references: [id])
  submissions     ChallengeSubmission[]
}

model ChallengeSubmission {
  id          String   @id @default(uuid())
  challengeId String
  userId      String
  code        String
  language    String
  status      String   // pending, running, passed, failed
  score       Int?
  timeSpent   Int?     // seconds
  submittedAt DateTime @default(now())

  challenge   Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)
}
```

### 10. AI & Analytics

```prisma
model AIConversation {
  id          String   @id @default(uuid())
  userId      String
  context     String?  // mentor, roadmap, project, etc.
  messages    Json[]   // [{role: "user"|"assistant", content: "..."}]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Achievement {
  id          String   @id @default(uuid())
  userId      String
  type        String   // skill_master, project_complete, streak, etc.
  title       String
  description String?
  icon        String?
  earnedAt    DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model UserActivity {
  id          String   @id @default(uuid())
  userId      String
  action      String   // login, assessment_complete, project_start, etc.
  metadata    Json?
  createdAt   DateTime @default(now())

  @@index([userId, createdAt])
}
```

## Relationships Summary

```
User ──┬── Profile (1:1)
       ├── Assessment (1:N)
       ├── CodingDNA (1:1)
       ├── UserSkill (1:N)
       ├── CareerRecommendation (1:N)
       ├── LearningRoadmap (1:N)
       ├── Project (1:N)
       ├── AIConversation (1:N)
       ├── Achievement (1:N)
       └── Session (1:N)

CareerPath ─── CareerRecommendation (1:N)
             └── LearningRoadmap (1:N)

LearningRoadmap ─── RoadmapNode (1:N)

Project ──┬── PRD (1:1)
          ├── TechnicalSpecification (1:1)
          ├── Task (1:N)
          └── Verification (1:N)

Technology ─── UserSkill (1:N)
             └── Challenge (1:N)

Skill ─── UserSkill (1:N)
        └── SkillEvidence (1:N)
```

## Migration Strategy

1. **Phase 1**: User, Profile, Session, Assessment
2. **Phase 2**: Skill, Technology, UserSkill, CodingDNA
3. **Phase 3**: CareerPath, CareerRecommendation, LearningRoadmap, RoadmapNode
4. **Phase 4**: Project, PRD, TechnicalSpecification, Task, SubTask
5. **Phase 5**: Verification, Challenge, ChallengeSubmission
6. **Phase 6**: AIConversation, Achievement, UserActivity
