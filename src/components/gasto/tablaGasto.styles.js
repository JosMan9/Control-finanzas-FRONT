import { css } from 'lit';

export const tablaGastoStyles = css`
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
    --navy: #0F172A; 
    --blue-accent: #4338ca;
    --green: #10B981;
    --red: #ef4444;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .layout { display: flex; min-height: 100vh; background: white; }

  .main { 
    flex: 1; 
    padding: 32px 48px; 
    background: white; 
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Top Bar & Header */
  .top-bar { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 32px; width: 100%;}
  .top-right { display: flex; align-items: center; gap: 24px; }
  .top-nav { display: flex; gap: 24px; font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .top-nav span { cursor: pointer; }
  .top-nav span.active { color: var(--navy); }
  
  .avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: #0B192C; display: flex; align-items: center; justify-content: center; }
  .avatar svg { width: 40px; height: 40px; }

  .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
  .header-left h1 { font-size: 36px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 8px; }
  .header-left p { font-size: 15px; color: var(--gray-500); line-height: 1.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  
  .btn-añadir {
    background: #0B192C;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(11, 25, 44, 0.15);
  }

  /* Content Grid */
  .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }

  /* Left Panel: Search, Filters & Table */
  .left-panel { display: flex; flex-direction: column; gap: 24px; }

  .search-container { position: relative; width: 100%; }
  .search-input {
    width: 100%;
    padding: 14px 16px 14px 44px;
    border: none;
    background: var(--gray-50);
    border-radius: 12px;
    font-size: 15px;
    color: var(--navy);
  }
  .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--gray-400); }

  .filters-card {
    background: var(--gray-50);
    border-radius: 16px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    align-items: end;
  }
  .filter-group { display: flex; flex-direction: column; gap: 6px; }
  .filter-label { font-size: 10px; font-weight: 800; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.05em; }
  .filter-select {
    padding: 8px 10px;
    border: 1px solid white;
    background: white;
    border-radius: 8px;
    font-size: 12px;
    color: var(--navy);
    font-weight: 600;
    cursor: pointer;
  }

  .toggle-container { display: flex; background: var(--gray-200); padding: 3px; border-radius: 8px; height: 34px; }
  .toggle-btn { flex: 1; border: none; background: transparent; font-size: 11px; font-weight: 700; color: var(--gray-600); cursor: pointer; border-radius: 5px; transition: all 0.2s; }
  .toggle-btn.active { background: white; color: var(--navy); box-shadow: var(--shadow-sm); }

  .table-container { background: var(--gray-50); border-radius: 20px; padding: 0 0 16px; min-width: 0; }
  .table-header {
    display: grid;
    grid-template-columns: minmax(140px, 1.15fr) 85px 95px 80px 90px 100px 100px 110px;
    padding: 12px 20px;
    font-size: 8px;
    font-weight: 800;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--gray-200);
  }
  .row {
    display: grid;
    grid-template-columns: minmax(140px, 1.15fr) 85px 95px 80px 90px 100px 100px 110px;
    padding: 8px 20px;
    background: white;
    align-items: center;
    border-bottom: 1px solid var(--gray-50);
    transition: background 0.2s;
  }
  .row:first-of-type { border-radius: 20px 20px 0 0; }
  .row:hover { background: #fafafa; }

  .concepto-cell { display: flex; align-items: center; gap: 14px; }
  .icon-bg { 
    width: 40px; 
    height: 40px; 
    border-radius: 12px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  .icon-bg.building { background: #EEF2FF; color: #4338ca; }
  .icon-bg.bolt { background: #FFF7ED; color: #ea580c; }
  .icon-bg.cloud { background: #ECFDF5; color: #059669; }
  .icon-bg.default { background: var(--gray-100); color: var(--gray-500); }
  
  .concepto-info { display: flex; flex-direction: column; gap: 2px; }
  .concepto-text { font-size: 13px; font-weight: 700; color: var(--navy); line-height: 1.2; }
  .concepto-subtext { font-size: 10px; font-weight: 600; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.02em; }
  
  .concepto-text { font-size: 13px; font-weight: 700; color: var(--navy); }
  .monto-text { font-size: 13px; font-weight: 800; color: var(--navy); }
  .fecha-text { font-size: 11px; color: var(--gray-500); }
  
  .badge { padding: 3px 8px; border-radius: 20px; font-size: 9px; font-weight: 800; text-transform: uppercase; display: inline-flex; align-items: center; gap: 4px; }
  .badge::before { content: ''; width: 4px; height: 4px; border-radius: 50%; }
  .badge-cubierto { background: #DCFCE7; color: #166534; }
  .badge-cubierto::before { background: #22c55e; }
  .badge-no-cubierto { background: #FEE2E2; color: #991b1b; }
  .badge-no-cubierto::before { background: #ef4444; }

  .persona-text { font-size: 12px; color: var(--gray-600); font-weight: 500; }

  .actions-cell { display: flex; gap: 8px; justify-content: flex-end; }
  .btn-action { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .btn-action svg { width: 16px; height: 16px; }
  .btn-edit { background: var(--gray-100); color: var(--navy); }
  .btn-del { background: #FEE2E2; color: #991b1b; }

  .footer-info { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; margin-top: 8px; }
  .count-info { font-size: 12px; color: var(--gray-500); }
  .pagination { display: flex; gap: 6px; }
  .page-num { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid var(--gray-200); font-size: 12px; font-weight: 600; cursor: pointer; }
  .page-num.active { background: var(--navy); color: white; border-color: var(--navy); }

  /* Right Panel: Stats & Tips */
  .right-panel { display: flex; flex-direction: column; gap: 24px; }
  
  .stats-card { background: #0B192C; border-radius: 20px; padding: 32px; color: white; position: relative; overflow: hidden; }
  .stats-card h3 { font-size: 11px; font-weight: 800; color: #818CF8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
  .total-value { font-size: 36px; font-weight: 800; margin-bottom: 8px; }
  .total-label { font-size: 13px; color: #94a3b8; font-weight: 500; }
  
  .stat-row { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
  .stat-item { display: flex; flex-direction: column; gap: 4px; }
  .stat-num { font-size: 18px; font-weight: 700; }
  .stat-name { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }

  .banner-tip { background: var(--gray-50); border-radius: 20px; padding: 24px; display: flex; gap: 16px; align-items: flex-start; }
  .banner-icon { width: 40px; height: 40px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4338ca; box-shadow: var(--shadow-sm); }
  .banner-content h4 { font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 8px; }
  .banner-content p { font-size: 13px; color: var(--gray-500); line-height: 1.6; }

  /* Responsive Styles */
  @media (max-width: 1280px) {
    .content-grid { grid-template-columns: 1fr; gap: 32px; }
    .right-panel { order: 2; }
  }

  @media (max-width: 1024px) {
    .search-panel { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .header-left h1 { font-size: 28px; }
    .main { padding: 24px; }
  }

  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    .main { padding: 20px; }
    .page-header { flex-direction: column; align-items: stretch; gap: 20px; }
    .header-left p { white-space: normal; }
    
    .search-panel { grid-template-columns: 1fr; }
    .btn-añadir { width: 100%; justify-content: center; }

    /* Table to Cards */
    .table-header { display: none; }
    .table-container { background: transparent; padding: 0; }
    .row {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      padding: 20px;
      background: white;
      border-radius: 16px;
      margin-bottom: 20px;
      border: 1px solid var(--gray-100);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .row > div { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      width: 100%;
      padding: 4px 0;
    }
    .row > div::before {
      content: attr(data-label);
      font-size: 10px;
      font-weight: 800;
      color: var(--gray-400);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .concepto-cell { 
      width: 100%; 
      border-bottom: 1px solid var(--gray-50); 
      padding-bottom: 16px !important; 
      margin-bottom: 4px;
      justify-content: flex-start !important;
    }
    .concepto-cell::before { display: none; }
    
    .actions-cell {
      justify-content: center !important;
      padding-top: 16px !important;
      margin-top: 8px;
      border-top: 1px solid var(--gray-50);
      gap: 24px !important;
    }
    .actions-cell::before { display: none; }
  }
`;
