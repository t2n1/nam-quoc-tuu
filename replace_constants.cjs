const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'constants.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('export const APP_NAME = "Rượu Men Lá Bằng Phúc";', 'export const APP_NAME = "Rượu Nam Quốc Tửu";');
content = content.replace('defaultTitle: "Rượu Men Lá Bằng Phúc | Tinh Hoa Đại Ngàn",', 'defaultTitle: "Rượu Nam Quốc Tửu | Tinh Hoa Đại Ngàn",');
content = content.replace('rượu bằng phúc', 'rượu nam quốc tửu');
content = content.replace('logoText: "Bằng Phúc",', 'logoText: "Nam Quốc Tửu",');
content = content.replace('mainTitle: "Bằng Phúc",', 'mainTitle: "Nam Quốc Tửu",');
content = content.replace('Men Lá Bằng Phúc không chỉ', 'Nam Quốc Tửu không chỉ');
content = content.replace('quan tâm về Bằng Phúc."', 'quan tâm về Nam Quốc Tửu."');
content = content.replace('thương hiệu Bằng Phúc."', 'thương hiệu Nam Quốc Tửu."');
content = content.replace('Rượu Men Lá Bằng Phúc đã khẳng định', 'Rượu Nam Quốc Tửu đã khẳng định');
content = content.replace('subtitle: "Bằng Phúc",', 'subtitle: "Nam Quốc Tửu",');
content = content.replace('Rượu Men Lá Bằng Phúc hiện đại', 'Rượu Nam Quốc Tửu hiện đại');
content = content.replace('hương vị men lá Bằng Phúc dần chinh phục', 'hương vị Nam Quốc Tửu dần chinh phục');
content = content.replace('HTX Rượu Men Lá Bằng Phúc tự hào', 'HTX Rượu Nam Quốc Tửu tự hào');
content = content.replace('titleHighlight: "Bằng Phúc",', 'titleHighlight: "Nam Quốc Tửu",');
content = content.replace('copyright: "HTX Rượu Men Lá Bằng Phúc. All rights reserved.",', 'copyright: "HTX Rượu Nam Quốc Tửu. All rights reserved.",');
content = content.replace('title: "Bằng Phúc đạt chuẩn', 'title: "Nam Quốc Tửu đạt chuẩn');
content = content.replace('question: "Rượu Men Lá Bằng Phúc có gây', 'question: "Rượu Nam Quốc Tửu có gây');

fs.writeFileSync(filePath, content, 'utf8');
console.log('constants.ts updated successfully');
