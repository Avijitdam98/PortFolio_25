import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './CVUpload.scss';

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' or 'error'
  const [currentCV, setCurrentCV] = useState(null);

  useEffect(() => {
    fetchCurrentCV();
  }, []);

  const fetchCurrentCV = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cv');
      if (response.data.exists) {
        setCurrentCV(response.data);
      }
    } catch (error) {
      console.error('Error fetching CV info:', error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage('');
      setStatus('');
    } else {
      setFile(null);
      setMessage('Please select a PDF file');
      setStatus('error');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      setStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    setUploading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/cv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('CV uploaded successfully');
      setStatus('success');
      fetchCurrentCV();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading CV');
      setStatus('error');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="cv-upload-container">
      <h2>CV Management</h2>
      
      {currentCV && (
        <div className="current-cv">
          <h3>Current CV</h3>
          <p>Last updated: {new Date(currentCV.lastUpdated).toLocaleString()}</p>
          <a 
            href={`http://localhost:5000${currentCV.url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-button"
          >
            View Current CV
          </a>
        </div>
      )}

      <div className="upload-section">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          id="cv-upload"
          className="file-input"
        />
        <label htmlFor="cv-upload" className="file-label">
          <FaUpload />
          <span>{file ? file.name : 'Choose PDF file'}</span>
        </label>

        <motion.button
          className={`upload-button ${uploading ? 'uploading' : ''} ${status}`}
          onClick={handleUpload}
          disabled={uploading || !file}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {uploading ? (
            <>
              <FaSpinner className="spinner" />
              Uploading...
            </>
          ) : (
            <>
              <FaUpload />
              Upload CV
            </>
          )}
        </motion.button>

        {message && (
          <motion.div
            className={`message ${status}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status === 'success' ? <FaCheck /> : <FaTimes />}
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CVUpload;
