import { PrismaClient, SkillCategory, TechCategory, Difficulty, AssessmentType, AssessmentStatus, SkillLevel, ProjectStatus, RoadmapStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Users ---
  const passwordHash = await hash("password123", 12);
  const user1 = await prisma.user.upsert({
    where: { email: "demo@codepath.ai" },
    update: {},
    create: {
      email: "demo@codepath.ai",
      name: "Demo User",
      passwordHash,
      onboarded: true,
      profile: {
        create: {
          bio: "Full-stack developer yang belajar React dan Node.js",
          location: "Jakarta, Indonesia",
          yearsExperience: 3,
          currentRole: "Junior Developer",
        },
      },
      settings: {
        create: {},
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "beginner@codepath.ai" },
    update: {},
    create: {
      email: "beginner@codepath.ai",
      name: "Coding Beginner",
      passwordHash,
      onboarded: true,
      profile: {
        create: {
          bio: "Baru mulai belajar coding",
          location: "Bandung, Indonesia",
          yearsExperience: 0,
          currentRole: "Student",
        },
      },
      settings: {
        create: {},
      },
    },
  });

  console.log("✅ Users seeded");

  // --- Skills ---
  const skillsData = [
    { name: "JavaScript", slug: "javascript", category: SkillCategory.TECHNICAL },
    { name: "TypeScript", slug: "typescript", category: SkillCategory.TECHNICAL },
    { name: "React", slug: "react", category: SkillCategory.TECHNICAL },
    { name: "Next.js", slug: "nextjs", category: SkillCategory.TECHNICAL },
    { name: "Node.js", slug: "nodejs", category: SkillCategory.TECHNICAL },
    { name: "Python", slug: "python", category: SkillCategory.TECHNICAL },
    { name: "PostgreSQL", slug: "postgresql", category: SkillCategory.TECHNICAL },
    { name: "Docker", slug: "docker", category: SkillCategory.TOOL },
    { name: "Git", slug: "git", category: SkillCategory.TOOL },
    { name: "Tailwind CSS", slug: "tailwindcss", category: SkillCategory.TECHNICAL },
    { name: "Problem Solving", slug: "problem-solving", category: SkillCategory.SOFT_SKILL },
    { name: "System Design", slug: "system-design", category: SkillCategory.TECHNICAL },
  ];

  const skills = [];
  for (const s of skillsData) {
    const skill = await prisma.skill.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    skills.push(skill);
  }

  console.log("✅ Skills seeded");

  // --- Technologies ---
  const techData = [
    { name: "React", slug: "react", category: TechCategory.FRONTEND, difficulty: Difficulty.INTERMEDIATE, popularity: 9.5 },
    { name: "Next.js", slug: "nextjs", category: TechCategory.FRONTEND, difficulty: Difficulty.INTERMEDIATE, popularity: 8.8 },
    { name: "Node.js", slug: "nodejs", category: TechCategory.BACKEND, difficulty: Difficulty.INTERMEDIATE, popularity: 9.0 },
    { name: "Python", slug: "python", category: TechCategory.PROGRAMMING_LANGUAGE, difficulty: Difficulty.BEGINNER, popularity: 9.2 },
    { name: "PostgreSQL", slug: "postgresql", category: TechCategory.DATABASE, difficulty: Difficulty.INTERMEDIATE, popularity: 8.5 },
    { name: "Docker", slug: "docker", category: TechCategory.DEVOPS, difficulty: Difficulty.INTERMEDIATE, popularity: 8.0 },
    { name: "TypeScript", slug: "typescript", category: TechCategory.PROGRAMMING_LANGUAGE, difficulty: Difficulty.INTERMEDIATE, popularity: 9.0 },
    { name: "Tailwind CSS", slug: "tailwindcss", category: TechCategory.FRONTEND, difficulty: Difficulty.BEGINNER, popularity: 8.2 },
  ];

  const technologies = [];
  for (const t of techData) {
    const tech = await prisma.technology.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
    technologies.push(tech);
  }

  console.log("✅ Technologies seeded");

  // --- User Skills for user1 ---
  const userSkillsData = [
    { skillSlug: "javascript", level: SkillLevel.ADVANCED, score: 85 },
    { skillSlug: "typescript", level: SkillLevel.INTERMEDIATE, score: 65 },
    { skillSlug: "react", level: SkillLevel.ADVANCED, score: 80 },
    { skillSlug: "nextjs", level: SkillLevel.INTERMEDIATE, score: 60 },
    { skillSlug: "nodejs", level: SkillLevel.ADVANCED, score: 75 },
    { skillSlug: "postgresql", level: SkillLevel.INTERMEDIATE, score: 55 },
    { skillSlug: "git", level: SkillLevel.ADVANCED, score: 80 },
    { skillSlug: "tailwindcss", level: SkillLevel.INTERMEDIATE, score: 70 },
  ];

  for (const us of userSkillsData) {
    const skill = skills.find((s) => s.slug === us.skillSlug);
    if (!skill) continue;
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: user1.id, skillId: skill.id } },
      update: { level: us.level, score: us.score },
      create: {
        userId: user1.id,
        skillId: skill.id,
        level: us.level,
        score: us.score,
      },
    });
  }

  // --- User Skills for user2 (beginner) ---
  const user2SkillsData = [
    { skillSlug: "javascript", level: SkillLevel.BEGINNER, score: 25 },
    { skillSlug: "python", level: SkillLevel.ELEMENTARY, score: 35 },
    { skillSlug: "git", level: SkillLevel.BEGINNER, score: 20 },
  ];

  for (const us of user2SkillsData) {
    const skill = skills.find((s) => s.slug === us.skillSlug);
    if (!skill) continue;
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: user2.id, skillId: skill.id } },
      update: { level: us.level, score: us.score },
      create: {
        userId: user2.id,
        skillId: skill.id,
        level: us.level,
        score: us.score,
      },
    });
  }

  console.log("✅ User Skills seeded");

  // --- Career Paths ---
  const careerPaths = [];
  const careerData = [
    {
      name: "Full-Stack Developer",
      slug: "fullstack-developer",
      description: "Menguasai frontend dan backend untuk membangun aplikasi lengkap dari awal sampai deploy.",
      avgSalary: "Rp 8-25jt/bulan",
      demand: "high",
      growth: "high",
      difficulty: Difficulty.INTERMEDIATE,
      tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    },
    {
      name: "Frontend Developer",
      slug: "frontend-developer",
      description: "Fokus pada user interface yang responsif, accessible, dan performa tinggi.",
      avgSalary: "Rp 7-20jt/bulan",
      demand: "high",
      growth: "high",
      difficulty: Difficulty.INTERMEDIATE,
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend Developer",
      slug: "backend-developer",
      description: "Membangun API, microservices, dan sistem backend yang scalable.",
      avgSalary: "Rp 8-28jt/bulan",
      demand: "high",
      growth: "high",
      difficulty: Difficulty.INTERMEDIATE,
      tags: ["Node.js", "Python", "PostgreSQL", "Docker"],
    },
    {
      name: "Data Engineer",
      slug: "data-engineer",
      description: "Membangun pipeline data dan infrastruktur untuk analitik machine learning.",
      avgSalary: "Rp 10-30jt/bulan",
      demand: "high",
      growth: "high",
      difficulty: Difficulty.ADVANCED,
      tags: ["Python", "SQL", "Spark", "Airflow"],
    },
    {
      name: "DevOps Engineer",
      slug: "devops-engineer",
      description: "Mengelola infrastruktur cloud, CI/CD, dan deployment pipeline.",
      avgSalary: "Rp 10-35jt/bulan",
      demand: "high",
      growth: "high",
      difficulty: Difficulty.ADVANCED,
      tags: ["Docker", "Kubernetes", "AWS", "Terraform"],
    },
  ];

  for (const c of careerData) {
    const cp = await prisma.careerPath.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    careerPaths.push(cp);
  }

  console.log("✅ Career Paths seeded");

  // --- Career Recommendations for user1 ---
  for (const cp of careerPaths) {
    const score = cp.slug === "fullstack-developer" ? 88 : cp.slug === "frontend-developer" ? 82 : Math.floor(Math.random() * 40) + 30;
    await prisma.careerRecommendation.upsert({
      where: { id: `rec-${user1.id}-${cp.id}` },
      update: {},
      create: {
        id: `rec-${user1.id}-${cp.id}`,
        userId: user1.id,
        careerPathId: cp.id,
        matchScore: score,
        reasoning: `Berdasarkan skill JavaScript, React, dan Node.js kamu, kamu cocok untuk ${cp.name}.`,
      },
    });
  }

  console.log("✅ Career Recommendations seeded");

  // --- Learning Roadmap for user1 ---
  const fullstackPath = careerPaths.find((c) => c.slug === "fullstack-developer");
  if (fullstackPath) {
    const roadmap = await prisma.learningRoadmap.upsert({
      where: { userId: user1.id },
      update: {},
      create: {
        userId: user1.id,
        careerPathId: fullstackPath.id,
        title: "Full-Stack Developer Roadmap",
        description: "Jalur belajar menjadi full-stack developer yang handal",
        estimatedHours: 400,
        estimatedWeeks: 16,
        status: RoadmapStatus.ACTIVE,
        progress: 25,
      },
    });

    const phases = [
      {
        title: "Phase 1: Fundamentals",
        description: "Dasar-dasar yang wajib dikuasai",
        nodes: [
          { title: "HTML & CSS Mastery", type: "CONCEPT" as const, difficulty: Difficulty.BEGINNER, estimatedHours: 20, order: 1 },
          { title: "JavaScript Deep Dive", type: "TUTORIAL" as const, difficulty: Difficulty.BEGINNER, estimatedHours: 40, order: 2 },
          { title: "Git & Version Control", type: "PRACTICE" as const, difficulty: Difficulty.BEGINNER, estimatedHours: 10, order: 3 },
        ],
      },
      {
        title: "Phase 2: Frontend",
        description: "Menguasai frontend framework modern",
        nodes: [
          { title: "React Fundamentals", type: "TUTORIAL" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 30, order: 1 },
          { title: "TypeScript", type: "CONCEPT" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 25, order: 2 },
          { title: "Next.js & SSR", type: "TUTORIAL" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 35, order: 3 },
          { title: "Build Portfolio Project", type: "PROJECT" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 40, order: 4 },
        ],
      },
      {
        title: "Phase 3: Backend",
        description: "Membangun backend yang scalable",
        nodes: [
          { title: "Node.js & Express", type: "TUTORIAL" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 30, order: 1 },
          { title: "Database Design (PostgreSQL)", type: "CONCEPT" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 25, order: 2 },
          { title: "REST API Design", type: "PRACTICE" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 20, order: 3 },
          { title: "Build API Project", type: "PROJECT" as const, difficulty: Difficulty.INTERMEDIATE, estimatedHours: 40, order: 4 },
        ],
      },
      {
        title: "Phase 4: Advanced",
        description: "Level up ke advanced",
        nodes: [
          { title: "Testing (Unit & E2E)", type: "PRACTICE" as const, difficulty: Difficulty.ADVANCED, estimatedHours: 25, order: 1 },
          { title: "Docker & Deployment", type: "TUTORIAL" as const, difficulty: Difficulty.ADVANCED, estimatedHours: 20, order: 2 },
          { title: "Capstone Project", type: "PROJECT" as const, difficulty: Difficulty.ADVANCED, estimatedHours: 60, order: 3 },
        ],
      },
    ];

    let nodeOrder = 0;
    for (const phase of phases) {
      const parentNode = await prisma.roadmapNode.create({
        data: {
          roadmapId: roadmap.id,
          title: phase.title,
          description: phase.description,
          type: "MILESTONE" as const,
          difficulty: Difficulty.INTERMEDIATE,
          order: ++nodeOrder,
        },
      });

      for (const node of phase.nodes) {
        await prisma.roadmapNode.create({
          data: {
            roadmapId: roadmap.id,
            parentId: parentNode.id,
            title: node.title,
            type: node.type,
            difficulty: node.difficulty,
            estimatedHours: node.estimatedHours,
            order: node.order,
          },
        });
      }
    }

    console.log("✅ Learning Roadmap seeded");
  }

  // --- Assessment for user1 ---
  const assessment = await prisma.assessment.create({
    data: {
      userId: user1.id,
      type: AssessmentType.COMPREHENSIVE,
      status: AssessmentStatus.COMPLETED,
      score: 72,
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 600000),
      duration: 600,
    },
  });

  console.log("✅ Assessments seeded");

  // --- Projects for user1 ---
  const projects = [
    {
      userId: user1.id,
      title: "Portfolio Website",
      description: "Website personal untuk showcase project-project",
      difficulty: Difficulty.BEGINNER,
      status: ProjectStatus.COMPLETED,
      tags: ["React", "Next.js", "Tailwind CSS"],
      startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      userId: user1.id,
      title: "Task Manager API",
      description: "REST API untuk manajemen tugas dengan authentication",
      difficulty: Difficulty.INTERMEDIATE,
      status: ProjectStatus.IN_PROGRESS,
      tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
      startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  console.log("✅ Projects seeded");

  // --- Coding DNA for user1 ---
  await prisma.codingDNA.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      problemSolving: 78,
      algorithmicThinking: 65,
      systemDesign: 55,
      codeQuality: 80,
      debugging: 72,
      creativity: 70,
      collaboration: 85,
      learningAbility: 82,
      primaryStyle: "Full-Stack Generalist",
      secondaryStyle: "Frontend Enthusiast",
      strengths: ["JavaScript", "React", "Problem Solving", "Collaboration"],
      growthAreas: ["System Design", "Algorithm", "Database Design"],
      recommendedFocus: ["System Design", "Data Structures", "Cloud Architecture"],
    },
  });

  console.log("✅ Coding DNA seeded");

  console.log("\n🎉 Seed completed!");
  console.log("   Demo login: demo@codepath.ai / password123");
  console.log("   Beginner login: beginner@codepath.ai / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
