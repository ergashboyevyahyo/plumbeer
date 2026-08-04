import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const dir = path.resolve('public/images')
const maxDim = 1600

for (const file of readdirSync(dir)) {
  const filePath = path.join(dir, file)
  const before = statSync(filePath).size
  const ext = path.extname(file).toLowerCase()
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
    .toBuffer()

  let out
  if (ext === '.webp') {
    out = await sharp(buffer).webp({ quality: 75 }).toBuffer()
  } else {
    out = await sharp(buffer).jpeg({ quality: 75, mozjpeg: true }).toBuffer()
  }

  await sharp(out).toFile(filePath + '.tmp')
  const fs = await import('node:fs/promises')
  await fs.rename(filePath + '.tmp', filePath)

  const after = statSync(filePath).size
  console.log(`${file}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`)
}
