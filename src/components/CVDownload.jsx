import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import './CVDownload.scss';

const CVDownload = () => {
  const [cvInfo, setCvInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAgeConfirm, setShowAgeConfirm] = useState(false);

  useEffect(() => {
    fetchCVInfo();
  }, []);

  const fetchCVInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cv');
      setCvInfo(response.data);
    } catch (error) {
      console.error('Error fetching CV info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!showAgeConfirm) {
      setShowAgeConfirm(true);
      return;
    }
    
    if (cvInfo?.exists) {
      window.open(`http://localhost:5000${cvInfo.url}`, '_blank');
      setShowAgeConfirm(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="cv-download loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FaSpinner className="spinner" />
      </motion.div>
    );
  }

  if (!cvInfo?.exists) {
    return null;
  }

  return (
    <motion.div
      className="cv-download"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showAgeConfirm ? (
        <div className="age-confirmation">
          <p>Please confirm you are 18 or older</p>
          <button onClick={handleDownload} className="confirm-btn">
            Yes, I am 18+
          </button>
          <button onClick={() => setShowAgeConfirm(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      ) : (
        <motion.button
          className="download-button"
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload className="download-icon" />
          <span>Download CV</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default CVDownload;
