import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaChevronDown, FaLightbulb } from 'react-icons/fa';
import '../styles/components/Experience.scss';

const experienceData = [
  {
    role: 'Project Engineer',
    company: 'Wipro Pvt Ltd',
    duration: 'April 2022 - Jan 2023',
    description: 'Leading development of enterprise-scale web applications.',
    highlight: 'Improved system performance by 40%',
    responsibilities: [
      'Collaborated on enterprise-level software development projects',
      'Implemented robust technical solutions and optimized system performance',
      'Improved application performance by 40% through optimization',
      'Worked closely with cross-functional teams to deliver high-quality software products',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Astro', 'Docker', 'Next.js'],
  },
  {
    role: 'Opcenter Teamcenter Developer Intern',
    company: 'Bavistech Pvt Ltd',
    duration: 'Sep 2023 - Apr 2024',
    description: 'React.js Developer.',
    highlight: 'Built reusable component library',
    responsibilities: [
      'Built reusable component library used across multiple projects',
      'Developed responsive web applications using React.js',
      'Implemented Opcenter and Teamcenter solutions',
      'Gained hands-on experience in modern web development technologies',
    ],
    technologies: ['React', 'TypeScript', 'SCSS', 'Redux', 'Teamcenter', 'Opcenter', 'PLM', 'OEM'],
  },
];

const techWebsites = {
  React: 'https://reactjs.org',
  'Node.js': 'https://nodejs.org',
  Python: 'https://python.org',
  AWS: 'https://aws.amazon.com',
  Docker: 'https://docker.com',
  TypeScript: 'https://typescriptlang.org',
  SCSS: 'https://sass-lang.com',
  Redux: 'https://redux.js.org',
  Opcenter: 'https://plm.sw.siemens.com/en-US/opcenter/',
  Teamcenter: 'https://plm.sw.siemens.com/en-US/teamcenter/',
  PLM: 'https://plm.sw.siemens.com/en-US/',
  OEM: 'https://www.siemens.com/global/en/products/buildings/hvac/oem.html',
};

const Experience = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const handleTechClick = tech => {
    window.open(techWebsites[tech], '_blank', 'noopener,noreferrer');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey and achievements</p>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className={`experience-card ${activeCard === index ? 'active' : ''}`}
              variants={cardVariants}
            >
              <div
                className="card-header"
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                <div className="role-container">
                  <div className="icon-wrapper">
                    <FaBriefcase className="icon" />
                  </div>
                  <h3>{exp.role}</h3>
                </div>
                <div className="company-info">
                  <div className="company">
                    <FaBuilding className="icon" />
                    <span>{exp.company}</span>
                  </div>
                  <div className="duration">
                    <FaCalendarAlt className="icon" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <motion.div
                  className="expand-icon"
                  animate={{ rotate: activeCard === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {activeCard === index && (
                  <motion.div
                    className="card-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="highlight-box" variants={highlightVariants}>
                      <FaLightbulb className="highlight-icon" />
                      <span>{exp.highlight}</span>
                    </motion.div>

                    <p className="description">{exp.description}</p>

                    <ul className="responsibilities">
                      {exp.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {resp}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="technologies-section">
                      <h4>Technologies Used</h4>
                      <div className="technologies">
                        {exp.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            className="tech-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onHoverStart={() => setHoveredTech(tech)}
                            onHoverEnd={() => setHoveredTech(null)}
                            onClick={() => handleTechClick(tech)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                            {hoveredTech === tech && (
                              <motion.div
                                className="tech-tooltip"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                              >
                                Click to visit {tech} website
                              </motion.div>
                            )}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
