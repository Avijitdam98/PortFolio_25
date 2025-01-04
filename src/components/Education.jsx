import React, { useState, useEffect, useRef } from 'react';
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaUniversity,
  FaCode,
  FaStar,
  FaTrophy,
  FaBook,
  FaChevronDown,
} from 'react-icons/fa';
import '../styles/components/Education.scss';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleDetails = (index) => {
    setExpandedDetails(prev => {
      const newState = { ...prev };
      // Close all other cards
      Object.keys(newState).forEach(key => {
        if (key !== index.toString()) {
          newState[key] = false;
        }
      });
      // Toggle the clicked card
      newState[index] = !prev[index];
      return newState;
    });
  };

  const educationData = [
    {
      degree: 'Bachelor of Technology in Electrical Engineering (BTECH)',
      institution: 'BP Poddar Institute of Management and Technology, Kolkata',
      duration: '2019 - 2022',
      grade: '9.05 CGPA',
      location: 'Kolkata, India',
      achievements: ['Completed multiple industry-relevant projects and internships'],
      details: [
        'Specialized in Advanced Software Development',
        'Key courses: Advanced Algorithms, Cloud Computing, AI & ML',
        'Research focus on Modern Web Technologies',
      ],
      skills: [
        'Web Development',
        'Cloud Computing',
        'Advanced Algorithms',
        'Database Management',
        'Software Architecture',
      ],
    },
    {
      degree: 'Diploma in Electrcial Engineering (DTE)',
      institution: 'Kingston Educational Institute',
      duration: '2016 - 2019',
      grade: '7.0 CGPA',
      location: 'Kolkata, India',
      achievements: [
        'Academic Excellence Award',
        'Coding Competition Winner',
        'Technical Club Lead',
      ],
      details: [
        'Foundation in Electrical Engineering & Programming',
        'Core subjects: Electronics,Data Structures, Database Management, Web Development',
        'Participated in multiple coding competitions',
      ],
      skills: [
        'Data Structures',
        'Web Development',
        'Database Management',
        'Programming Fundamentals',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`education-section ${isVisible ? 'visible' : ''}`}
      id="education"
      aria-label="Education Section"
    >
      <div className="education-container">
        <div className="education-header">
          <div className="header-icon-container" aria-hidden="true">
            <FaGraduationCap className="header-icon" />
          </div>
          <h2>Education Journey</h2>
          <p>My academic qualifications and achievements</p>
        </div>

        <div className="education-timeline" role="list">
          {educationData.map((edu, index) => (
            <div
              className={`education-card ${expandedDetails[index] ? 'expanded' : ''}`}
              key={index}
              role="listitem"
              aria-label={`${edu.degree} at ${edu.institution}`}
            >
              <div className="card-header">
                <div className="degree-icon" aria-hidden="true">
                  <FaUniversity />
                </div>
                <div className="header-content">
                  <h3>{edu.degree}</h3>
                  <div className="institution-info">
                    <div className="institution">
                      <FaUniversity aria-hidden="true" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="location">
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  <div className="duration">
                    <FaCalendarAlt aria-hidden="true" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
                <div
                  className="grade"
                  aria-label={`Grade: ${edu.grade}`}
                  title={`Grade: ${edu.grade}`}
                >
                  <FaStar className="grade-icon" aria-hidden="true" />
                  <span>{edu.grade}</span>
                </div>
              </div>

              <div className="card-body">
                <div className="achievements" role="list" aria-label="Achievements">
                  <h4>
                    <FaTrophy aria-hidden="true" />
                    Achievements
                  </h4>
                  {edu.achievements.map((achievement, i) => (
                    <div key={i} role="listitem" className="achievement-item" title={achievement}>
                      <FaTrophy aria-hidden="true" className="achievement-icon" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="details" role="list" aria-label="Course Details">
                  <h4>
                    <FaBook aria-hidden="true" />
                    Course Details
                  </h4>
                  {edu.details.map((detail, i) => (
                    <div key={i} role="listitem" className="detail-item" title={detail}>
                      <FaBook aria-hidden="true" className="detail-icon" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="skills" role="list" aria-label="Key Skills">
                  <h4>
                    <FaCode aria-hidden="true" />
                    Key Skills
                  </h4>
                  {edu.skills.map((skill, i) => (
                    <div key={i} role="listitem" className="skill-item" title={skill}>
                      <FaCode aria-hidden="true" className="skill-icon" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="expand-button"
                onClick={() => toggleDetails(index)}
                aria-expanded={expandedDetails[index]}
                aria-label={expandedDetails[index] ? 'Show less details' : 'Show more details'}
              >
                <FaChevronDown className={expandedDetails[index] ? 'rotated' : ''} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
