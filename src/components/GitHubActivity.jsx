import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/GitHubActivity.scss';

const GitHubActivity = () => {
  const [githubData, setGithubData] = useState({
    contributions: null,
    repos: [],
    loading: true,
    error: null,
  });

  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const { scrollY } = useScroll();
  const y = useSpring(scrollY, { stiffness: 100, damping: 30 });

  const opacity = useTransform(y, [0, 200, 300, 500], [0.3, 0.5, 0.8, 1]);

  const scale = useTransform(y, [0, 200, 300, 500], [0.8, 0.9, 0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.48, 0.15, 0.25, 0.96],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: index => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.48, 0.15, 0.25, 0.96],
      },
    }),
  };

  useEffect(() => {
    const username = 'Avijitdam98'; // Your GitHub username

    // Fetch GitHub data
    const fetchGitHubData = async () => {
      try {
        setGithubData(prev => ({ ...prev, loading: true, error: null }));

        // Fetch user's repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=4`
        );

        if (!reposResponse.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }

        const reposData = await reposResponse.json();

        setGithubData(prev => ({
          ...prev,
          repos: reposData.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            url: repo.html_url,
          })),
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load GitHub data. Please try again later.',
        }));
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`github-activity ${scrollDirection}`}
      style={{ opacity, scale }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div className="section-title" variants={itemVariants}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          GitHub Activity
        </motion.h2>
      </motion.div>

      <div className="github-content">
        <motion.div
          className="contributions-graph"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={`https://ghchart.rshah.org/2563eb/Avijitdam98`}
            alt="GitHub Contributions Graph"
            className="contributions-img"
          />
        </motion.div>

        <motion.div
          className="featured-repos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Featured Repositories</h3>
          {githubData.loading ? (
            <div className="loading-state">Loading repositories...</div>
          ) : githubData.error ? (
            <div className="error-state">{githubData.error}</div>
          ) : githubData.repos.length === 0 ? (
            <div className="empty-state">No repositories found</div>
          ) : (
            <div className="repos-grid">
              {githubData.repos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card"
                  custom={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                  <div className="repo-stats">
                    {repo.language && (
                      <span className="language">
                        <span
                          className="language-dot"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="stars">
                      <FontAwesomeIcon icon={faStar} /> {repo.stars}
                    </span>
                    <span className="forks">
                      <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Helper function to get language colors
const getLanguageColor = language => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    // Add more languages as needed
  };
  return colors[language] || '#858585';
};

export default GitHubActivity;
