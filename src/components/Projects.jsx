import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar, FaCodeBranch, FaLightbulb, FaTools, FaChevronRight } from 'react-icons/fa';
import '../styles/components/Projects.scss';

const projectsData = [
  {
    title: 'Project Name 1',
    description: 'A modern web application built with React and Node.js',
    image: '/images/project1.jpg',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubLink: 'https://github.com/username/project1',
    liveLink: 'https://project1.com',
    highlights: [
      'Implemented real-time updates using WebSocket',
      'Reduced loading time by 60%',
      'Integrated CI/CD pipeline'
    ],
    metrics: {
      stars: 48,
      forks: 12,
      language: 'TypeScript',
      lastUpdated: '2 days ago'
    },
    features: [
      'Real-time collaboration',
      'Responsive design',
      'OAuth integration',
      'REST API'
    ]
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management and payment processing.',
    image: '/images/projects/ecommerce.svg',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/yourusername/ecommerce',
    liveLink: 'https://ecommerce-demo.com',
    highlights: [
      'Implemented real-time inventory management',
      'Integrated payment processing using Stripe',
      'Improved user experience with responsive design'
    ],
    metrics: {
      stars: 100,
      forks: 20,
      language: 'JavaScript',
      lastUpdated: '1 week ago'
    },
    features: [
      'Real-time inventory management',
      'Payment processing integration',
      'Responsive design',
      'REST API'
    ]
  },
  {
    title: 'AI Image Generator',
    description: 'Web application that generates images using AI models with custom user inputs.',
    image: '/images/projects/ai-generator.svg',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask'],
    githubLink: 'https://github.com/yourusername/ai-image',
    liveLink: 'https://ai-image-gen.com',
    highlights: [
      'Implemented AI model using TensorFlow',
      'Integrated user input interface using React',
      'Improved image generation speed by 50%'
    ],
    metrics: {
      stars: 50,
      forks: 10,
      language: 'Python',
      lastUpdated: '2 weeks ago'
    },
    features: [
      'AI model integration',
      'User input interface',
      'Image generation',
      'REST API'
    ]
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates and team features.',
    image: '/images/projects/task-manager.svg',
    category: 'Web App',
    technologies: ['React', 'Firebase', 'Material-UI'],
    githubLink: 'https://github.com/yourusername/task-app',
    liveLink: 'https://task-app-demo.com',
    highlights: [
      'Implemented real-time updates using Firebase',
      'Integrated team features using Material-UI',
      'Improved user experience with responsive design'
    ],
    metrics: {
      stars: 200,
      forks: 30,
      language: 'JavaScript',
      lastUpdated: '1 month ago'
    },
    features: [
      'Real-time updates',
      'Team features',
      'Responsive design',
      'REST API'
    ]
  }
];

const categories = ['All', 'Full Stack', 'Web App', 'AI/ML'];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const controls = useAnimation();

  const filteredProjects = projectsData.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  useEffect(() => {
    controls.start('visible');
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsDetailView(true);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some of my notable works</p>
        </motion.div>

        <motion.div
          className="category-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                variants={projectVariants}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
                layout
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <motion.div 
                    className="project-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate={hoveredProject === project.title ? "visible" : "hidden"}
                  >
                    <div className="overlay-content">
                      <motion.div 
                        className="tech-stack"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">
                            <FaTools className="tech-icon" />
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                      <motion.div 
                        className="project-links"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                          <FaGithub /> Source Code
                        </a>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link demo">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="project-info">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="category-badge">{project.category}</span>
                  </div>
                  <p>{project.description}</p>
                  
                  <div className="project-features">
                    <h4>Key Features</h4>
                    <div className="features-grid">
                      {project.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="feature-item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <FaChevronRight className="feature-icon" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="project-highlights">
                    {project.highlights.map((highlight, idx) => (
                      <motion.div 
                        key={idx}
                        className="highlight-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <FaLightbulb className="highlight-icon" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="project-metrics">
                    <div className="metric">
                      <FaCodeBranch />
                      <span>{project.metrics.forks} forks</span>
                    </div>
                    <div className="metric">
                      <FaStar />
                      <span>{project.metrics.stars} stars</span>
                    </div>
                    <div className="metric">
                      <FaCode />
                      <span>{project.metrics.language}</span>
                    </div>
                    <div className="metric update">
                      <span>Updated {project.metrics.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isDetailView && selectedProject && (
          <motion.div 
            className="project-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Add detailed project view content here */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
