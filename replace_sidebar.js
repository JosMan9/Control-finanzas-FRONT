const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/josem/OneDrive/Desktop/Front control finanzas/Control-finanzas-FRONT/src/components/';

const filesToUpdate = [
  { file: 'tipoGasto/tablaTipoGasto.js', menu: 'tipoGasto' },
  { file: 'status/tablaStatus.js', menu: 'status' },
  { file: 'quincena/tablaQuincena.js', menu: 'quincena' },
  { file: 'periodicidad/tablaPeriodicidad.js', menu: 'periodicidad' },
  { file: 'mes/tablaMes.js', menu: 'mes' }
];

filesToUpdate.forEach(({file, menu}) => {
  const fullPath = path.join(basePath, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Custom regex to grab from <div class="left-sidebar"> until <div class="main">
  // Since we also have <div class="sidebar-footer"> inside, we can just match <div class="left-sidebar">.*<div class="main">
  const regex = /<div class="left-sidebar">[\s\S]*?<\/div>\s*<\/div>\s*<div class="main">/m;
  
  if (regex.test(content)) {
    content = content.replace(regex, `<sidebar-menu activeMenu="${menu}"></sidebar-menu>\n\n        <div class="main">`);
    fs.writeFileSync(fullPath, content);
    console.log('Updated JS HTML for: ' + file);
  } else {
    console.log('Regex not matched for: ' + file);
  }
});

const cssFilesToUpdate = [
  'tipoGasto/tablaTipoGasto.styles.js',
  'status/tablaStatus.styles.js',
  'quincena/tablaQuincena.styles.js',
  'periodicidad/tablaPeriodicidad.styles.js',
  'mes/tablaMes.styles.js'
];

cssFilesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  // We'll just remove the desktop block and mobile block for left-sidebar.
  const regexDesktop = /\/\* Left Sidebar \*\/[\s\S]*?(?=\/\* Main)/m;
  content = content.replace(regexDesktop, '');

  // Remove logo and nav properties from media query
  content = content.replace(/\.left-sidebar \{[^\}]+\}/g, '');
  content = content.replace(/\.logo-container \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-menu \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-menu::-webkit-scrollbar \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-item \{[^\}]+\}/g, '');
  content = content.replace(/\.sidebar-footer \{[^\}]+\}/g, '');

  fs.writeFileSync(fullPath, content);
  console.log('Updated CSS for: ' + file);
});
