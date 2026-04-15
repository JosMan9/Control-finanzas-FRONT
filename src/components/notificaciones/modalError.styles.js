import { css } from 'lit';

export const modalErrorStyles = css`
  :host { font-family: 'Inter', system-ui, sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .overlay {
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
  }
  .overlay.visible { opacity: 1; pointer-events: auto; }

  .modal-card {
    background: #ffffff; border-radius: 40px; width: 100%; max-width: 380px;
    padding: 48px 32px 40px; text-align: center;
    box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.1);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .overlay.visible .modal-card { transform: translateY(0) scale(1); }

  .icon-container {
    width: 68px; height: 68px; margin: 0 auto 24px;
    background: #FCE8E8; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    color: #DC2626; 
  }
  .icon-container svg {
    width: 34px; height: 34px;
  }

  .title {
    font-size: 24px; font-weight: 700; color: #111827;
    margin-bottom: 16px; letter-spacing: -0.02em;
  }
  .message {
    font-size: 15px; color: #4B5563; line-height: 1.55;
    margin-bottom: 32px; padding: 0 8px;
  }

  .button-group {
    display: flex; flex-direction: column; gap: 12px;
  }
  
  .btn {
    border: none; border-radius: 12px; padding: 18px; 
    font-size: 15px; font-weight: 600; cursor: pointer;
    width: 100%; font-family: inherit; transition: opacity 0.15s, transform 0.1s;
  }
  .btn:active { transform: translateY(1px); }

  .btn-primary {
    background: #021E5C; color: #ffffff;
    box-shadow: 0 8px 16px -4px rgba(2, 30, 92, 0.4);
  }
  .btn-primary:hover { opacity: 0.9; }

  .btn-secondary {
    background: #EAEAEA; color: #4B5563;
  }
  .btn-secondary:hover { background: #D1D5DB; }
`;
