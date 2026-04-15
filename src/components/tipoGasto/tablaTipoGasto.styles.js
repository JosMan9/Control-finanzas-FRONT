import { css } from 'lit';

export const tablaTipoGastoStyles = css`
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

  .layout { display: flex; min-height: 100vh; background: white; }

  /* Main Area */
  .main { flex: 1; padding: 32px 48px; display: flex; flex-direction: column; background: white; }
  
  .top-bar { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 32px; width: 100%;}
  .top-right { display: flex; align-items: center; gap: 24px; }
  .top-nav { display: flex; gap: 24px; font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .top-nav span { cursor: pointer; }
  .top-nav span.active { color: var(--navy); }
  
  .config-icon { color: var(--gray-500); cursor: pointer; transition: color 0.2s;}
  .config-icon:hover { color: var(--navy); }
  
  .avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: #0B192C; display: flex; align-items: center; justify-content: center; }
  .avatar svg { width: 40px; height: 40px; }

  .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
  .header-left { max-width: 650px; }
  .header-left h1 { font-size: 36px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 12px; }
  .header-left p { font-size: 15px; color: var(--gray-500); line-height: 1.5; }
  
  .btn-header-add { background: #0B192C; color: white; border: none; border-radius: 10px; padding: 14px 20px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: opacity 0.2s; }
  .btn-header-add:hover { opacity: 0.9; }

  .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }

  /* Left Panel */
  .list-container { background: var(--gray-50); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; }
  .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .list-header h3 { font-size: 18px; font-weight: 800; color: var(--navy); }
  .count-badge { background: white; color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px; }
  .count-badge::before { content: ''; width: 6px; height: 6px; background: #10B981; border-radius: 50%; }

  .cat-list { display: flex; flex-direction: column; gap: 12px; }
  .cat-card { background: white; border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: box-shadow 0.2s; }
  .cat-card:hover { box-shadow: var(--shadow-sm); }
  
  .cat-icon { width: 44px; height: 44px; background: var(--gray-50); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--navy); }
  .cat-name { flex: 1; font-size: 15px; font-weight: 700; color: var(--navy); }
  
  .cat-actions { display: flex; gap: 8px; }
  .action-btn { width: 32px; height: 32px; border: none; background: transparent; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; color: var(--gray-400); transition: background 0.15s, color 0.15s; }
  .action-btn svg { width: 16px; height: 16px; }
  .action-btn:hover { background: var(--gray-100); color: var(--navy); }
  .action-btn.del-btn:hover { background: var(--red-bg); color: var(--red); }

  .add-dashed-box { margin-top: 12px; border: 2px dashed var(--gray-200); border-radius: 12px; padding: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--gray-500); font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
  .add-dashed-box:hover { background: white; border-color: var(--gray-300); color: var(--navy); }

  /* Right Panel */
  .right-content { display: flex; flex-direction: column; gap: 24px; }
  
  .stats-card { background: #0B192C; border-radius: 16px; padding: 32px; color: white; position: relative; overflow: hidden; }
  .stats-header { font-size: 11px; font-weight: 700; color: #818CF8; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; display: block;}
  .stats-title { font-size: 24px; font-weight: 800; line-height: 1.2; margin-bottom: 32px; z-index: 1; position: relative;}
  
  .progress-section { margin-bottom: 24px; z-index: 1; position: relative; }
  .progress-labels { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
  .progress-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: #10B981; width: 65%; border-radius: 3px; }
  
  .stats-desc { font-size: 12px; color: #94a3b8; line-height: 1.6; z-index: 1; position: relative;}
  .stats-bg-icon { position: absolute; top: -10px; right: -10px; width: 140px; height: 140px; opacity: 0.05; color: white; pointer-events: none;}

  .tip-card { background: var(--gray-50); border-radius: 16px; padding: 24px; display: flex; gap: 16px; align-items: flex-start; }
  .tip-icon { color: #10B981; flex-shrink: 0; }
  .tip-content h4 { font-size: 13px; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
  .tip-content p { font-size: 12px; color: var(--gray-500); line-height: 1.5; }

  /* Responsive Settings */
  @media (max-width: 1024px) {
    .content-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    
    
    
    
    
    
    .top-bar { flex-wrap: wrap; justify-content: space-between; width: 100%; margin-bottom: 24px; }
    .top-right { width: 100%; justify-content: space-between; margin-top: 12px; }
    .top-nav { display: none; }
    
    .page-header { flex-direction: column; gap: 16px; align-items: flex-start; margin-bottom: 24px;}
    .main { padding: 24px; }
  }
`;
