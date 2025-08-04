import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
 
const LoginPage = ({ onLogin }) => {
  const [loginId, setLoginId] = useState(''); // Can be user ID or phone number
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPinField, setShowPinField] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
 
  const getUsers = () => {
    const users = localStorage.getItem('zerodha-users');
    return users ? JSON.parse(users) : [];
  };
 
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
   
    setTimeout(() => {
      const users = getUsers();
      // Check against both userId and mobile
      const user = users.find(u =>
        (u.userId === loginId || u.mobile === loginId) &&
        u.password === password
      );
     
      if (user) {
        setCurrentUser(user);
        setShowPinField(true);
        setError('');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 500);
  };
 
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }
   
    if (currentUser.pin === pin) {
      onLogin(currentUser.userId);
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          padding: '40px',
          textAlign: 'center',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{ marginBottom: '30px' }}
        >
          <img
            src="https://zerodha.com/static/images/logo.svg"
            alt="Zerodha"
            style={{ height: '28px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        </motion.div>
 
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '22px',
            fontWeight: '500',
            color: '#444',
            marginBottom: '25px'
          }}
        >
          {showPinField ? 'Enter your 6-digit PIN' : 'Login to your account'}
        </motion.h2>
 
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: '#ff4d4f',
              backgroundColor: '#fff1f0',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}
          >
            {error}
          </motion.div>
        )}
 
        {!showPinField ? (
          <form onSubmit={handleFirstStepSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: '20px', textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>User ID / Phone Number</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="Enter User ID or Phone Number"
                required
              />
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: '20px', textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>Password</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="Enter your password"
                required
                minLength="6"
              />
            </motion.div>
 
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #387ed1 0%, #2a5f9e 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(56, 126, 209, 0.2)'
              }}
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    margin: '0 auto'
                  }}
                />
              ) : 'Continue'}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handlePinSubmit}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '30px', textAlign: 'center' }}
            >
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px'
              }}>
                Enter the 6-digit PIN for <strong>{currentUser?.userId}</strong>
              </div>
             
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: '5px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="• • • • • •"
                autoFocus
                required
              />
            </motion.div>
 
            <div style={{ display: 'flex', gap: '15px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setShowPinField(false);
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'white',
                  color: '#387ed1',
                  border: '1px solid #387ed1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                Back
              </motion.button>
             
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, #387ed1 0%, #2a5f9e 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(56, 126, 209, 0.2)'
                }}
              >
                Login
              </motion.button>
            </div>
          </form>
        )}
 
        {!showPinField && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ fontSize: '14px', color: '#666', marginBottom: '25px' }}
            >
              <span>Forgot user ID or password? </span>
              <a href="#" style={{
                color: '#387ed1',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Reset</a>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                paddingTop: '25px',
                fontSize: '14px',
                color: '#666'
              }}
            >
              Don't have an account?{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/signup')}
                style={{
                  color: '#387ed1',
                  textDecoration: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Sign up now
              </motion.a>
            </motion.div>
          </>
        )}
      </motion.div>
 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '40px',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center'
        }}
      >
        © {new Date().getFullYear()} Zerodha Broking Ltd. All rights reserved.
      </motion.div>
    </motion.div>
  );
};
 
export default LoginPage;