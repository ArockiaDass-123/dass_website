const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const src = path.join(__dirname, '..', 'public', 'assets', 'Gemini_Generated_Image_54n12g54n12g54n1.png')
const outDir = path.join(__dirname, '..', 'public', 'assets')

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src)
  process.exit(1)
}

const sizes = [480, 768, 1024, 1440]

async function run() {
  for (const size of sizes) {
    const outWebp = path.join(outDir, `Gemini_Generated_Image_54n12g54n12g54n1-${size}.webp`)
    await sharp(src)
      .resize({ width: size })
      .webp({ quality: 80 })
      .toFile(outWebp)
    console.log('Written', outWebp)

    const outAvif = path.join(outDir, `Gemini_Generated_Image_54n12g54n12g54n1-${size}.avif`)
    await sharp(src)
      .resize({ width: size })
      .avif({ quality: 60 })
      .toFile(outAvif)
    console.log('Written', outAvif)
  }

  // also write an optimized full-width webp
  const outFull = path.join(outDir, `Gemini_Generated_Image_54n12g54n12g54n1.webp`)
  await sharp(src).webp({ quality: 80 }).toFile(outFull)
  console.log('Written', outFull)
}

run().catch(err => { console.error(err); process.exit(1) })
