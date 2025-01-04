import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons';
import '../styles/components/Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollDirection, setScrollDirection] = useState('none');
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Smooth spring animation for scroll-based effects
  const springConfig = { stiffness: 100, damping: 30, mass: 0.2 };
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const direction = currentScroll > lastScroll ? 'down' : 'up';
      if (Math.abs(currentScroll - lastScroll) >= 10) {
        setScrollDirection(direction);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update smooth scroll value
  useEffect(() => {
    return scrollY.onChange(latest => {
      smoothY.set(latest);
    });
  }, [scrollY, smoothY]);

  const footerOpacity = useTransform(smoothY, [0, 200], [0.3, 1]);

  const footerScale = useTransform(smoothY, [0, 200], [0.95, 1]);

  const socialLinksY = useTransform(smoothY, [0, 200], [20, 0]);

  return (
    <motion.footer
      className="footer"
      style={{
        opacity: footerOpacity,
        scale: footerScale,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <motion.h3
              animate={{ y: scrollDirection === 'down' ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              Let's Connect
            </motion.h3>
            <motion.div className="social-links" style={{ y: socialLinksY }}>
              {[
                { icon: faGithub, href: 'https://github.com/yourusername' },
                { icon: faLinkedin, href: 'https://linkedin.com/in/yourusername' },
                { icon: faTwitter, href: 'https://twitter.com/yourusername' },
                { icon: faDribbble, href: 'https://dribbble.com/yourusername' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 300,
                  }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="footer-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3
              animate={{ y: scrollDirection === 'down' ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              Quick Links
            </motion.h3>
            <nav className="footer-nav">
              {['About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, color: 'var(--primary-color)' }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="footer-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h3
              animate={{ y: scrollDirection === 'down' ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              Contact Info
            </motion.h3>
            <motion.div
              className="contact-info"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.p whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                Email: avijit.dam9@gmail.com
              </motion.p>
              <motion.p whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                Location: Kolkata, India
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.p
            animate={{
              y: scrollDirection === 'down' ? -3 : 0,
              scale: scrollDirection === 'down' ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            &copy; {currentYear} Avijit Dam. All rights reserved.
          </motion.p>
          <motion.p
            animate={{
              y: scrollDirection === 'down' ? -3 : 0,
              scale: scrollDirection === 'down' ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            Built with React & Astro
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{
          opacity: scrollDirection === 'none' ? 0 : 1,
          y: scrollDirection === 'down' ? 10 : -10,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.footer>
  );
};

export default Footer;
