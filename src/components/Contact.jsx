import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaDiscord,
} from 'react-icons/fa';
import { BiSend, BiRightArrowAlt } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';
import '../styles/components/Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'avijit.dam9@gmail.com',
      link: 'mailto:avijit.dam9@gmail.com',
      gradient: 'blue',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+919593189913',
      link: 'tel:+1234567890',
      gradient: 'purple',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'City, India',
      link: 'https://maps.google.com',
      gradient: 'green',
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
      color: '#0077b5',
    },
    {
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
      label: 'GitHub',
      color: '#333',
    },
    {
      icon: <FaTwitter />,
      url: 'https://twitter.com/yourusername',
      label: 'Twitter',
      color: '#1da1f2',
    },
    {
      icon: <FaDiscord />,
      url: 'https://discord.gg/yourusername',
      label: 'Discord',
      color: '#7289da',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <section id="contact" className="contact-section">
      <div className="background-shapes">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="shape"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">
          Get in Touch
          <motion.span
            className="sparkle-icon"
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
          >
            <HiSparkles />
          </motion.span>
        </h2>
        <p className="section-subtitle">Let's create something amazing together</p>
      </motion.div>

      <div className="contact-container">
        <motion.div
          className="contact-info"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              className={`info-card ${info.gradient}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              target={info.title === 'Location' ? '_blank' : undefined}
              rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
            >
              <div className="card-content">
                <div className="icon-wrapper">{info.icon}</div>
                <div className="info-content">
                  <h3>{info.title}</h3>
                  <p>{info.value}</p>
                </div>
              </div>
              <BiRightArrowAlt className="arrow-icon" />
            </motion.a>
          ))}

          <motion.div className="social-links" variants={itemVariants}>
            <h3>Connect With Me</h3>
            <div className="social-icons">
              {socialLinks.map(social => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--hover-color': social.color }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    backgroundColor: social.color,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                  <span className="tooltip">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact-form-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="contact-form">
            {[
              { name: 'name', type: 'text', placeholder: 'Your Name' },
              { name: 'email', type: 'email', placeholder: 'Your Email' },
              { name: 'subject', type: 'text', placeholder: 'Subject' },
            ].map(field => (
              <motion.div
                key={field.name}
                className={`form-group ${activeField === field.name ? 'active' : ''}`}
                variants={itemVariants}
              >
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  onFocus={() => setActiveField(field.name)}
                  onBlur={() => setActiveField(null)}
                  required
                />
                <div className="form-group-border" />
              </motion.div>
            ))}

            <motion.div
              className={`form-group ${activeField === 'message' ? 'active' : ''}`}
              variants={itemVariants}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                required
                rows={5}
              />
              <div className="form-group-border" />
            </motion.div>

            <motion.button
              type="submit"
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  Send Message <BiSend />
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                className={`submit-status ${submitStatus}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {submitStatus === 'success'
                  ? 'Message sent successfully! ✨'
                  : 'Failed to send message. Please try again. 🙁'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
