import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faBriefcase,
  faCode,
  faEnvelope,
  faBars,
  faTimes,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/components/Navbar.scss';

const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const navItems = [
    { id: 'home', icon: faHome, label: 'Home' },
    { id: 'about', icon: faUser, label: 'About' },
    { id: 'experience', icon: faBriefcase, label: 'Experience' },
    { id: 'projects', icon: faCode, label: 'Projects' },
    { id: 'contact', icon: faEnvelope, label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const sections = document.querySelectorAll('section[id]');

      // Handle navbar visibility
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Handle active section
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="navbar desktop-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="nav-content">
          <motion.div className="logo" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            AD
          </motion.div>
          <ul className="nav-links">
            {navItems.map(item => (
              <motion.li key={item.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
              </button>
            </motion.li>
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="navbar mobile-nav"
        initial={{ y: 100 }}
        animate={{
          y: visible ? 0 : 100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mobile-bottom-nav">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span className="label">{item.label}</span>
            </motion.button>
          ))}
          <motion.button
            className="nav-item"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
            <span className="label">Theme</span>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
