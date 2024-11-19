// Agreement.jsx
import React, { useState } from 'react';
import './css/Agreement.css';

const Agreement = ({ onAccept, onCancel }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Subscription Agreement</h2>
          <button className="close-button" onClick={onCancel}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="agreement-sections">
            <section>
              <h3>1. Terms of Service</h3>
              <p>By subscribing, you agree to our terms and automatic renewal policy.</p>
            </section>

            <section>
              <h3>2. Payment Terms</h3>
              <p>Subscription fees will be processed through PayPal on a recurring basis.</p>
            </section>

            <section>
              <h3>3. Data Usage</h3>
              <p>Our API provides real-time data subject to rate limits and usage restrictions.</p>
            </section>

            <section>
              <h3>4. Liability</h3>
              <p>Service provided "as is" without warranty. We are not liable for trading decisions.</p>
            </section>
          </div>

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I agree to the terms and conditions</span>
          </label>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button
            className={`accept-button ${!agreed ? 'disabled' : ''}`}
            onClick={onAccept}
            disabled={!agreed}
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agreement;