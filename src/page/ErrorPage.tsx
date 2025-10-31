import React from 'react';
import { X, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
  onTryAgain: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ onTryAgain }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
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
        {/* Error Icon */}
        <div style={{ marginBottom: window.innerWidth < 768 ? '24px' : '32px' }}>
          <div
            style={{
              width: window.innerWidth < 768 ? '80px' : '96px',
              height: window.innerWidth < 768 ? '80px' : '96px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <X
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
            Not Success
          </h1>
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '16px' : '18px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '0',
            }}
          >
            Something went wrong while processing your quote. Don't worry, your data is safe.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onTryAgain}
          style={{
            width: '100%',
            backgroundColor: '#ef4444',
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = '#dc2626';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
        >
          <RefreshCw
            style={{
              width: window.innerWidth < 768 ? '16px' : '20px',
              height: window.innerWidth < 768 ? '16px' : '20px',
            }}
          />
          Try again
        </button>

        {/* Additional Info */}
        <div
          style={{
            marginTop: window.innerWidth < 768 ? '24px' : '32px',
            padding: window.innerWidth < 768 ? '12px' : '16px',
            backgroundColor: '#fef2f2',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '12px' : '14px',
              color: '#991b1b',
              margin: '0',
            }}
          >
            <strong>What happened?</strong> There might be a temporary issue with our servers. Please try again in a
            moment.
          </p>
        </div>

        {/* Support Info */}
        <div
          style={{
            marginTop: window.innerWidth < 768 ? '16px' : '24px',
            padding: window.innerWidth < 768 ? '12px' : '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: window.innerWidth < 768 ? '12px' : '14px',
              color: '#6b7280',
              margin: '0',
            }}
          >
            If the problem persists, please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};
