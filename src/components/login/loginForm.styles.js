import { css } from 'lit';

export const loginFormStyles = css`
  :host { display: block; font-family: 'Inter', system-ui, sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .page {
    min-height: 100vh;
    background: linear-gradient(145deg, #eef0f5 0%, #e4e8f0 40%, #dde3ed 100%);
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 24px; position: relative;
  }
  .corner-brand {
    position: fixed; bottom: 24px; left: 24px;
    display: flex; align-items: center; gap: 10px;
  }
  .corner-icon {
    width: 44px; height: 44px; background: #1a1a2e; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: #e8c97a; font-size: 18px;
  }
  .corner-text {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
    color: #6b7280; font-weight: 500; line-height: 1.4;
  }
  .logo-area { text-align: center; margin-bottom: 32px; }
  .logo-title { font-size: 26px; font-weight: 700; color: #1a2340; letter-spacing: -0.02em; margin-bottom: 4px; }
  .logo-subtitle { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
  .card {
    background: #ffffff; border-radius: 16px; padding: 40px 40px 36px;
    width: 100%; max-width: 460px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 40px -4px rgba(0,0,0,0.08);
  }
  .card-title { font-size: 22px; font-weight: 700; color: #1a2340; margin-bottom: 8px; letter-spacing: -0.01em; }
  .card-desc { font-size: 14px; color: #6b7280; line-height: 1.55; margin-bottom: 32px; }
  .form-group { margin-bottom: 20px; }
  .label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #374151; }
  .forgot-link {
    font-size: 11px; font-weight: 600; color: #1e3a8a; text-decoration: none;
    letter-spacing: 0.04em; cursor: pointer; background: none; border: none; padding: 0;
  }
  .forgot-link:hover { text-decoration: underline; }
  .input-wrapper { position: relative; }
  input {
    width: 100%; padding: 13px 44px 13px 16px; background: #f4f6f9;
    border: 1.5px solid transparent; border-radius: 10px; font-size: 14px;
    color: #1a2340; outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }
  input::placeholder { color: #9ca3af; }
  input:focus { background: #fff; border-color: #1e3a8a; box-shadow: 0 0 0 3px rgba(30,58,138,0.08); }
  .input-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    color: #9ca3af; display: flex; align-items: center; pointer-events: none;
  }
  .toggle-password {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #9ca3af;
    display: flex; align-items: center; padding: 0; transition: color 0.2s;
  }
  .toggle-password:hover { color: #4b5563; }
  .error-msg {
    margin-bottom: 16px; padding: 10px 14px; background: #fef2f2;
    border: 1px solid #fca5a5; border-radius: 8px; font-size: 13px; color: #dc2626;
  }
  .btn-submit {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, #1a2f6e 0%, #1e3a8a 100%);
    color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em; cursor: pointer; margin-top: 8px;
    transition: transform 0.15s, box-shadow 0.2s, background 0.2s; font-family: inherit;
  }
  .btn-submit:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
    box-shadow: 0 4px 16px rgba(30,58,138,0.35); transform: translateY(-1px);
  }
  .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  .btn-submit .spinner {
    display: inline-block; width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.7s linear infinite;
    vertical-align: middle; margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .card-footer { text-align: center; margin-top: 24px; font-size: 13.5px; color: #6b7280; }
  .card-footer .link-btn {
    color: #1e3a8a; font-weight: 600; text-decoration: none; cursor: pointer;
    background: none; border: none; font-size: 13.5px; font-family: inherit; padding: 0;
  }
  .card-footer .link-btn:hover { text-decoration: underline; }
  .security-badges { display: flex; align-items: center; gap: 16px; margin-top: 28px; }
  .divider { flex: 1; height: 1px; background: #e5e7eb; }
  .badges { display: flex; gap: 12px; }
  .badge-icon { width: 28px; height: 28px; color: #9ca3af; display: flex; align-items: center; }
  .badge-icon svg { width: 22px; height: 22px; }
`;
