import { css } from 'lit';

export const tablaGastoTarjetaStyles = css`
    :host {
  display: block;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn-agregar {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}
.btn-agregar:hover {
  background-color: #2563eb;
}
.btn-agregar:active {
  background-color: #1d4ed8;
}
h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #111827;
}
th {
  background: #f9fafb;
  color: #6b7280;
  font-weight: 600;
}
tbody tr:hover {
  background: #fafafa;
}
.acciones {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
}
.btn-editar,
.btn-eliminar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-editar:hover {
  background-color: #eff6ff;
  transform: scale(1.1);
}
.btn-eliminar:hover {
  background-color: #fef2f2;
  transform: scale(1.1);
}
.btn-editar:active,
.btn-eliminar:active {
  transform: scale(0.95);
}
.empty {
  text-align: center;
  color: #6b7280;
  padding: 20px 8px;
  font-size: 14px;
}
.skeleton {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.badge-mio {
  background-color: #dbeafe;
  color: #1e40af;
}
.badge-no-mio {
  background-color: #f3f4f6;
  color: #4b5563;
}


`;

