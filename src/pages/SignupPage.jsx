



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    pan: '',
    userId: '',
    password: '',
    confirmPassword: '',
    pin: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!formData.pan) newErrors.pan = 'PAN is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'PAN is invalid';
    if (!formData.userId) newErrors.userId = 'User ID is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.pin) newErrors.pin = 'PIN is required';
    else if (!/^\d{6}$/.test(formData.pin)) newErrors.pin = 'PIN must be 6 digits';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const newUser = {
          userId: formData.userId,
          password: formData.password,
          pin: formData.pin,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          pan: formData.pan
        };
        
        onSignup(newUser);
        setIsSubmitting(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
          maxWidth: '500px',
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
          Create your Zerodha account
        </motion.h2>

        <form onSubmit={handleSubmit}>
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
            }}>Full Name*</label>
            <motion.input
              whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: `1px solid ${errors.name ? '#ff4d4f' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                backgroundColor: '#fafafa'
              }}
              placeholder="As per PAN card"
            />
            {errors.name && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
              >
                {errors.name}
              </motion.div>
            )}
          </motion.div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ flex: 1, textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>Email*</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `1px solid ${errors.email ? '#ff4d4f' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="Your email address"
              />
              {errors.email && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
                >
                  {errors.email}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ flex: 1, textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>Mobile*</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({...formData, mobile: value});
                  if (errors.mobile) setErrors({...errors, mobile: ''});
                }}
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `1px solid ${errors.mobile ? '#ff4d4f' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
                >
                  {errors.mobile}
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ marginBottom: '20px', textAlign: 'left' }}
          >
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#555',
              fontWeight: '500'
            }}>PAN*</label>
            <motion.input
              whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
              type="text"
              name="pan"
              value={formData.pan}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setFormData({...formData, pan: value});
                if (errors.pan) setErrors({...errors, pan: ''});
              }}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: `1px solid ${errors.pan ? '#ff4d4f' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                backgroundColor: '#fafafa'
              }}
              placeholder="10-character PAN"
              maxLength="10"
            />
            {errors.pan && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
              >
                {errors.pan}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginBottom: '20px', textAlign: 'left' }}
          >
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#555',
              fontWeight: '500'
            }}>Choose User ID*</label>
            <motion.input
              whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: `1px solid ${errors.userId ? '#ff4d4f' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                backgroundColor: '#fafafa'
              }}
              placeholder="Your unique user ID"
            />
            {errors.userId && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
              >
                {errors.userId}
              </motion.div>
            )}
          </motion.div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ flex: 1, textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>Password*</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `1px solid ${errors.password ? '#ff4d4f' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="At least 6 characters"
              />
              {errors.password && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
                >
                  {errors.password}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ flex: 1, textAlign: 'left' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555',
                fontWeight: '500'
              }}>Confirm Password*</label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `1px solid ${errors.confirmPassword ? '#ff4d4f' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  backgroundColor: '#fafafa'
                }}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
                >
                  {errors.confirmPassword}
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            style={{ marginBottom: '20px', textAlign: 'left' }}
          >
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#555',
              fontWeight: '500'
            }}>6-digit PIN*</label>
            <motion.input
              whileFocus={{ boxShadow: '0 0 0 2px rgba(56, 126, 209, 0.3)' }}
              type="password"
              name="pin"
              value={formData.pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setFormData({...formData, pin: value});
                if (errors.pin) setErrors({...errors, pin: ''});
              }}
              maxLength="6"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: `1px solid ${errors.pin ? '#ff4d4f' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                backgroundColor: '#fafafa'
              }}
              placeholder="For login verification"
            />
            {errors.pin && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
              >
                {errors.pin}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ marginBottom: '25px', textAlign: 'left' }}
          >
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#555',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                style={{
                  marginRight: '10px',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              I agree to the <a href="#" style={{ color: '#387ed1', marginLeft: '5px' }}>Terms and Conditions</a>
            </label>
            {errors.agreeTerms && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '5px' }}
              >
                {errors.agreeTerms}
              </motion.div>
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
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
            {isSubmitting ? (
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
            ) : 'Create Account'}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            paddingTop: '25px',
            fontSize: '14px',
            color: '#666',
            textAlign: 'center'
          }}
        >
          Already have an account?{' '}
          <motion.a
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/login')}
            style={{ 
              color: '#387ed1', 
              textDecoration: 'none',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Login
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
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

export default SignupPage;

