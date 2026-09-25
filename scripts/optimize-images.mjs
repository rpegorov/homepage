// После `next build`: уменьшает картинки блога в out/blog-assets до 1600 px по
// ширине (колонка текста 680 px, запас на Retina) и пережимает без потерь.
// Исходники в public/blog-assets не трогаются: их сверяет с вложениями Drafta
// publisher, и изменённый файл он перезаписал бы оригиналом.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'out/blog-assets')
const MAX_WIDTH = 1600

function* walk(d) {
  if (!fs.existsSync(d)) return
  for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) yield p
  }
}

let before = 0
let after = 0
for (const file of walk(dir)) {
  const input = fs.readFileSync(file)
  const image = sharp(input).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true
  })
  const ext = path.extname(file).toLowerCase()
  const output = await (ext === '.png'
    ? image.png({ compressionLevel: 9, effort: 10 })
    : ext === '.webp'
    ? image.webp({ quality: 85 })
    : image.jpeg({ quality: 85, mozjpeg: true })
  ).toBuffer()
  before += input.length
  // Пережатый файл бывает больше исходника (уже сжатая мелочь) — тогда оставляем как есть.
  if (output.length < input.length) {
    fs.writeFileSync(file, output)
    after += output.length
  } else {
    after += input.length
  }
}
console.log(
  `blog images: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(
    1
  )} MB`
)
