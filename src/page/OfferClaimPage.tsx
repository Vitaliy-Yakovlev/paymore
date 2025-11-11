import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import confetti from 'canvas-confetti';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

const OfferClaimPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const price = location.state?.salePrice || 0;
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  // Confetti animation
  const makeShot = useCallback((particleRatio: number, opts: any): void => {
    const config = { ...opts, origin: { y: 0.7 }, particleCount: Math.floor(200 * particleRatio) };
    confetti(config);
  }, []);

  const launchConfetti = useCallback((): void => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    makeShot(0.1, { spread: 120, startVelocity: 45 });
  }, [makeShot]);

  useEffect(() => {
    launchConfetti();
  }, [launchConfetti]);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/category');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='wrapper-offer-claim-page'>
      <div className='offer-claim-page'>
        <h1 className='offer-claim-page-title'>Congratulations 🎉</h1>
        <p className='offer-claim-page-subtitle'>Your offer is ready, claim your cash!</p>

        <p className='offer-claim-page-amount'>
          <span className='amount-text'>
            {price}
            <span className='cad-text'>CAD</span>
          </span>
        </p>

        <p className='offer-claim-page-expiry'>Hold expires in {formatTime(timeLeft)}</p>

        <label className='offer-claim-page-label'>
          Enter your email to secure this offer
          <input className='offer-claim-page-input' type='email' placeholder='your@email.com' />
        </label>

        <label className='offer-claim-page-label'>
          4 -digit commission / rewards code (optional)
          <input className='offer-claim-page-input' type='number' placeholder='1234' />
        </label>

        <div className='wrapper-verification'>
          <Checkbox
            label={
              <p>
                I agree to the store’s verification & payout policies.
                <span className='view-rewards-btn'>View rewards</span>
              </p>
            }
            checked={verificationChecked}
            onChange={e => setVerificationChecked(e.target.checked)}
          />
        </div>

        <Button disabled={!verificationChecked} onClick={() => navigate('/category')} colorButton={'green'}>
          'Claim my cash now'
        </Button>
      </div>
    </div>
  );
};
export default OfferClaimPage;
