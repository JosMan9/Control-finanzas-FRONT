import { css } from "lit";

export const tablaMesStyles = css`
  :host {
    display: block;
    font-family: "Inter", system-ui, sans-serif;
    --navy: #0F172A; /* LendorP dark blue */
    --green: #22c55e;
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
    --radius: 12px;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .layout {
    display: flex;
    min-height: 100vh;
    background: white; /* entire app background might be white/gray */
  }

  /* Main Content */
  .main {
    flex: 1;
    padding: 32px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: white;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-header-text h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.02em;
  }
  .page-header-text p {
    font-size: 14px;
    color: var(--gray-500);
    margin-top: 4px;
  }
  .top-bar { display: flex; justify-content: flex-end; align-items: center; gap: 40px; }
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

  .banner {
    background: #F8FAFC; 
    border-radius: 16px;
    padding: 32px;
  }
  .banner-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #10B981;
    margin-bottom: 12px;
  }
  .banner h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 12px;
  }
  .banner p {
    font-size: 15px;
    color: var(--gray-600);
    line-height: 1.6;
    max-width: 600px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .mes-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Soft shadow as in reference */
    transition: box-shadow 0.15s, transform 0.15s;
    cursor: grab;
  }
  .mes-card:active {
    cursor: grabbing;
  }
  .mes-card:hover {
    box-shadow: var(--shadow-md);
  }
  .mes-card.drag-over {
    border: 2px dashed var(--navy);
    background: var(--gray-50);
    opacity: 0.6;
    transform: scale(0.98);
  }
  .mes-card.dragging {
    opacity: 0.4;
  }
  .card-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--navy);
  }
  .card-actions {
    display: flex;
    gap: 12px;
  }
  .btn-edit, .btn-delete {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }
  .btn-edit { background: var(--gray-100); color: var(--navy); }
  .btn-edit:hover { background: var(--gray-200); }
  .btn-delete { background: var(--red-bg); color: var(--red); }
  .btn-delete:hover { background: #fecaca; }

  .add-card {
    background: var(--gray-50);
    border: 1px dashed var(--gray-300);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    min-height: 104px;
    transition: background 0.15s;
  }
  .add-card:hover { background: white; border-color: var(--navy); }
  .add-card .plus {
    width: 24px; height: 24px;
    background: var(--gray-200);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--navy); font-weight: bold;
  }
  .add-card span { font-size: 13px; font-weight: 700; color: var(--navy); }

  /* Modal styles */
  .overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,0.4);
    display: flex; align-items: center; justify-content: center; z-index: 1000;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: white; border-radius: 20px; width: 100%; max-width: 400px; padding: 32px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: slideUp 0.2s ease;
  }
  @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .modal-header h3 { font-size: 18px; font-weight: 700; color: var(--navy); }
  .btn-close {
    background: var(--gray-100); border: none; border-radius: 10px; width: 32px; height: 32px;
    font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: var(--gray-500); transition: background 0.15s;
  }
  .btn-close:hover { background: var(--gray-200); }
  .form-group { margin-bottom: 20px; }
  .form-group label {
    display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--gray-600); margin-bottom: 8px;
  }
  .form-group input {
    width: 100%; padding: 12px 16px; background: var(--gray-50); border: 1.5px solid var(--gray-200);
    border-radius: 12px; font-size: 14px; color: var(--navy); outline: none; font-family: inherit;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .form-group input:focus { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(11,25,44,0.08); background: white; }
  .input-error { border-color: var(--red) !important; }
  .error-text { font-size: 12px; color: var(--red); margin-top: 6px; }
  .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
  .btn-cancel {
    flex: 1; padding: 12px; background: var(--gray-100); border: none; border-radius: 10px;
    font-size: 14px; font-weight: 600; color: var(--gray-700); cursor: pointer; font-family: inherit;
  }
  .btn-cancel:hover { background: var(--gray-200); }
  .btn-save {
    flex: 2; padding: 12px; background: #0B192C; color: white; border: none;
    border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit;
  }
  .btn-save:hover { opacity: 0.9; }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
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
    
    
    
    
    
    
    .cards-grid {
      grid-template-columns: 1fr;
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
    .page-header-text h1 {
      font-size: 20px;
    }
    .banner {
      padding: 24px;
    }
    .banner h2 {
      font-size: 20px;
    }
  }
`;
