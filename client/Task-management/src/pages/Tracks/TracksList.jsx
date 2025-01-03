import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import axiosInstance from '../../utils/axios';
import Button from '../../components/button';
import './tracks_l.css'; // Styling for tracks pages

const TracksList = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        const response = await axiosInstance.get('/tracks', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setTracks(response.data);
      } catch (err) {
        console.error('Fetch tracks error:', err); // Log the error to the console
        if (err.msg) {
          setError(err.msg);
        } else if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className="tracks-page">
      <Navbar role = 'admin' />
      <div className="tracks-container">
        <div className="tracks-header">
          <h1 className="tracks-title">Tracks</h1>
          <div className="tracks-description-container">
            <p className="tracks-description">
              This internship program offers diverse tracks designed to provide hands-on experience and practical knowledge in various fields of technology. Each track is carefully curated to equip interns with industry-relevant skills and tools, ensuring they gain expertise in their chosen domain.
            </p>
            <div className="button-container">
              <Button onClick={() => setShowTracks(!showTracks)} text={showTracks ? 'Hide Tracks' : 'View All Tracks'} />
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        {showTracks && (
          <div className="tracks-list">
            {tracks.map((track) => (
              <div key={track._id} className="track-item">
                <h2>{track.name}</h2>
                <p>{track.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TracksList;