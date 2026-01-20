/**
 * Script para generar favicons desde SVG
 * Usa sharp (incluido en Next.js) para conversión
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(svgPath);

  // Generar apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated: apple-touch-icon.png (180x180)');

  // Generar favicon-32x32.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Generated: favicon-32x32.png (32x32)');

  // Generar favicon-16x16.png
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Generated: favicon-16x16.png (16x16)');

  // Generar icon-192.png para PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated: icon-192.png (192x192)');

  // Generar icon-512.png para PWA
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated: icon-512.png (512x512)');

  // Para favicon.ico, usamos el PNG de 32x32
  // Los navegadores modernos aceptan PNG como favicon
  fs.copyFileSync(
    path.join(publicDir, 'favicon-32x32.png'),
    path.join(publicDir, 'favicon.ico')
  );
  console.log('Generated: favicon.ico (copied from 32x32 PNG)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
