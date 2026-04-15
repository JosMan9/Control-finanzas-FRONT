import { css } from 'lit';

export const tablaStatusStyles = css`
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
    --navy: #0F172A; 
    --green: #0F763E;
    --red: #ef4444;
    --red-bg: #fee2e2;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-900: #0f172a;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .layout {
    display: flex;
    min-height: 100vh;
    background: white;
  }

  /* Main Content */
  .main {
    flex: 1;
    padding: 32px 48px;
    display: flex;
    flex-direction: column;
    background: white;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 32px; }
  .top-bar-title { font-size: 16px; font-weight: 700; color: var(--navy); }
  .top-right { display: flex; align-items: center; gap: 24px; }
  .top-nav { display: flex; gap: 24px; font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .top-nav span { cursor: pointer; }
  .top-nav span.active { color: var(--navy); }
  
  .config-icon { color: var(--gray-900); cursor: pointer; }
  .avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--gray-200);
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .avatar svg { width: 40px; height: 40px; }

  .page-header {
    margin-bottom: 40px;
  }
  .subtitle-badge {
    font-size: 11px;
    font-weight: 800;
    color: #10B981;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
    display: block;
    text-transform: uppercase;
  }
  .page-header h1 {
    font-size: 32px;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }
  .page-header p {
    font-size: 15px;
    color: var(--gray-500);
    max-width: 650px;
    line-height: 1.5;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 48px;
    align-items: start;
  }

  /* Left Form Panel */
  .form-card {
    background: var(--gray-50);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
  }
  .form-card h3 {
    font-size: 20px;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  .form-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--gray-600);
    margin-bottom: 8px;
    display: block;
  }
  .form-input {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 15px;
    color: var(--navy);
    font-family: inherit;
    background: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .form-input:focus {
    outline: none;
    border-color: #818CF8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
  }
  
  .form-input::placeholder {
    color: var(--gray-400);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin-bottom: 32px;
  }
  .color-btn {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    position: relative;
  }
  .color-btn.selected {
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--active-color, #10B981);
  }
  .color-btn.add-custom {
    background: var(--gray-200);
    display: flex; align-items: center; justify-content: center;
    color: var(--gray-500);
    font-size: 20px;
    font-weight: 300;
  }
  .color-btn.add-custom:hover {
    background: var(--gray-300);
  }

  .btn-save {
    background: #0B192C;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 16px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
  }
  .btn-save:hover { opacity: 0.9; }

  /* Right List Panel */
  .list-card {
    background: white;
    border-radius: 16px;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 32px 32px 0;
  }
  .list-title h3 {
    font-size: 20px;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .list-title p {
    font-size: 14px;
    color: var(--gray-500);
  }
  .count-pill {
    background: #E0E7FF;
    color: #3730A3;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
  }

  .status-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 32px;
  }

  .s-card {
    background: var(--gray-50);
    border-radius: 12px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .s-card:hover { 
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm); 
  }

  .s-dot {
    width: 12px; height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .s-info { flex: 1; }
  .s-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .s-desc {
    font-size: 11px;
    font-weight: 700;
    color: var(--gray-500);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .s-actions {
    display: flex;
    gap: 8px;
  }
  .s-btn {
    border: none;
    background: transparent;
    padding: 8px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
    color: var(--gray-500);
    letter-spacing: 0.05em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s, color 0.15s;
  }
  .s-btn svg { width: 14px; height: 14px; }
  .s-btn:hover { background: var(--gray-200); color: var(--navy); }
  .s-btn.btn-del:hover { background: var(--red-bg); color: var(--red); }

  .tip-card {
    margin: 32px 32px 32px;
    background: #0B192C;
    border-radius: 16px;
    padding: 24px;
    color: white;
  }
  .tip-card h4 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .tip-card p {
    font-size: 13px;
    line-height: 1.6;
    color: #cbd5e1;
  }
  .tip-card strong.green { color: #10B981; }
  .tip-card strong.coral { color: #FCA5A5; }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    
    
    
    
    
    
    .top-bar { flex-wrap: wrap; justify-content: space-between; width: 100%; margin-bottom: 24px; }
    .top-right { width: 100%; justify-content: space-between; margin-bottom: 12px; gap: 12px; overflow-x: auto; }
    .top-nav { display: none; } /* Hide top-nav text links on very small screens to save space or keep them scrolling */
    .top-bar-title { margin-bottom: 16px; width: 100%; }
    .main { padding: 24px; }
    
    .list-header { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px 24px 0; }
    .status-list { padding: 0 24px; }
    .tip-card { margin: 24px; }
    .s-card { flex-direction: column; align-items: flex-start; }
    .s-actions { align-self: flex-end; }
  }
`;
