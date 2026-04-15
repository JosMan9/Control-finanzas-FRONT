import { css } from 'lit';

export const tablaPersonaStyles = css`
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
    --navy: #0F172A; 
    --green: #10B981;
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

  .layout { display: flex; min-height: 100vh; background: white; }

  /* Main Area */
  .main { flex: 1; padding: 32px 48px; display: flex; flex-direction: column; background: white; }
  
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; width: 100%;}
  .search-container {
    position: relative;
    width: 360px;
  }
  .search-input {
    width: 100%;
    padding: 10px 16px 10px 40px;
    border: none;
    background: var(--gray-100);
    border-radius: 12px;
    font-size: 14px;
    color: var(--navy);
  }
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
  }

  .top-right { display: flex; align-items: center; gap: 20px; }
  .config-icon { color: var(--gray-600); cursor: pointer; transition: color 0.2s;}
  .avatar-top { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 2px solid var(--gray-200); }
  .avatar-top img { width: 100%; height: 100%; object-fit: cover; }

  .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
  .header-left h1 { font-size: 32px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 8px; }
  .header-left p { font-size: 15px; color: var(--gray-500); max-width: 600px; line-height: 1.5; }
  
  .btn-add-persona { 
    background: #0B192C; 
    color: white; 
    border: none; 
    border-radius: 8px; 
    padding: 14px 24px; 
    font-size: 14px; 
    font-weight: 700; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    box-shadow: 0 4px 12px rgba(11, 25, 44, 0.15);
  }

  .content-grid { display: grid; grid-template-columns: 340px 1fr; gap: 40px; align-items: start; }

  /* Left Form Panel */
  .form-card { background: var(--gray-50); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; }
  .form-card h3 { font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 24px; }
  
  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 12px; font-weight: 800; color: var(--gray-600); margin-bottom: 8px; display: block; text-transform: uppercase; letter-spacing: 0.05em; }
  .form-input { 
    width: 100%; 
    padding: 14px 16px; 
    border: 1.5px solid white; 
    border-radius: 10px; 
    font-size: 14px; 
    color: var(--navy); 
    background: white; 
    transition: all 0.2s;
  }
  .form-input:focus { outline: none; border-color: #818CF8; box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1); }
  
  .alias-input-wrapper { position: relative; }
  .alias-at { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #818CF8; font-weight: 700; }
  .form-input-alias { padding-left: 32px; }

  .surname-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .form-actions { display: flex; gap: 12px; margin-top: 8px; }
  .btn-save { flex: 1; background: #0B192C; color: white; border: none; border-radius: 10px; padding: 16px; font-size: 14px; font-weight: 700; cursor: pointer; }
  .btn-delete-icon { width: 52px; height: 52px; background: #FCA5A5; color: #7F1D1D; border: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

  .info-box { 
    margin-top: 24px; 
    padding: 20px; 
    background: #EBF7F1; 
    border-radius: 10px; 
    display: flex; 
    gap: 12px;
    align-items: flex-start;
  }
  .info-icon { width: 20px; height: 20px; background: #0F763E; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
  .info-box p { font-size: 12px; color: #064E3B; line-height: 1.6; font-weight: 500; }

  /* Right Side Content */
  .stats-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-bottom: 32px; }
  .stat-mini-card { background: white; border: 1.5px solid var(--gray-100); border-radius: 16px; padding: 24px; }
  .stat-label { font-size: 12px; font-weight: 600; color: var(--gray-600); margin-bottom: 8px; display: block; }
  .stat-value { font-size: 32px; font-weight: 800; color: var(--navy); }

  .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .list-header h3 { font-size: 16px; font-weight: 800; color: var(--navy); }
  .view-toggles { display: flex; gap: 4px; background: var(--gray-100); padding: 4px; border-radius: 8px; }
  .toggle-btn { width: 32px; height: 32px; border: none; background: transparent; display: flex; align-items: center; justify-content: center; border-radius: 6px; cursor: pointer; color: var(--gray-400); }
  .toggle-btn.active { background: white; color: var(--navy); box-shadow: var(--shadow-sm); }

  .contacts-list { display: flex; flex-direction: column; gap: 12px; }
  .contacts-list.grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  .contacts-list.grid-view .contact-card {
    flex-direction: column;
    padding: 32px 24px;
    text-align: center;
  }
  .contacts-list.grid-view .contact-meta {
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }
  .contacts-list.grid-view .dot-separator { display: none; }
  .contacts-list.grid-view .contact-actions {
    margin-top: 16px;
    width: 100%;
    justify-content: center;
  }
  .contact-card { 
    background: white; 
    border: 1px solid var(--gray-100); 
    border-radius: 16px; 
    padding: 16px 24px; 
    display: flex; 
    align-items: center; 
    gap: 16px;
    transition: all 0.2s;
  }
  .contact-card:hover { border-color: var(--gray-200); box-shadow: var(--shadow-sm); }
  
  .contact-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; background: var(--gray-100); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .contact-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .initial-avatar { font-size: 16px; font-weight: 800; color: var(--navy); }

  .contact-main { flex: 1; }
  .contact-name { font-size: 16px; font-weight: 800; color: var(--navy); margin-bottom: 4px; }
  .contact-meta { display: flex; align-items: center; gap: 12px; }
  .alias-badge { font-size: 12px; font-weight: 600; color: #818CF8; background: #EEF2FF; padding: 2px 8px; border-radius: 6px; }
  .linked-expenses { font-size: 12px; color: var(--gray-500); display: flex; align-items: center; gap: 4px; }
  .dot-separator { width: 3px; height: 3px; background: var(--gray-300); border-radius: 50%; }

  .contact-actions { display: flex; gap: 8px; }
  .btn-edit-contact { 
    border: none; 
    background: var(--gray-100); 
    color: var(--navy); 
    padding: 8px 16px; 
    border-radius: 8px; 
    font-size: 12px; 
    font-weight: 700; 
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .btn-del-contact { width: 32px; height: 32px; border: none; background: transparent; color: var(--gray-400); display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 6px; }
  .btn-del-contact:hover { background: var(--red-bg); color: var(--red); }

  .pagination { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; }
  .pagination-info { font-size: 13px; color: var(--gray-500); }
  .page-numbers { display: flex; gap: 8px; }
  .page-num { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--gray-500); transition: all 0.2s; }
  .page-num.active { background: var(--gray-100); color: var(--navy); }
  .page-nav { color: var(--gray-300); cursor: pointer; display: flex; align-items: center; }

  /* Footer Banner */
  .footer-banner {
    margin-top: 60px;
    background: #0B192C;
    border-radius: 32px;
    padding: 48px 60px;
    color: white;
    position: relative;
    overflow: hidden;
  }
  .footer-banner::before {
    content: '';
    position: absolute;
    left: 0; bottom: 0; top: 0; width: 8px;
    background: #1e3a8a;
  }
  .banner-icon-bg { width: 44px; height: 44px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
  .banner-label-foot { font-size: 11px; font-weight: 800; letter-spacing: 0.15em; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; display: block; }
  .footer-banner h2 { font-size: 36px; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.01em; }
  .footer-banner p { font-size: 16px; color: #cbd5e1; max-width: 500px; line-height: 1.6; }

  /* Responsive Settings */
  @media (max-width: 1280px) {
    .content-grid { grid-template-columns: 1fr; gap: 32px; }
    .form-card { max-width: none; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    .main { padding: 20px; }
    .page-header { flex-direction: column; align-items: stretch; gap: 20px; }
    .top-bar { display: none; }
    
    .search-container { width: 100%; margin-bottom: 20px; }
    .btn-add-persona { width: 100%; justify-content: center; }
    .stats-row { grid-template-columns: 1fr; }
    
    .pagination { flex-direction: column; gap: 20px; align-items: center; }
    .contacts-list.grid-view { grid-template-columns: 1fr; }
  }
`;
