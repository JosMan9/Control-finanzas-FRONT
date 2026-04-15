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
  
  const regex = /<div class="left-sidebar">[\s\S]*?<\/div>(\s*)<\/div>(\s*)<div class="main">/m;
  
  if (regex.test(content)) {
    content = content.replace(regex, `<sidebar-menu activeMenu="${menu}"></sidebar-menu>$2<div class="main">`);
    fs.writeFileSync(fullPath, content);
    console.log('Updated JS HTML for: ' + file);
  } else {
    // try slightly different regex
    const regex2 = /<div class="left-sidebar">[\s\S]*?<div class="sidebar-footer">[\s\S]*?<\/div>\s*<\/div>\s*<div class="main">/m;
    if (regex2.test(content)) {
        content = content.replace(regex2, `<sidebar-menu activeMenu="${menu}"></sidebar-menu>\n\n        <div class="main">`);
        fs.writeFileSync(fullPath, content);
        console.log('Updated JS HTML for (regex2): ' + file);
    } else {
        console.log('Regex not matched for: ' + file);
    }
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
  const regexDesktop = /\/\* Left Sidebar \*\/[\s\S]*?(?=\/\* Main)/m;
  content = content.replace(regexDesktop, '');

  content = content.replace(/\.left-sidebar \{[^\}]+\}/g, '');
  content = content.replace(/\.logo-container \{[^\}]+\}/g, '');
  content = content.replace(/\.logo-container h2 \{[^\}]+\}/g, '');
  content = content.replace(/\.logo-subtitle \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-menu \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-menu::-webkit-scrollbar \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-item \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-item:hover \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-item\.active \{[^\}]+\}/g, '');
  content = content.replace(/\.nav-item svg \{[^\}]+\}/g, '');
  content = content.replace(/\.sidebar-footer \{[^\}]+\}/g, '');
  content = content.replace(/\.btn-nuevo-gasto \{[^\}]+\}/g, '');
  content = content.replace(/\.btn-logout \{[^\}]+\}/g, '');

  fs.writeFileSync(fullPath, content);
  console.log('Updated CSS for: ' + file);
});
