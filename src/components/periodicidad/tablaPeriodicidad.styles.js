import { css } from 'lit';

export const tablaPeriodicidadStyles = css`
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
    --navy: #0F172A; /* or #07153B */
    --green: #0F763E; /* matching design */
    --green-light: #10B981; 
    --red: #EF4444;
    --gray-50: #F8FAFC;
    --gray-100: #F1F5F9;
    --gray-200: #E2E8F0;
    --gray-300: #CBD5E1;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-900: #111827;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .layout { display: flex; min-height: 100vh; background: #ffffff; }

  /* Main Area */
  .main { flex: 1; padding: 32px 64px; display: flex; flex-direction: column; background: #ffffff; }

  .top-bar { display: flex; justify-content: flex-end; align-items: center; gap: 40px; margin-bottom: 40px; }
  .top-nav { display: flex; gap: 24px; font-size: 14px; font-weight: 600; color: var(--gray-500); }
  .top-nav span { cursor: pointer; }
  .top-nav span.active { color: var(--navy); }
  .avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; background: #eee; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }

  .page-header { margin-bottom: 40px; }
  .page-header h1 { font-size: 28px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 8px; }
  .page-header p { font-size: 15px; color: var(--gray-500); }

  .content-grid { display: grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: start; }

  /* Resumen Widget */
  .resumen-card { background: var(--gray-50); border-radius: 16px; padding: 32px 24px; display: flex; flex-direction: column; height: 100%; min-height: 280px; }
  .resumen-header { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; font-weight: 700; color: var(--navy); font-size: 15px; }
  .resumen-header svg { color: var(--green-light); width: 22px; height: 22px; }
  
  .stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 14px; color: var(--gray-600); }
  .stat-val { font-size: 20px; font-weight: 800; color: var(--navy); }
  
  .quote { margin-top: auto; font-size: 12px; color: var(--gray-500); line-height: 1.5; }

  /* Lista de periodicidades */
  .lista-section { flex: 1; }
  .lista-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .lista-header h2 { font-size: 18px; font-weight: 800; color: var(--navy); }
  .btn-add-schema { background: var(--green); color: white; border: none; border-radius: 8px; padding: 10px 16px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; }
  .btn-add-schema:hover { opacity: 0.9; }

  .schema-list { display: flex; flex-direction: column; gap: 16px; }
  .schema-card { background: white; border-radius: 10px; padding: 20px 24px; display: flex; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; position: relative; overflow: hidden; transition: box-shadow 0.2s, opacity 0.2s; }
  .schema-card.inactive { opacity: 0.55; }
  .schema-card:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
  
  .schema-card.active::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--green-light); }

  .schema-icon { width: 44px; height: 44px; background: var(--gray-50); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--navy); margin-right: 20px; }
  .schema-icon svg { width: 22px; height: 22px; }

  .schema-info { flex: 1; }
  .schema-title { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .schema-desc { font-size: 13px; color: var(--gray-500); }

  .schema-actions { display: flex; align-items: center; gap: 12px; margin-left: 20px; }
  .action-btn { background: none; border: none; color: var(--gray-400); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; transition: background 0.15s, color 0.15s; }
  .action-btn:hover { background: var(--gray-100); color: var(--navy); }
  .action-btn.del-btn:hover { background: #FEE2E2; color: var(--red); }
  
  /* Toggle Switch */
  .switch { position: relative; display: inline-block; width: 44px; height: 24px; margin-left: 12px;}
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--gray-200); transition: .3s; border-radius: 24px; }
  .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  input:checked + .slider { background-color: var(--green); }
  input:checked + .slider:before { transform: translateX(20px); }

  /* Bottom Banner */
  .banner-footer { margin-top: 40px; border-radius: 12px; overflow: hidden; position: relative; height: 220px; display: flex; align-items: flex-end; background: linear-gradient(135deg, #1C263A, #0F172A); margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  .banner-img-placeholder { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center/cover; opacity: 0.25; mix-blend-mode: luminosity; }
  .banner-content { position: relative; z-index: 2; padding: 40px 48px; color: white; max-width: 600px; }
  .banner-content h2 { font-size: 26px; font-weight: 800; margin-bottom: 8px; }
  .banner-content p { font-size: 14px; color: #818CF8; /* slight blue accent */ line-height: 1.5; }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    .main {
      padding: 24px;
    }
    .top-bar {
      gap: 20px;
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
    .page-header h1 {
      font-size: 20px;
    }
    .schema-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .schema-actions {
      width: 100%;
      justify-content: flex-end;
      margin-left: 0;
    }
    .banner-content {
      padding: 24px;
    }
    .banner-content h2 {
      font-size: 20px;
    }
  }
`;
