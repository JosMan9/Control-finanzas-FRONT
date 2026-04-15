import { css } from 'lit';

export const sidebarMenuStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 260px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .left-sidebar {
    width: 100%;
    flex: 1;
    background: var(--gray-50, #f8fafc);
    display: flex;
    flex-direction: column;
    padding: 0;
    border-right: 1px solid var(--gray-200, #e2e8f0);
  }
  .logo-container {
    padding: 32px 24px 24px;
  }
  .logo-container h2 {
    font-size: 24px;
    color: var(--navy, #0B192C);
    margin-bottom: 2px;
    font-weight: 800;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-container h2 svg {
    width: 28px;
    height: 28px;
    color: #4338ca;
  }
  .logo-subtitle {
    font-size: 11px;
    color: var(--gray-500, #64748b);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .nav-header {
    font-size: 11px;
    font-weight: 800;
    color: var(--gray-400, #94a3b8);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 24px 16px 8px;
  }

  .nav-menu {
    flex: 1; /* This will grow and push the footer down */
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 12px;
    margin-top: 8px;
    overflow-y: auto; /* Allow menu to scroll if too many items */
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 10px;
    color: var(--gray-600, #475569);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
  }
  .nav-item:hover {
    background: var(--gray-100, #f1f5f9);
    color: var(--navy, #0B192C);
  }
  .nav-item.active {
    background: white;
    color: #4338ca;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  }
  .nav-item svg { width: 20px; height: 20px; color: currentcolor; opacity: 0.85; }

  .sidebar-footer {
    padding: 16px 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid var(--gray-100, #f1f5f9);
  }
  .btn-nuevo-gasto {
    background: #0B192C;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(11, 25, 44, 0.15);
  }
  .btn-logout, .btn-settings {
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: none;
    color: var(--gray-500, #64748b);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 10px 16px;
    width: 100%;
    border-radius: 8px;
    transition: all 0.2s;
  }
  .btn-logout:hover, .btn-settings:hover {
    background: var(--gray-100);
    color: var(--navy);
  }
  .btn-logout svg, .btn-settings svg {
    width: 18px;
    height: 18px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .btn-logout:hover svg, .btn-settings:hover svg {
    opacity: 1;
  }

  /* Responsive Settings */
  @media (max-width: 768px) {
    :host {
      width: 100%;
      height: auto;
    }
    .left-sidebar { 
      width: 100%; 
      height: auto; 
      flex-direction: column; 
    }
    .logo-container { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 16px 24px; 
    }
    .nav-menu { 
      display: flex; 
      flex-direction: row; 
      overflow-x: auto; 
      padding: 0 16px 16px; 
      margin-top: 0; 
      gap: 8px; 
    }
    .nav-menu::-webkit-scrollbar { display: none; }
    .nav-item { white-space: nowrap; padding: 8px 12px; }
    .sidebar-footer { display: none; }
  }
`;
