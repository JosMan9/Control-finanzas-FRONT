import { css } from 'lit';

export const tablaQuincenaStyles = css`
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
  .top-bar { display: flex; justify-content: flex-end; align-items: center; gap: 40px; margin-bottom: 32px; }
  .top-nav { display: flex; gap: 24px; font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .top-nav span { cursor: pointer; }
  .top-nav span.active { color: var(--navy); }
  .avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--gray-200);
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .avatar svg { width: 40px; height: 40px; }

  .page-header {
    margin-bottom: 32px;
  }
  .page-header h1 {
    font-size: 28px;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }
  .page-header p {
    font-size: 15px;
    color: var(--gray-500);
    max-width: 600px;
    line-height: 1.5;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
    align-items: start;
  }

  /* List Section */
  .list-section-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 16px;
  }
  
  .list-container {
    background: var(--gray-50);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Card */
  .q-card {
    background: white;
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    border-left: 4px solid transparent;
    transition: box-shadow 0.2s;
  }
  .q-card:hover {
    box-shadow: var(--shadow-md);
  }
  .q-card.en-curso {
    border-left-color: #10B981;
  }

  .icon-box {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .q-card.completado .icon-box { background: var(--navy); color: white; }
  .q-card.en-curso .icon-box { background: #86efac; color: #065f46; } 
  .q-card.pendiente .icon-box { background: #e2e8f0; color: #64748b; }

  .q-info {
    flex: 1;
  }
  .q-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .q-dates {
    font-size: 12px;
    color: var(--gray-500);
  }

  .badge {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    min-width: 90px;
  }
  .badge.completado { background: #e2e8f0; color: #475569; }
  .badge.en-curso { background: #10B981; color: white; }
  .badge.pendiente { background: #e2e8f0; color: #475569; }

  .q-actions {
    display: flex;
    gap: 6px;
    margin-left: 12px;
  }
  .action-btn {
    width: 32px; height: 32px;
    border: none;
    background: transparent;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    color: var(--gray-500);
    transition: background 0.15s, color 0.15s;
  }
  .action-btn:hover { background: var(--gray-100); color: var(--navy); }
  .action-btn.del-btn:hover { background: var(--red-bg); color: var(--red); }

  .btn-add-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #818CF8;
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    padding: 12px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-add-custom:hover {
    text-decoration: underline;
  }

  /* Summary Card */
  .summary-card {
    background: #0B192C;
    border-radius: 16px;
    padding: 32px 24px;
    color: white;
  }
  .summary-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }
  .summary-card p {
    font-size: 13px;
    line-height: 1.6;
    color: #94a3b8;
    margin-bottom: 32px;
  }
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-size: 12px;
    color: #cbd5e1;
    align-items: center;
  }
  .summary-row:last-child {
    border-bottom: none;
  }
  .summary-val {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .layout {
      flex-direction: column;
    }
    
    
    
    
    
    
    .top-bar {
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 24px;
    }
    .top-nav {
      width: 100%;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 12px;
      overflow-x: auto;
    }
    .top-nav::-webkit-scrollbar {
      display: none;
    }
    .main {
      padding: 24px;
    }
    .q-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .q-actions {
      align-self: flex-end;
    }
    .badge {
      align-self: flex-start;
    }
  }
`;
