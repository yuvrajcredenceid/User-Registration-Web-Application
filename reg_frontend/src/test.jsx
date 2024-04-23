import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Popup({ message, onClose }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Test() {
  const navigate = useNavigate();
  const [responseLog, setResponseLog] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const emailAddresses = ["yuviworkmail@gmail.com", "v.a@credenceid.com", "r.v@credenceid.com","benl@credenceid.com"];

  const performSequentialRequests = async () => {
    try {
      for (const email of emailAddresses) {
        await getMyData(email);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getMyData = async (email) => {
    try {
      const response = await axios.get(`http://54.252.169.176:8081/api/v1/user/get?email=${encodeURIComponent(email)}`);
      handleResponse(email, response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResponse = (email, response) => {
    const testPassed =
      response.id !== undefined &&
      typeof response.firstName === 'string' &&
      typeof response.lastName === 'string' &&
      typeof response.email === 'string' &&
      typeof response.phone === 'string' &&
      typeof response.age === 'number' &&
      typeof response.location === 'string';

    const responseCodePassed = response.status === 200;
    console.log(response.status);
    setResponseLog(prevLogs => [
      ...prevLogs,
      { email, testPassed: response, responseBody: response }
    ]);
  };

  const handleSendRequest = () => {
    setResponseLog([]);
    performSequentialRequests();
  };

  const TestResult = ({ email, testPassed, responseBody }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderResponse = (response) => {
      return Object.entries(response).map(([key, value]) => (
        <div key={key}>
          <span style={{ fontWeight: 'bold' }}>{key}: </span>
          {value}
        </div>
      ));
    };

    const handleShowDetails = () => {
      setPopupMessage(renderResponse(responseBody));
      setShowPopup(true);
    };

    return (
      <div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}>
          Test Case for {email}: {testPassed ? 'Passed' : 'Failed'}
        </div>
        {isExpanded && (
          <div>
            <button onClick={handleShowDetails}>Show Details</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
      <div className="topBar">
        <h2>User API Test</h2>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
      <div className="test-cases-container">
        {responseLog.map(({ email, testPassed, responseBody }, index) => (
          <TestResult key={index} email={email} testPassed={testPassed} responseBody={responseBody} />
        ))}
      </div>
      <button className="send-request-button" onClick={handleSendRequest}>
        Send Request
      </button>
    </div>
  );
}

export default Test;
