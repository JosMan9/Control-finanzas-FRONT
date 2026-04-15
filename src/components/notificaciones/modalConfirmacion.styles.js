import { css } from 'lit';

export const modalConfirmacionStyles = css`
  :host { font-family: 'Inter', system-ui, sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .overlay {
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
  }
  .overlay.visible { opacity: 1; pointer-events: auto; }

  .modal-card {
    background: #F1F3F5; /* Very light gray matching the image */
    border-radius: 36px; width: 100%; max-width: 420px;
    padding: 48px 32px 32px; text-align: center;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .overlay.visible .modal-card { transform: translateY(0) scale(1); }

  .title {
    font-size: 26px; font-weight: 800; color: #111827;
    margin-bottom: 20px; letter-spacing: -0.02em;
  }
  .message {
    font-size: 16px; color: #4B5563; line-height: 1.5;
    margin-bottom: 40px; padding: 0 16px;
  }

  .button-group {
    display: flex; flex-direction: column; gap: 16px;
  }
  
  .btn {
    border: none; border-radius: 12px; padding: 18px; 
    font-size: 16px; font-weight: 700; cursor: pointer;
    width: 100%; font-family: inherit; transition: opacity 0.15s, transform 0.1s;
  }
  .btn:active { transform: translateY(1px); }

  .btn-danger {
    background: #B91C1C; /* Dark red matching the image */
    color: #ffffff;
  }
  .btn-danger:hover { background: #991B1B; }

  .btn-cancel {
    background: #E5E7EB; /* Light gray matching the image */
    color: #111827;
  }
  .btn-cancel:hover { background: #D1D5DB; }

  .footer-text {
    margin-top: 40px;
    font-size: 10px; font-weight: 700; color: #6B7280;
    letter-spacing: 0.15em; text-transform: uppercase;
  }
`;
