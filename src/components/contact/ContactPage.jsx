import React, { useState } from 'react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      paddingLeft: 'calc(var(--menu-width) - 230px)', // Moved more to the left
      marginTop: '-80px',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px'
      }}>
        <div style={{
          fontFamily: 'Times New Roman',
          fontSize: '12pt',
          color: '#666',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          my inbox holds space for you
        </div>
        <form 
          onSubmit={handleSubmit}
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'Times New Roman',
              fontSize: '12pt',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'Times New Roman',
              fontSize: '12pt',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <textarea
            name="message"
            placeholder="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'Times New Roman',
              fontSize: '12pt',
              width: '100%',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'none',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: 'Times New Roman',
              padding: '10px',
              margin: '0 auto',
              transition: 'opacity 0.2s ease-out',
              letterSpacing: '1px',
              ':hover': {
                opacity: 0.7
              }
            }}
          >
            ⊂(´･◡･⊂) ∘˚˳°☘️
          </button>
        </form>
      </div>
    </div>
  );
};
