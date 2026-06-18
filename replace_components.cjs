const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'components/AISommelier.tsx',
  'components/EliteClub.tsx',
  'components/Navbar.tsx',
  'components/Preloader.tsx',
  'components/SEOMetadata.tsx',
  'components/admin/AdminLayout.tsx',
  'pages/Traceability.tsx',
  'pages/admin/Login.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Perform replacements
    content = content.replace(/Rượu Men Lá Bằng Phúc/g, 'Rượu Nam Quốc Tửu');
    content = content.replace(/Bằng Phúc Sommelier/g, 'Nam Quốc Tửu Sommelier');
    content = content.replace(/Bằng Phúc \\n<br\/>/g, 'Nam Quốc Tửu \\n<br/>'); // Adjust for EliteClub if needed
    content = content.replace(/Bằng Phúc <br\/>/g, 'Nam Quốc Tửu <br/>');
    content = content.replace(/>Bằng Phúc<\/span>/g, '>Nam Quốc Tửu</span>');
    content = content.replace(/'Bằng Phúc'/g, "'Nam Quốc Tửu'");
    content = content.replace(/>Bằng Phúc\./g, '>Nam Quốc Tửu.');
    content = content.replace(/Bằng Phúc Heritage/g, 'Nam Quốc Tửu Heritage');
    content = content.replace(/>Bằng Phúc</g, '>Nam Quốc Tửu<');
    content = content.replace(/HTX Bằng Phúc/g, 'HTX Nam Quốc Tửu');
    content = content.replace(/nội dung Bằng Phúc/g, 'nội dung Nam Quốc Tửu');
    content = content.replace(/Bằng Phúc</g, 'Nam Quốc Tửu<');
    content = content.replace(/Bằng Phúc\s*$/gm, 'Nam Quốc Tửu');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file} updated successfully`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
