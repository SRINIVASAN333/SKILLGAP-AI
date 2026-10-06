import { JobRecord } from '../types';

export const ALL_COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'IBM',
  'Oracle',
  'Cisco',
  'Adobe',
  'Intel',
  'NVIDIA',
  'Accenture',
  'Deloitte',
  'TCS',
  'Infosys',
  'Wipro',
  'HCLTech',
  'Tech Mahindra',
  'Cognizant',
  'Capgemini',
  'LTIMindtree',
  'Mphasis',
  'Persistent Systems',
  'Zoho',
  'Freshworks',
  'Hexaware',
  'Coforge',
  'EPAM',
  'DXC Technology',
  'CGI',
  'SAP',
  'Salesforce',
  'ServiceNow',
  'VMware',
  'Dell Technologies',
  'HP',
  'Qualcomm',
  'Samsung',
  'Siemens',
  'Wells Fargo',
  'JPMorgan Chase',
  'Goldman Sachs',
  'Morgan Stanley',
  'PayPal',
  'Uber',
  'Walmart Global Tech',
  'Flipkart',
  'PhonePe',
  'Razorpay',
  'Swiggy',
  'Zomato',
  'Cloudflare',
  'Zscaler',
  'Atlassian',
  'LinkedIn'
];

export const COMPANY_DOMAINS: Record<string, string> = {
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Amazon': 'amazon.com',
  'Meta': 'meta.com',
  'Apple': 'apple.com',
  'IBM': 'ibm.com',
  'Oracle': 'oracle.com',
  'Cisco': 'cisco.com',
  'Adobe': 'adobe.com',
  'Intel': 'intel.com',
  'NVIDIA': 'nvidia.com',
  'Accenture': 'accenture.com',
  'Deloitte': 'deloitte.com',
  'TCS': 'tcs.com',
  'Infosys': 'infosys.com',
  'Wipro': 'wipro.com',
  'HCLTech': 'hcltech.com',
  'Tech Mahindra': 'techmahindra.com',
  'Cognizant': 'cognizant.com',
  'Capgemini': 'capgemini.com',
  'LTIMindtree': 'ltimindtree.com',
  'Mphasis': 'mphasis.com',
  'Persistent Systems': 'persistent.com',
  'Zoho': 'zoho.com',
  'Freshworks': 'freshworks.com',
  'Hexaware': 'hexaware.com',
  'Coforge': 'coforge.com',
  'EPAM': 'epam.com',
  'DXC Technology': 'dxc.com',
  'CGI': 'cgi.com',
  'SAP': 'sap.com',
  'Salesforce': 'salesforce.com',
  'ServiceNow': 'servicenow.com',
  'VMware': 'vmware.com',
  'Dell Technologies': 'dell.com',
  'HP': 'hp.com',
  'Qualcomm': 'qualcomm.com',
  'Samsung': 'samsung.com',
  'Siemens': 'siemens.com',
  'Wells Fargo': 'wellsfargo.com',
  'JPMorgan Chase': 'jpmorganchase.com',
  'Goldman Sachs': 'goldmansachs.com',
  'Morgan Stanley': 'morganstanley.com',
  'PayPal': 'paypal.com',
  'Uber': 'uber.com',
  'Walmart Global Tech': 'walmart.com',
  'Flipkart': 'flipkart.com',
  'PhonePe': 'phonepe.com',
  'Razorpay': 'razorpay.com',
  'Swiggy': 'swiggy.com',
  'Zomato': 'zomato.com',
  'Cloudflare': 'cloudflare.com',
  'Zscaler': 'zscaler.com',
  'Atlassian': 'atlassian.com',
  'LinkedIn': 'linkedin.com'
};

export const LOCATIONS_LIST = [
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Mumbai',
  'NCR (Delhi/Gurugram/Noida)',
  'Remote',
  'Kolkata',
  'Ahmedabad',
  'Kochi'
];

export const JOB_ROLES_POOL = [
  { role: 'Software Engineer', skills: ['Java', 'Python', 'SQL', 'Git', 'Data Structures & Algorithms'], expMin: 0, expMax: 2, salary: '₹12–18 LPA' },
  { role: 'Software Engineer I', skills: ['Java', 'Spring Boot', 'SQL', 'REST API', 'Git'], expMin: 0, expMax: 1, salary: '₹10–15 LPA' },
  { role: 'Graduate Engineer Trainee', skills: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript'], expMin: 0, expMax: 0, salary: '₹6–9 LPA' },
  { role: 'Associate Software Engineer', skills: ['Python', 'SQL', 'Git', 'REST API'], expMin: 0, expMax: 2, salary: '₹7.5–11 LPA' },
  { role: 'Junior Software Engineer', skills: ['JavaScript', 'React.js', 'HTML', 'CSS', 'Git'], expMin: 0, expMax: 1, salary: '₹6.5–10 LPA' },
  { role: 'Full Stack Developer', skills: ['React.js', 'Node.js', 'JavaScript', 'SQL', 'REST API', 'Docker'], expMin: 0, expMax: 2, salary: '₹11–17 LPA' },
  { role: 'Backend Developer', skills: ['Java', 'Spring Boot', 'SQL', 'MongoDB', 'REST API'], expMin: 0, expMax: 2, salary: '₹12–19 LPA' },
  { role: 'Frontend Developer', skills: ['JavaScript', 'React.js', 'HTML5', 'CSS3', 'TypeScript'], expMin: 0, expMax: 2, salary: '₹9–14 LPA' },
  { role: 'Java Developer', skills: ['Java', 'Spring Boot', 'SQL', 'Hibernate', 'REST API'], expMin: 0, expMax: 2, salary: '₹10–16 LPA' },
  { role: 'Python Developer', skills: ['Python', 'Django', 'SQL', 'REST API', 'Git'], expMin: 0, expMax: 2, salary: '₹9.5–15 LPA' },
  { role: 'Java Full Stack Developer', skills: ['Java', 'Spring Boot', 'React.js', 'SQL', 'Docker'], expMin: 0, expMax: 2, salary: '₹13–20 LPA' },
  { role: 'Web Developer', skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Git'], expMin: 0, expMax: 1, salary: '₹6–10 LPA' },
  { role: 'Application Developer', skills: ['Java', 'SQL', 'Python', 'REST API'], expMin: 0, expMax: 2, salary: '₹8–13 LPA' },
  { role: 'Cloud Engineer', skills: ['AWS', 'Docker', 'Python', 'Linux', 'Git'], expMin: 0, expMax: 2, salary: '₹11–17 LPA' },
  { role: 'DevOps Engineer', skills: ['Docker', 'AWS', 'Git', 'Linux', 'Python'], expMin: 0, expMax: 2, salary: '₹10–16 LPA' },
  { role: 'Data Analyst', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Tableau'], expMin: 0, expMax: 2, salary: '₹8.5–14 LPA' },
  { role: 'Data Engineer', skills: ['Python', 'SQL', 'Pandas', 'Spark', 'AWS'], expMin: 0, expMax: 2, salary: '₹12–18 LPA' },
  { role: 'Database Developer', skills: ['SQL', 'PostgreSQL', 'MySQL', 'Python', 'Git'], expMin: 0, expMax: 2, salary: '₹8–13 LPA' },
  { role: 'QA Engineer', skills: ['Python', 'Java', 'SQL', 'Selenium', 'Git'], expMin: 0, expMax: 2, salary: '₹6.5–11 LPA' },
  { role: 'Automation Test Engineer', skills: ['Python', 'Selenium', 'Java', 'SQL', 'Git'], expMin: 0, expMax: 2, salary: '₹7.5–12 LPA' },
  { role: 'Support Engineer', skills: ['SQL', 'Linux', 'Python', 'Networking'], expMin: 0, expMax: 1, salary: '₹5–8.5 LPA' },
  { role: 'Technical Support Engineer', skills: ['SQL', 'JavaScript', 'REST API', 'Problem Solving'], expMin: 0, expMax: 1, salary: '₹5.5–9 LPA' },
  { role: 'Systems Engineer', skills: ['Java', 'SQL', 'Linux', 'C++'], expMin: 0, expMax: 2, salary: '₹7–11 LPA' },
  { role: 'Mobile Application Developer', skills: ['JavaScript', 'React Native', 'Java', 'REST API'], expMin: 0, expMax: 2, salary: '₹9–15 LPA' },
  { role: 'AI/ML Engineer', skills: ['Python', 'Pandas', 'NumPy', 'TensorFlow', 'SQL'], expMin: 0, expMax: 2, salary: '₹14–22 LPA' },
  { role: 'SDE I', skills: ['Data Structures & Algorithms', 'Java', 'Python', 'SQL', 'System Design'], expMin: 0, expMax: 1, salary: '₹15–25 LPA' },
  { role: 'Product Engineer', skills: ['JavaScript', 'React.js', 'Node.js', 'SQL', 'AWS'], expMin: 0, expMax: 2, salary: '₹12–18 LPA' }
];

export const GENERATED_JOB_DATABASE: JobRecord[] = (() => {
  const jobs: JobRecord[] = [];
  let idCounter = 1;

  ALL_COMPANIES.forEach((company, cIndex) => {
    const domain = COMPANY_DOMAINS[company] || `${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
    const companyLogo = `https://logo.clearbit.com/${domain}`;

    const roleIndices = [
      cIndex % JOB_ROLES_POOL.length,
      (cIndex + 3) % JOB_ROLES_POOL.length,
      (cIndex + 7) % JOB_ROLES_POOL.length,
      (cIndex + 11) % JOB_ROLES_POOL.length,
      (cIndex + 15) % JOB_ROLES_POOL.length,
      (cIndex + 19) % JOB_ROLES_POOL.length
    ];

    roleIndices.forEach((rIdx, subIdx) => {
      const template = JOB_ROLES_POOL[rIdx];
      const location = LOCATIONS_LIST[(cIndex + subIdx) % LOCATIONS_LIST.length];
      const isIntern = subIdx === 5;
      const jobType = isIntern ? 'Internship' : (subIdx === 4 ? 'Contract' : 'Full-time');
      const workMode = subIdx % 3 === 0 ? 'Remote' : (subIdx % 3 === 1 ? 'Hybrid' : 'On-site');
      
      const reqSkills = [...template.skills];
      const prefPool = ['Docker', 'AWS', 'Redis', 'TypeScript', 'MongoDB', 'GraphQL', 'Kubernetes', 'CI/CD'];
      const prefSkills = [prefPool[(cIndex + subIdx) % prefPool.length], prefPool[(cIndex + subIdx + 2) % prefPool.length]];

      jobs.push({
        id: `job-${idCounter++}`,
        companyName: company,
        companyLogo: companyLogo,
        role: isIntern ? `${template.role} (Intern)` : template.role,
        location: location,
        requiredSkills: reqSkills,
        preferredSkills: prefSkills,
        experienceMin: isIntern ? 0 : template.expMin,
        experienceMax: isIntern ? 0 : template.expMax,
        education: 'B.S. / B.Tech / M.C.A in Computer Science, IT, or equivalent engineering discipline',
        eligibility: 'Minimum 65% aggregate in graduation with strong foundational knowledge in data structures and object-oriented programming.',
        salary: isIntern ? '—' : template.salary,
        stipend: isIntern ? '₹35,000 - ₹60,000 / month' : '—',
        jobType: jobType,
        workMode: workMode,
        description: `Join ${company} as a ${template.role}. You will design, build, and scale robust distributed services and responsive client applications. Collaborate with cross-functional product and engineering teams in a fast-paced environment.`,
        source: `${company} Careers Portal`,
        sourceUrl: `https://${domain}/careers`,
        postedDate: `2026-09-${String((idCounter % 20) + 1).padStart(2, '0')}`,
        deadline: `2026-10-${String((idCounter % 25) + 1).padStart(2, '0')}`,
        status: idCounter % 15 === 0 ? 'Closing Soon' : 'Active'
      });
    });
  });

  return jobs;
})();
