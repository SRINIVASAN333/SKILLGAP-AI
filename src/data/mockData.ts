import {
  CandidateProfile,
  JobRole,
  LearningRoadmapStep,
  AssessmentQuestion,
  ProgressHistoryRecord
} from '../types';

export const INITIAL_PROFILES: CandidateProfile[] = [
  {
    id: 'candidate-alex',
    name: 'Alex Morgan',
    rollNumber: 'EMP-2026-001',
    email: 'alex.morgan@organization.com',
    institution: 'Global Technology Institute',
    department: 'Software Engineering',
    yearOfStudy: 'Experienced Professional',
    targetRole: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    summary: 'Enthusiastic software engineer with hands-on experience in full-stack web applications, database management, and cloud basics. Passionate about scalable distributed systems and modern web frameworks.',
    education: [
      {
        degree: 'B.S. Computer Science and Engineering',
        institution: 'Global Technology Institute',
        specialization: 'Computer Science & Engineering',
        year: '2020 - 2024',
        grade: 'CGPA 3.8 / 4.0'
      },
      {
        degree: 'Higher Secondary Education',
        institution: 'State Technical Academy',
        specialization: 'Mathematics & Computer Science',
        year: '2018 - 2020',
        grade: '92.4%'
      }
    ],
    projects: [
      {
        title: 'Online Hotel & Event Booking Platform',
        description: 'Architected a multi-tier reservation portal using Java, React.js, and MySQL. Features real-time room availability, payment gateway simulation, and booking receipts.',
        technologies: ['React.js', 'Java', 'SQL', 'HTML', 'CSS', 'JavaScript'],
        role: 'Full Stack Developer'
      },
      {
        title: 'Automated Attendance System using QR & RFID',
        description: 'Developed an automated enterprise attendance tracking tool with instant logging and admin dashboard generation.',
        technologies: ['Python', 'SQL', 'Git', 'REST API'],
        role: 'Lead Backend Developer'
      }
    ],
    experience: [
      {
        role: 'Full Stack Web Intern',
        organization: 'TechVerve Innovations',
        duration: 'May 2025 – July 2025 (3 Months)',
        description: 'Collaborated on frontend UI with React.js and created relational schema queries in MySQL with sub-50ms execution.'
      }
    ],
    certifications: [
      'Oracle Certified Associate: Java SE Programmer',
      'Meta Frontend Developer Certificate (Coursera)',
      'HackerRank SQL (Advanced) 5-Star Gold Badge'
    ],
    skills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', proficiency: 'Proficient', confidence: 95, source: 'Resume', yearsExperience: 2 },
      { name: 'JavaScript', normalizedName: 'javascript', category: 'Programming Languages', proficiency: 'Proficient', confidence: 92, source: 'Resume', yearsExperience: 2 },
      { name: 'React.js', normalizedName: 'react', category: 'Frameworks & Libraries', proficiency: 'Proficient', confidence: 90, source: 'Resume', yearsExperience: 1.5 },
      { name: 'HTML5', normalizedName: 'html', category: 'Programming Languages', proficiency: 'Advanced', confidence: 98, source: 'Resume', yearsExperience: 3 },
      { name: 'CSS3', normalizedName: 'css', category: 'Programming Languages', proficiency: 'Proficient', confidence: 94, source: 'Resume', yearsExperience: 3 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', proficiency: 'Proficient', confidence: 92, source: 'Assessment Verified', yearsExperience: 2 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', proficiency: 'Intermediate', confidence: 85, source: 'Resume', yearsExperience: 2 },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', proficiency: 'Intermediate', confidence: 82, source: 'Resume', yearsExperience: 1 }
    ]
  },
  {
    id: 'candidate-jordan',
    name: 'Jordan Taylor',
    rollNumber: 'EMP-2026-002',
    email: 'jordan.taylor@organization.com',
    institution: 'Institute of Technology',
    department: 'Software Engineering',
    yearOfStudy: 'Software Engineer',
    targetRole: 'Software Engineer',
    summary: 'Aspiring software engineer with robust fundamentals in Object Oriented Programming, Data Structures & Algorithms, and backend microservices.',
    education: [
      {
        degree: 'B.S. Computer Science and Engineering',
        institution: 'Institute of Technology',
        specialization: 'Computer Science',
        year: '2020 - 2024',
        grade: 'CGPA 3.9 / 4.0'
      }
    ],
    projects: [
      {
        title: 'Distributed File Indexing Engine',
        description: 'Constructed an in-memory inverted index supporting fuzzy queries and multithreaded crawling.',
        technologies: ['Java', 'Data Structures & Algorithms', 'Python', 'Git']
      }
    ],
    experience: [
      {
        role: 'Software Engineering Trainee',
        organization: 'Vanguard Software',
        duration: 'June 2025 - August 2025',
        description: 'Implemented algorithmic graph traversal algorithms for logistics optimization.'
      }
    ],
    certifications: ['LeetCode 300+ Problems Solved Badge', 'AWS Cloud Practitioner'],
    skills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', proficiency: 'Advanced', confidence: 96, source: 'Resume', yearsExperience: 2.5 },
      { name: 'Python', normalizedName: 'python', category: 'Programming Languages', proficiency: 'Proficient', confidence: 90, source: 'Resume', yearsExperience: 2 },
      { name: 'Data Structures & Algorithms', normalizedName: 'data structures & algorithms', category: 'Professional Skills', proficiency: 'Proficient', confidence: 92, source: 'Resume', yearsExperience: 2 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', proficiency: 'Proficient', confidence: 88, source: 'Resume', yearsExperience: 2 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', proficiency: 'Proficient', confidence: 89, source: 'Resume', yearsExperience: 2 },
      { name: 'Problem Solving', normalizedName: 'problem solving', category: 'Professional Skills', proficiency: 'Advanced', confidence: 94, source: 'Resume', yearsExperience: 3 }
    ]
  },
  {
    id: 'candidate-taylor',
    name: 'Taylor Smith',
    rollNumber: 'EMP-2026-003',
    email: 'taylor.smith@organization.com',
    institution: 'Technical University',
    department: 'Software Engineering',
    yearOfStudy: 'Backend Developer',
    targetRole: 'Backend Developer',
    summary: 'Backend-focused developer proficient in Node.js, Spring Boot microservices, MongoDB, and Redis caching layers.',
    education: [
      {
        degree: 'B.S. Computer Science and Engineering',
        institution: 'Technical University',
        specialization: 'Software Engineering',
        year: '2020 - 2024',
        grade: 'CGPA 3.7 / 4.0'
      }
    ],
    projects: [
      {
        title: 'E-Commerce High-Throughput Cart Service',
        description: 'Engineered a Redis-backed order checkout queue handling 1,500 simultaneous requests.',
        technologies: ['Node.js', 'MongoDB', 'Redis', 'Docker']
      }
    ],
    experience: [],
    certifications: ['MongoDB Certified Developer', 'Node.js Application Developer'],
    skills: [
      { name: 'Node.js', normalizedName: 'node.js', category: 'Frameworks & Libraries', proficiency: 'Proficient', confidence: 91, source: 'Resume', yearsExperience: 2 },
      { name: 'JavaScript', normalizedName: 'javascript', category: 'Programming Languages', proficiency: 'Proficient', confidence: 90, source: 'Resume', yearsExperience: 2 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', proficiency: 'Intermediate', confidence: 84, source: 'Resume', yearsExperience: 1.5 },
      { name: 'MongoDB', normalizedName: 'mongodb', category: 'Databases', proficiency: 'Proficient', confidence: 88, source: 'Resume', yearsExperience: 2 },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', proficiency: 'Proficient', confidence: 90, source: 'Resume', yearsExperience: 2 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', proficiency: 'Intermediate', confidence: 85, source: 'Resume', yearsExperience: 2 }
    ]
  },
  {
    id: 'candidate-morgan',
    name: 'Morgan Lee',
    rollNumber: 'EMP-2026-004',
    email: 'morgan.lee@organization.com',
    institution: 'University of Technology',
    department: 'Data Science',
    yearOfStudy: 'Data Analyst',
    targetRole: 'Data Analyst',
    summary: 'Data enthusiast skilled in Python, SQL data querying, statistical modeling, Pandas pipelines, and Tableau visual storytelling.',
    education: [
      {
        degree: 'B.S. Data Science and Analytics',
        institution: 'University of Technology',
        specialization: 'Data Science',
        year: '2020 - 2024',
        grade: 'CGPA 3.8 / 4.0'
      }
    ],
    projects: [
      {
        title: 'Customer Churn Prediction & Analytics Dashboard',
        description: 'Analyzed telecommunications dataset of 50k users, identifying top churn triggers with 86% recall.',
        technologies: ['Python', 'SQL', 'Pandas', 'NumPy', 'Tableau']
      }
    ],
    experience: [],
    certifications: ['Google Data Analytics Professional Certificate', 'Tableau Desktop Specialist'],
    skills: [
      { name: 'Python', normalizedName: 'python', category: 'Programming Languages', proficiency: 'Proficient', confidence: 94, source: 'Resume', yearsExperience: 2 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', proficiency: 'Proficient', confidence: 91, source: 'Resume', yearsExperience: 2 },
      { name: 'Pandas', normalizedName: 'pandas', category: 'Data Science & AI', proficiency: 'Proficient', confidence: 89, source: 'Resume', yearsExperience: 1.5 },
      { name: 'NumPy', normalizedName: 'numpy', category: 'Data Science & AI', proficiency: 'Proficient', confidence: 87, source: 'Resume', yearsExperience: 1.5 },
      { name: 'Tableau', normalizedName: 'tableau', category: 'Data Science & AI', proficiency: 'Intermediate', confidence: 82, source: 'Resume', yearsExperience: 1 },
      { name: 'Data Visualization', normalizedName: 'data visualization', category: 'Data Science & AI', proficiency: 'Proficient', confidence: 88, source: 'Resume', yearsExperience: 2 }
    ]
  }
];

export const JOB_ROLES_DATABASE: JobRole[] = [
  {
    id: 'role-full-stack',
    title: 'Full Stack Developer',
    department: 'Product Engineering',
    experienceLevel: 'Entry-Level',
    description: 'Responsible for end-to-end web engineering, spanning responsive client-side user interfaces, performant server-side RESTful APIs, robust database design, and cloud container deployment.',
    averageSalaryRange: '$75,000 - $115,000',
    educationRequirement: 'B.S. / B.Tech in Computer Science, Information Technology, or equivalent',
    certificationsRecommended: ['AWS Certified Developer', 'Oracle Certified Java SE', 'Meta React Professional'],
    requiredSkills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Proficient', weight: 5, description: 'Core backend object-oriented language' },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', priority: 'High', requiredProficiency: 'Proficient', weight: 5, description: 'Relational query formulation and data modeling' },
      { name: 'JavaScript', normalizedName: 'javascript', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Proficient', weight: 5, description: 'Core browser scripting and asynchronous flow' },
      { name: 'React.js', normalizedName: 'react', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 5, description: 'Component architecture and state management' },
      { name: 'HTML5', normalizedName: 'html', category: 'Programming Languages', priority: 'Medium', requiredProficiency: 'Proficient', weight: 3, description: 'Semantic markup and web accessibility' },
      { name: 'CSS3', normalizedName: 'css', category: 'Programming Languages', priority: 'Medium', requiredProficiency: 'Proficient', weight: 3, description: 'Responsive styling, Flexbox, and Grid' },
      { name: 'Spring Boot', normalizedName: 'spring boot', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Intermediate', weight: 5, description: 'Enterprise Java microservice framework' },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 4, description: 'API contract design, HTTP verbs, JSON payloads' },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3, description: 'Version control, branching, PR workflows' },
      { name: 'Docker', normalizedName: 'docker', category: 'Development Tools', priority: 'High', requiredProficiency: 'Intermediate', weight: 4, description: 'Containerization, Dockerfile creation, image building' },
      { name: 'AWS', normalizedName: 'aws', category: 'Cloud & Emerging Technologies', priority: 'High', requiredProficiency: 'Intermediate', weight: 4, description: 'Cloud compute (EC2), S3 storage, basic deployments' },
      { name: 'System Design', normalizedName: 'system design', category: 'Professional Skills', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 4, description: 'Architectural trade-offs, caching, modular layers' },
      { name: 'MongoDB', normalizedName: 'mongodb', category: 'Databases', priority: 'Low', requiredProficiency: 'Beginner', weight: 2, description: 'NoSQL document database querying' },
      { name: 'Node.js', normalizedName: 'node.js', category: 'Frameworks & Libraries', priority: 'Low', requiredProficiency: 'Beginner', weight: 2, description: 'Server-side JavaScript runtime' }
    ]
  },
  {
    id: 'role-software-engineer',
    title: 'Software Engineer',
    department: 'Core Platform',
    experienceLevel: 'Entry-Level',
    description: 'Builds robust, high-performance software systems. Focuses on data structures, algorithmic efficiency, clean code practices, and reliable distributed components.',
    averageSalaryRange: '$80,000 - $120,000',
    educationRequirement: 'B.S. / B.Tech in Computer Science / IT',
    certificationsRecommended: ['LeetCode / HackerRank Verified', 'GCP Associate Cloud Engineer'],
    requiredSkills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'Python', normalizedName: 'python', category: 'Programming Languages', priority: 'Medium', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'Data Structures & Algorithms', normalizedName: 'data structures & algorithms', category: 'Professional Skills', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', priority: 'Medium', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'System Design', normalizedName: 'system design', category: 'Professional Skills', priority: 'High', requiredProficiency: 'Intermediate', weight: 4 },
      { name: 'Docker', normalizedName: 'docker', category: 'Development Tools', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'Problem Solving', normalizedName: 'problem solving', category: 'Professional Skills', priority: 'High', requiredProficiency: 'Advanced', weight: 5 }
    ]
  },
  {
    id: 'role-frontend-developer',
    title: 'Frontend Developer',
    department: 'Client Applications',
    experienceLevel: 'Entry-Level',
    description: 'Specializes in creating accessible, responsive, and delightful user interfaces. Delivers state-driven client web applications with modern styling and fluid interactivity.',
    averageSalaryRange: '$70,000 - $105,000',
    educationRequirement: 'B.S. / B.Tech in Computer Science or Design',
    certificationsRecommended: ['Meta Frontend Professional', 'TypeScript Certification'],
    requiredSkills: [
      { name: 'JavaScript', normalizedName: 'javascript', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Advanced', weight: 5 },
      { name: 'React.js', normalizedName: 'react', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'TypeScript', normalizedName: 'typescript', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Intermediate', weight: 4 },
      { name: 'HTML5', normalizedName: 'html', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Advanced', weight: 4 },
      { name: 'CSS3', normalizedName: 'css', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Advanced', weight: 4 },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', priority: 'Medium', requiredProficiency: 'Proficient', weight: 3 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 }
    ]
  },
  {
    id: 'role-backend-developer',
    title: 'Backend Developer',
    department: 'Server Infrastructure',
    experienceLevel: 'Entry-Level',
    description: 'Designs reliable RESTful and microservice architectures, manages persistent SQL and NoSQL databases, ensures application security, and optimizes data throughput.',
    averageSalaryRange: '$75,000 - $115,000',
    educationRequirement: 'B.S. / B.Tech in Computer Science / IT',
    certificationsRecommended: ['Spring Professional Certification', 'AWS Certified Solutions Architect'],
    requiredSkills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'Node.js', normalizedName: 'node.js', category: 'Frameworks & Libraries', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 4 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'MongoDB', normalizedName: 'mongodb', category: 'Databases', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 },
      { name: 'Spring Boot', normalizedName: 'spring boot', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'Docker', normalizedName: 'docker', category: 'Development Tools', priority: 'High', requiredProficiency: 'Intermediate', weight: 4 },
      { name: 'AWS', normalizedName: 'aws', category: 'Cloud & Emerging Technologies', priority: 'High', requiredProficiency: 'Intermediate', weight: 4 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 },
      { name: 'System Design', normalizedName: 'system design', category: 'Professional Skills', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 }
    ]
  },
  {
    id: 'role-java-developer',
    title: 'Java Developer',
    department: 'Enterprise Systems',
    experienceLevel: 'Entry-Level',
    description: 'Develops enterprise-grade Java backends utilizing Spring Boot, JPA/Hibernate, relational databases, and multi-threaded event pipelines.',
    averageSalaryRange: '$72,000 - $110,000',
    educationRequirement: 'B.S. / B.Tech in Computer Science or IT',
    certificationsRecommended: ['Oracle Certified Professional: Java SE 17 Developer'],
    requiredSkills: [
      { name: 'Java', normalizedName: 'java', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Advanced', weight: 5 },
      { name: 'Spring Boot', normalizedName: 'spring boot', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'REST API', normalizedName: 'rest api', category: 'Frameworks & Libraries', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'Git', normalizedName: 'git', category: 'Development Tools', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 },
      { name: 'System Design', normalizedName: 'system design', category: 'Professional Skills', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 }
    ]
  },
  {
    id: 'role-data-analyst',
    title: 'Data Analyst',
    department: 'Business Intelligence & Analytics',
    experienceLevel: 'Entry-Level',
    description: 'Translates raw organizational data into actionable business intelligence. Builds dashboards, writes complex SQL queries, and leverages Python for exploratory analysis.',
    averageSalaryRange: '$65,000 - $95,000',
    educationRequirement: 'B.S. / B.Tech / B.Sc in Computer Science, Statistics, Mathematics, or Data Science',
    certificationsRecommended: ['Google Data Analytics Certificate', 'Tableau Desktop Specialist'],
    requiredSkills: [
      { name: 'SQL', normalizedName: 'sql', category: 'Databases', priority: 'High', requiredProficiency: 'Advanced', weight: 5 },
      { name: 'Python', normalizedName: 'python', category: 'Programming Languages', priority: 'High', requiredProficiency: 'Proficient', weight: 5 },
      { name: 'Pandas', normalizedName: 'pandas', category: 'Data Science & AI', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'NumPy', normalizedName: 'numpy', category: 'Data Science & AI', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 },
      { name: 'Data Visualization', normalizedName: 'data visualization', category: 'Data Science & AI', priority: 'High', requiredProficiency: 'Proficient', weight: 4 },
      { name: 'Tableau', normalizedName: 'tableau', category: 'Data Science & AI', priority: 'Medium', requiredProficiency: 'Intermediate', weight: 3 }
    ]
  }
];

export const INITIAL_ROADMAP_STEPS: LearningRoadmapStep[] = [
  {
    id: 'step-1',
    week: 1,
    skillName: 'SQL',
    title: 'SQL Advanced & Query Optimization',
    category: 'Databases',
    priority: 'High',
    concepts: ['Joins, Indexing, Window Functions (ROW_NUMBER, RANK), and Query Performance Tuning'],
    resources: [
      { title: 'W3Schools SQL Advanced Track', type: 'Interactive Course', provider: 'W3Schools', url: 'https://www.w3schools.com/sql/' },
      { title: 'Mode SQL Analytics Tutorial', type: 'Guide', provider: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/' },
      { title: 'PostgreSQL Execution Plan Explained', type: 'Documentation', provider: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/' }
    ],
    practiceTask: 'Optimize 3 slow queries from your Hotel Booking System project using indexes and EXPLAIN ANALYZE.',
    projectSuggestion: 'Create an automated database migration script and indexing schema for 100k booking records.',
    estimatedHours: 12,
    completed: false
  },
  {
    id: 'step-2',
    week: 2,
    skillName: 'Spring Boot',
    title: 'Spring Boot Basics & REST Controllers',
    category: 'Frameworks & Libraries',
    priority: 'High',
    concepts: ['Spring Core concepts, Inversion of Control (IoC), Dependency Injection, and building your first REST controller'],
    resources: [
      { title: 'Building a RESTful Web Service', type: 'Guide', provider: 'spring.io guides', url: 'https://spring.io/guides/gs/rest-service/' },
      { title: 'Spring Boot Quick Guides', type: 'Documentation', provider: 'Spring Official', url: 'https://spring.io/projects/spring-boot' },
      { title: 'Baeldung Spring Boot Essentials', type: 'Interactive Course', provider: 'Baeldung', url: 'https://www.baeldung.com/spring-boot' }
    ],
    practiceTask: 'Rebuild one CRM customer endpoint using Spring Boot with validation and JSON response.',
    projectSuggestion: 'Build a Spring Boot microservice for User Authentication with JWT issuance.',
    estimatedHours: 14,
    completed: false
  },
  {
    id: 'step-3',
    week: 3,
    skillName: 'REST API',
    title: 'REST API Development & Security',
    category: 'Frameworks & Libraries',
    priority: 'High',
    concepts: ['Idempotency, HTTP status codes, OAuth2/JWT token verification, pagination, and rate limiting'],
    resources: [
      { title: 'RESTful API Design Best Practices', type: 'Guide', provider: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design' },
      { title: 'Postman API Testing Automation', type: 'Video Tutorial', provider: 'Postman Academy', url: 'https://learning.postman.com/' }
    ],
    practiceTask: 'Implement standard error handling middleware with RFC 7807 Problem Details format.',
    projectSuggestion: 'Publish a fully documented Swagger/OpenAPI specification for your booking service.',
    estimatedHours: 10,
    completed: false
  },
  {
    id: 'step-4',
    week: 4,
    skillName: 'Docker',
    title: 'Docker & Containerization',
    category: 'Development Tools',
    priority: 'High',
    concepts: ['Dockerfile multi-stage builds, container lifecycle, Docker Compose for multi-container apps, port forwarding'],
    resources: [
      { title: 'Docker Get Started Official Guide', type: 'Documentation', provider: 'Docker Docs', url: 'https://docs.docker.com/get-started/' },
      { title: 'Play with Docker Interactive Labs', type: 'Interactive Course', provider: 'Docker Inc', url: 'https://labs.play-with-docker.com/' }
    ],
    practiceTask: 'Containerize your React client and Spring Boot server using docker-compose.yml with healthchecks.',
    projectSuggestion: 'Deploy a multi-tier containerized stack with React, Spring Boot, and MySQL.',
    estimatedHours: 14,
    completed: false
  },
  {
    id: 'step-5',
    week: 5,
    skillName: 'AWS',
    title: 'AWS Cloud Fundamentals',
    category: 'Cloud & Emerging Technologies',
    priority: 'High',
    concepts: ['Amazon EC2 virtual servers, S3 bucket storage, security groups, IAM least-privilege roles'],
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', type: 'Interactive Course', provider: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/' },
      { title: 'Deploying Docker Containers to AWS', type: 'Guide', provider: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/' }
    ],
    practiceTask: 'Provision an S3 bucket with public read access disabled and upload project assets via AWS CLI.',
    projectSuggestion: 'Deploy your containerized full-stack application to AWS Elastic Beanstalk or EC2.',
    estimatedHours: 16,
    completed: false
  },
  {
    id: 'step-6',
    week: 6,
    skillName: 'System Design',
    title: 'System Design Basics & Scalability',
    category: 'Professional Skills',
    priority: 'Medium',
    concepts: ['Horizontal vs vertical scaling, load balancing algorithms, database sharding & replication, Redis caching strategies'],
    resources: [
      { title: 'System Design Primer', type: 'Guide', provider: 'GitHub Open Source (Donne Martin)', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'Designing Data-Intensive Applications Summary', type: 'Documentation', provider: 'OReilly', url: 'https://dataintensive.net/' }
    ],
    practiceTask: 'Diagram the architecture for a URL shortening service handling 10,000 QPS with Redis cache.',
    projectSuggestion: 'Write a comprehensive Architecture Decision Record (ADR) for your capstone project.',
    estimatedHours: 15,
    completed: false
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // SQL Questions
  {
    id: 'q-sql-1',
    skill: 'SQL',
    difficulty: 'Basic',
    question: 'Which SQL clause is used to filter records after aggregation with a GROUP BY statement?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
    correctAnswerIndex: 1,
    explanation: 'The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions like COUNT(), SUM(), AVG().'
  },
  {
    id: 'q-sql-2',
    skill: 'SQL',
    difficulty: 'Intermediate',
    question: 'What is the key functional difference between ROW_NUMBER() and DENSE_RANK() in SQL window functions?',
    options: [
      'ROW_NUMBER() leaves gaps when duplicate values occur, whereas DENSE_RANK() does not.',
      'ROW_NUMBER() assigns a unique sequential integer to each row regardless of duplicates, whereas DENSE_RANK() assigns the same rank to identical values without leaving rank gaps.',
      'DENSE_RANK() requires an explicit PARTITION BY while ROW_NUMBER() cannot use partitions.',
      'Both functions behave identically in ANSI SQL.'
    ],
    correctAnswerIndex: 1,
    explanation: 'ROW_NUMBER() always numbers sequentially 1, 2, 3... while DENSE_RANK() assigns identical ranks to ties (e.g. 1, 2, 2, 3) without skipping rank positions.'
  },
  {
    id: 'q-sql-3',
    skill: 'SQL',
    difficulty: 'Advanced',
    question: 'In relational database indexing, why can a composite index on columns (A, B, C) NOT be utilized effectively for a query that only filters on column B?',
    options: [
      'Composite indexes can only index numeric values.',
      'B-Tree indexes sort entries hierarchically by the leftmost prefix first; without column A, the tree traversal cannot eliminate index leaf nodes.',
      'Column B must always be declared as a primary key.',
      'The query optimizer automatically drops composite indexes if all columns are not present.'
    ],
    correctAnswerIndex: 1,
    explanation: 'A B-tree multi-column index works strictly based on the leftmost prefix rule. If the leading column (A) is absent in the WHERE condition, the engine must perform a full index scan or table scan.'
  },

  // Spring Boot Questions
  {
    id: 'q-sb-1',
    skill: 'Spring Boot',
    difficulty: 'Basic',
    question: 'Which annotation in Spring Boot combines @Controller and @ResponseBody into a single declaration?',
    options: ['@Service', '@Component', '@RestController', '@Repository'],
    correctAnswerIndex: 2,
    explanation: '@RestController is a convenience annotation that is itself annotated with @Controller and @ResponseBody, returning serialized domain objects (like JSON) directly to the HTTP response.'
  },
  {
    id: 'q-sb-2',
    skill: 'Spring Boot',
    difficulty: 'Intermediate',
    question: 'What is the purpose of Spring Boot Auto-Configuration (@EnableAutoConfiguration)?',
    options: [
      'It compiles Java source files into native machine binaries automatically.',
      'It automatically configures Spring beans based on the jar dependencies found on the application classpath.',
      'It automatically provisions an AWS RDS instance at boot time.',
      'It converts relational tables into React components.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Spring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies that you have added to the classpath.'
  },
  {
    id: 'q-sb-3',
    skill: 'Spring Boot',
    difficulty: 'Advanced',
    question: 'How does Spring Boot handle circular dependency injections between two singleton beans in Spring 2.6 and above?',
    options: [
      'It allows circular dependencies by default using lazy thread proxies.',
      'Circular references are disabled by default and will throw a BeanCurrentlyInCreationException unless spring.main.allow-circular-references is explicitly enabled.',
      'It automatically terminates the JVM without throwing an exception.',
      'It converts both beans into static helper methods.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Starting with Spring Boot 2.6, circular bean references are disabled by default. If your application has them, Spring will throw BeanCurrentlyInCreationException during application startup.'
  },

  // Docker Questions
  {
    id: 'q-docker-1',
    skill: 'Docker',
    difficulty: 'Basic',
    question: 'Which Docker command is used to build an image from a Dockerfile in the current directory with a tag myapp:v1?',
    options: [
      'docker make -t myapp:v1',
      'docker build -t myapp:v1 .',
      'docker image create myapp:v1',
      'docker run -d myapp:v1'
    ],
    correctAnswerIndex: 1,
    explanation: 'The command "docker build -t <tag_name> <path>" builds an image from the Dockerfile at the specified path (where "." denotes current directory).'
  },
  {
    id: 'q-docker-2',
    skill: 'Docker',
    difficulty: 'Intermediate',
    question: 'What is the primary benefit of utilizing Multi-Stage Builds in a Dockerfile for a React or Spring Boot application?',
    options: [
      'It allows the container to run on both Linux and Windows simultaneously.',
      'It keeps the final production runtime container image minimal by separating the heavy compilation/build tools from the lean execution environment.',
      'It encrypts container network traffic automatically.',
      'It eliminates the need to install Docker engine.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Multi-stage builds allow you to use multiple FROM statements in your Dockerfile, copying only the generated artifacts (like a JAR or compiled static dist) to the final slim base image (e.g. alpine or distroless).'
  },

  // AWS Questions
  {
    id: 'q-aws-1',
    skill: 'AWS',
    difficulty: 'Basic',
    question: 'Which AWS service provides resizable, on-demand virtual compute capacity in the cloud?',
    options: ['Amazon S3', 'Amazon EC2', 'Amazon DynamoDB', 'Amazon CloudFront'],
    correctAnswerIndex: 1,
    explanation: 'Amazon Elastic Compute Cloud (Amazon EC2) provides scalable virtual servers in the cloud.'
  },
  {
    id: 'q-aws-2',
    skill: 'AWS',
    difficulty: 'Intermediate',
    question: 'What is the recommended security practice for granting permissions to an EC2 instance to access an S3 bucket without embedding credentials in the code?',
    options: [
      'Hardcode AWS Access Key ID and Secret Key in the application properties.',
      'Attach an IAM Role with an appropriate S3 policy to the EC2 instance profile.',
      'Store credentials in an unencrypted public GitHub repository.',
      'Make the S3 bucket publicly readable and writable by anyone.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Attaching an IAM role to an EC2 instance uses AWS Instance Metadata Service (IMDS) to automatically supply temporary rotating credentials.'
  },

  // System Design Questions
  {
    id: 'q-sys-1',
    skill: 'System Design',
    difficulty: 'Intermediate',
    question: 'In distributed systems and the CAP theorem, what does the theorem assert?',
    options: [
      'A system can achieve Consistency, Availability, and Partition Tolerance all simultaneously at 100%.',
      'In the presence of a network partition (P), a distributed system must choose between Consistency (C) and Availability (A).',
      'Caching, Asynchrony, and Persistence must always run in the same process.',
      'Cloud applications never experience network splits.'
    ],
    correctAnswerIndex: 1,
    explanation: 'CAP theorem states that any distributed data store can only provide two of the three guarantees: Consistency, Availability, and Partition tolerance. Because network partitions (P) are unavoidable in physical networks, systems must trade off between C and A.'
  },

  // React Questions
  {
    id: 'q-react-1',
    skill: 'React.js',
    difficulty: 'Intermediate',
    question: 'Why should you avoid using array index as a "key" prop in dynamic React lists when items can be reordered or deleted?',
    options: [
      'Because JavaScript arrays cannot be indexed by numbers.',
      'Because using index keys causes React reconciliation to misidentify DOM nodes, leading to subtle state bugs and incorrect input retention across items.',
      'Because React throws a compile error if numbers are passed as keys.',
      'Because indices slow down browser network transfer.'
    ],
    correctAnswerIndex: 1,
    explanation: 'When list items change order or are inserted/deleted, index keys cause React to preserve the state of incorrect list elements during reconciliation.'
  }
];

export const INITIAL_PROGRESS_HISTORY: ProgressHistoryRecord[] = [
  {
    id: 'hist-1',
    date: '2026-09-01',
    jobReadinessScore: 52,
    skillGapPercentage: 58,
    skillsMatchedCount: 6,
    skillsTotalCount: 14,
    notes: 'Initial resume baseline parsed. Gaps identified in SQL advanced optimization, Spring Boot, Docker, AWS, System Design, and REST security.'
  },
  {
    id: 'hist-2',
    date: '2026-09-10',
    jobReadinessScore: 64,
    skillGapPercentage: 50,
    skillsMatchedCount: 7,
    skillsTotalCount: 14,
    notes: 'Completed Roadmap Week 1: SQL Advanced & Query Optimization. Passed SQL Assessment with 94% score.'
  },
  {
    id: 'hist-3',
    date: '2026-09-17',
    jobReadinessScore: 73,
    skillGapPercentage: 42.8,
    skillsMatchedCount: 8,
    skillsTotalCount: 14,
    notes: 'Completed Roadmap Week 2: Spring Boot Basics & REST Controllers. Verified enterprise Java endpoint integration.'
  }
];
