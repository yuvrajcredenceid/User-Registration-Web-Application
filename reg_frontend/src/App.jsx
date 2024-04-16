import React, { useState } from 'react';
import img from './assets/logo.png';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';

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

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setAge('');
    setLocation('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const validateNumber = (value) => {
    const numberRegex = /^\d+$/;
    return numberRegex.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateEmail(email)) {
      setPopupMessage('Please enter a valid email address.');
      setShowPopup(true);
      return;
    }
  
    if (!validateNumber(age) || age < 1 ) {
      setPopupMessage('Please enter a valid age between 1 and 99.');
      setShowPopup(true);
      return;
    }
  
    if (!location.trim() || validateNumber(location)) {
      setPopupMessage('Please enter valid location.');
      setShowPopup(true);
      return;
    }
  
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      age: parseInt(age),
      location: location
    };
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(userData),
      redirect: "follow"
    };
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/save", requestOptions);
      
      if (response.ok) {
        console.log('User registered successfully!');
        const data = await response.text(); // get text response
        setPopupMessage(data); 
        setShowPopup(true); 
        resetForm();
      } else {
        throw new Error('Failed to register user:', response.statusText);
        setPopupMessage('Failed to register user');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setPopupMessage(error.message); // Set the error message
      setShowPopup(true);
    }
    // try {
    //   const response = await fetch('http://localhost:8080/api/v1/user/save', requestOptions);
    
    //   console.log('Response:', response);
      
    //   if (response.ok) {
    //     console.log('User registered successfully!');
    //     setPopupMessage('User registered successfully!');
    //     setShowPopup(true); // Show the success popup
    //     resetForm();
    //   } else {
    //     console.error('Failed to register user:', response.statusText);
    //     setPopupMessage('Failed to register user');
    //     setShowPopup(true);
    //   }
    // } catch (error) {
    //   console.error('Error registering user:', error);
    //   setPopupMessage('Error registering user');
    //   setShowPopup(true);
    // }
  };

  return (
    <>
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
      <div className="topBar">
        <img src={img} alt="Your Company Logo" />
        <h2>Create New Account</h2>
      </div>
      <div className="create-account">
        <form onSubmit={handleSubmit} className='whitebg'>
          <div className="profile-section">
            <h3>Your Profile</h3>
            <p>
              Enter the required information. You will be able to create additional users after registering.
            </p>
          </div>
          <div className="name-inputs">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="email-phone-inputs">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                defaultCountry="IN"
                id="phone"
                value={phone}
                onChange={setPhone}
              />
            </div>
          </div>

          <div className="age-location-inputs">
            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
