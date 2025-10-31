import React from 'react';
import { Check } from 'lucide-react';

interface SuccessPageProps {
  onGoBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onGoBack }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: window.innerWidth < 768 ? '16px' : '24px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: window.innerWidth < 768 ? '16px' : '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: window.innerWidth < 768 ? '24px' : '48px',
          maxWidth: window.innerWidth < 768 ? '100%' : '448px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Success Icon */}
        <div style={{ marginBottom: window.innerWidth < 768 ? '24px' : '32px' }}>
          <div
            style={{
              width: window.innerWidth < 768 ? '80px' : '96px',
              height: window.innerWidth < 768 ? '80px' : '96px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 15px -3px rgba(12, 5, 5, 0.1)',
            }}
          >
            <Check
              style={{
                width: window.innerWidth < 768 ? '40px' : '48px',
                height: window.innerWidth < 768 ? '40px' : '48px',
                color: 'white',
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ marginBottom: window.innerWidth < 768 ? '24px' : '32px' }}>
          <h1
            style={{
              fontSize: window.innerWidth < 768 ? '24px' : '30px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '16px',
              margin: '0 0 16px 0',
            }}
          >
            Success!
          </h1>
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '16px' : '18px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '0',
            }}
          >
            We received your data and your quote has been processed successfully.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onGoBack}
          style={{
            width: '100%',
            backgroundColor: '#10b981',
            color: 'white',
            fontWeight: '600',
            padding: window.innerWidth < 768 ? '14px 24px' : '16px 32px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: window.innerWidth < 768 ? '14px' : '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            transform: 'scale(1)',
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
        >
          Go back to shop
        </button>

        {/* Additional Info */}
        <div
          style={{
            marginTop: window.innerWidth < 768 ? '24px' : '32px',
            padding: window.innerWidth < 768 ? '12px' : '16px',
            backgroundColor: '#f0fdf4',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '12px' : '14px',
              color: '#166534',
              margin: '0',
            }}
          >
            <strong>Next steps:</strong> Your quote is locked for 24 hours. You'll receive a confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
};
