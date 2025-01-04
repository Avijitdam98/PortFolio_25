import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTailwindcss } from 'react-icons/si';
import '../styles/components/Skills.scss';

const Skills = () => {
  const skillsData = [
    {
      icon: <FaReact className="rotating-icon" />,
      title: 'Frontend Development',
      description:
        'Building responsive and interactive user interfaces with modern frameworks and libraries.',
      progress: 90,
      tags: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Vue', level: 80 },
        { name: 'JavaScript', level: 92 },
        { name: 'HTML/CSS', level: 95 },
      ],
      color: '#61DAFB',
    },
    {
      icon: <FaNodeJs className="pulse-icon" />,
      title: 'Backend Development',
      description:
        'Creating robust server-side applications and RESTful APIs with Node.js and Express.',
      progress: 85,
      tags: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'REST API', level: 90 },
      ],
      color: '#68A063',
    },
    {
      icon: <FaFigma className="bounce-icon" />,
      title: 'UI/UX Design',
      description:
        'Designing intuitive user experiences and beautiful interfaces with modern design tools.',
      progress: 88,
      tags: [
        { name: 'Figma', level: 88 },
        { name: 'User Research', level: 85 },
        { name: 'Wireframing', level: 90 },
        { name: 'Prototyping', level: 87 },
      ],
      color: '#F24E1E',
    },
    {
      icon: <SiTypescript className="shake-icon" />,
      title: 'TypeScript & Testing',
      description: 'Writing type-safe code and comprehensive tests for reliable applications.',
      progress: 85,
      tags: [
        { name: 'TypeScript', level: 85 },
        { name: 'Jest', level: 82 },
        { name: 'React Testing', level: 80 },
        { name: 'E2E Testing', level: 78 },
      ],
      color: '#3178C6',
    },
    {
      icon: <SiMongodb className="float-icon" />,
      title: 'Database Design',
      description: 'Designing and implementing efficient database schemas and queries.',
      progress: 82,
      tags: [
        { name: 'MongoDB', level: 82 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Database Design', level: 85 },
      ],
      color: '#00ED64',
    },
    {
      icon: <SiTailwindcss className="spin-icon" />,
      title: 'Modern CSS',
      description:
        'Creating beautiful, responsive layouts with modern CSS frameworks and techniques.',
      progress: 90,
      tags: [
        { name: 'Tailwind CSS', level: 90 },
        { name: 'SCSS', level: 92 },
        { name: 'CSS-in-JS', level: 85 },
        { name: 'Animations', level: 88 },
      ],
      color: '#38BDF8',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Technical Skills</h2>
          <p>Expertise in modern web technologies and development practices</p>
          <div className="header-decoration">
            <span className="dot"></span>
            <span className="line"></span>
            <span className="dot"></span>
          </div>
        </motion.div>

        <motion.div
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="skill-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 8px 30px -15px ${skill.color}40`,
              }}
              style={{
                borderColor: `${skill.color}30`,
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), ${skill.color}08)`,
              }}
            >
              <div className="skill-header" style={{ color: skill.color }}>
                <span className="skill-icon">{skill.icon}</span>
                <h3>{skill.title}</h3>
              </div>
              <div className="skill-content">
                <p>{skill.description}</p>
                <div className="skill-progress-container">
                  <div className="skill-level" style={{ color: skill.color }}>
                    {skill.progress}%
                  </div>
                  <div className="skill-progress-bar">
                    <motion.div
                      className="progress"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: skill.progress / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ background: skill.color }}
                    />
                  </div>
                </div>
                <div className="skill-tags">
                  {skill.tags.map((tag, idx) => (
                    <div key={idx} className="tag-container">
                      <span className="tag" style={{ borderColor: skill.color }}>
                        {tag.name}
                      </span>
                      <div
                        className="tag-tooltip"
                        style={{
                          background: skill.color,
                          color: '#fff',
                        }}
                      >
                        Expertise: {tag.level}%
                        <div className="tooltip-arrow" style={{ borderTopColor: skill.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-decoration">
                <div className="corner-dot" style={{ background: skill.color }}></div>
                <div
                  className="corner-line"
                  style={{ background: `linear-gradient(to right, ${skill.color}, transparent)` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
