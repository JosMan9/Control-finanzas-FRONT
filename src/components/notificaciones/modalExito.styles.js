import { css } from 'lit';

export const modalExitoStyles = css`
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
    padding: 48px 32px 32px; text-align: center;
    box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.1);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .overlay.visible .modal-card { transform: translateY(0) scale(1); }

  .icon-wrapper { position: relative; width: 110px; height: 110px; margin: 0 auto 32px; }
  .icon-bg-skew {
    position: absolute; inset: 4px; background: #E6F4EA; border-radius: 20px;
    transform: rotate(15deg); z-index: 1;
  }
  .icon-container {
    position: absolute; inset: 20px; background: #0F763E; border-radius: 20px;
    display: flex; align-items: center; justify-content: center; z-index: 2;
    color: white; box-shadow: 0 8px 16px rgba(15, 118, 62, 0.3);
  }
  .icon-container svg {
    width: 32px; height: 32px; stroke-width: 3;
    stroke-dasharray: 48; stroke-dashoffset: 48;
    animation: draw 0.5s ease-out 0.2s forwards;
  }
  @keyframes draw { 100% { stroke-dashoffset: 0; } }

  .dot { position: absolute; border-radius: 50%; background: #6CE091; z-index: 3; }
  .dot-1 { width: 10px; height: 10px; top: -5px; right: 5px; transform: translate(50%, -50%); }
  .dot-2 { width: 8px; height: 8px; bottom: 8px; left: -5px; transform: translate(-100%, 50%); }

  .title {
    font-size: 26px; font-weight: 800; color: #07153B;
    margin-bottom: 16px; letter-spacing: -0.03em;
  }
  .message {
    font-size: 15px; color: #4B5563; line-height: 1.5;
    margin-bottom: 32px; padding: 0 12px;
  }
  .btn-primary {
    background: #020C38; color: #ffffff; border: none; border-radius: 16px;
    padding: 18px 32px; font-size: 16px; font-weight: 600; cursor: pointer;
    width: 100%; font-family: inherit; transition: background 0.2s, transform 0.1s;
    box-shadow: 0 10px 20px -5px rgba(2, 12, 56, 0.3); margin-bottom: 32px;
  }
  .btn-primary:active { transform: translateY(2px); }

  .footer-secure {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 10px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.15em;
  }
  .footer-secure svg { width: 12px; height: 12px; }
`;
