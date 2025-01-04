import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components/About.scss';

const About = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const devTexts = [
    "Full Stack Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Node.js Expert",
    "MongoDB Wizard",
    "API Architect",
    "Performance Optimizer",
    "Responsive Design Pro",
    "Clean Code Advocate",
    "TypeScript Ninja"
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % devTexts.length);
        setIsVisible(true);
      }, 500); // Wait for exit animation
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(textTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    enter: { opacity: 0, y: 20 },
    center: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <motion.div 
            className="profile-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="decorative-elements">
              <div className="orbit orbit-1"></div>
              <div className="orbit orbit-2"></div>
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
            </div>
            <div className="profile-image">
              <img src="https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4" alt="Profile" />
            </div>
          </motion.div>

          <motion.div 
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants}>
              Hi, I'm Avijit Dam
            </motion.h1>
            
            <div className="dynamic-text-container">
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.div
                    key={currentTextIndex}
                    className="dynamic-text"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={textVariants}
                  >
                    <span className="highlight">{devTexts[currentTextIndex]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.p 
              className="tagline"
              variants={itemVariants}
            >
              Transforming ideas into elegant digital solutions
            </motion.p>

            <motion.p variants={itemVariants}>
              Passionate about creating beautiful, functional, and user-friendly applications.
              With expertise in modern web technologies and a keen eye for design,
              I bring ideas to life through clean, efficient code and intuitive user experiences.
            </motion.p>

            <motion.div 
              className="cta-buttons"
              variants={itemVariants}
            >
              <a href="#contact" className="btn primary">Get in Touch</a>
              <a href="#projects" className="btn secondary">View Projects</a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
