import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ActivatePage = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getConfirmation = async () => {
      try {
        const response = await axios.get(`/auth/activate-account/${token}`, { cancelToken: source.token });
        setConfirmed(true);
      } catch (error) {
        console.log(error);
        navigate('/link-expired');
      } finally {
        setLoading(false);
      }
    };

    if (loading && !confirmed) {
      getConfirmation();
    }

    return () => {
      source.cancel();
    };
  }, [loading, confirmed, navigate, token]);

  if (!confirmed && loading) {
    return (
      <div className="loading-container">
        <span>Verifying Your Account</span>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="confirmation-container">
        <span className="confirmation-icon">✓</span>
        <h1>Your Email has been Verified</h1>
      </div>

      <div className="details-container">
        <div className="details-card">
          <div className="details-header">Activated</div>
          <div className="details-content">
            <p>Your email has been verified. You can continue to login with your registered details.</p>
            <Link to="/auth">
              <button className="login-button">Back to Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivatePage;
