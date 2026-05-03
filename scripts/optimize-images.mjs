import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'src', 'assets', 'source');
const outputDir = path.join(root, 'public', 'assets', 'images');

const variants = [
  {
    input: 'runner-power.jpg',
    outputs: [
      { name: 'hero-runner-power-desktop', width: 1920, height: 1080, fit: 'cover', position: 'center' },
      { name: 'hero-runner-power-mobile', width: 860, height: 1180, fit: 'cover', position: 'center' },
      { name: 'card-hybrid-pack', width: 720, height: 920, fit: 'cover', position: 'center' },
      { name: 'about-nahuel', width: 820, height: 980, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'track-sprint.jpg',
    outputs: [
      { name: 'hero-track-sprint-desktop', width: 1920, height: 1080, fit: 'cover', position: 'center' },
      { name: 'hero-track-sprint-mobile', width: 860, height: 1180, fit: 'cover', position: 'center' },
      { name: 'card-hybrid-1', width: 720, height: 920, fit: 'cover', position: 'center' },
      { name: 'card-10k-avanzado', width: 720, height: 920, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'stairs-run.jpg',
    outputs: [
      { name: 'hero-stairs-run-desktop', width: 1920, height: 1080, fit: 'cover', position: 'center' },
      { name: 'hero-stairs-run-mobile', width: 860, height: 1180, fit: 'cover', position: 'center' },
      { name: 'mentor-nahuel', width: 850, height: 1080, fit: 'cover', position: 'center' },
      { name: 'card-hybrid-2', width: 720, height: 920, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'outdoor-strength.jpg',
    outputs: [
      { name: 'hero-outdoor-strength-desktop', width: 1920, height: 1080, fit: 'cover', position: 'center' },
      { name: 'hero-outdoor-strength-mobile', width: 860, height: 1180, fit: 'cover', position: 'center' },
      { name: 'card-hybrid-3', width: 720, height: 920, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'barbell-gym.jpg',
    outputs: [
      { name: 'card-hypertrophy', width: 720, height: 920, fit: 'cover', position: 'center' },
      { name: 'card-powerbuilding', width: 720, height: 920, fit: 'cover', position: 'center' },
      { name: 'cta-bg', width: 1920, height: 760, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'city-run.jpg',
    outputs: [
      { name: 'card-10k-inicial', width: 720, height: 920, fit: 'cover', position: 'center' }
    ]
  },
  {
    input: 'running-stairs-close.jpg',
    outputs: [
      { name: 'card-10k-intermedio', width: 720, height: 920, fit: 'cover', position: 'center' }
    ]
  }
];

await mkdir(outputDir, { recursive: true });

const existing = await readdir(sourceDir).catch(() => []);
if (!existing.length) {
  throw new Error(`No source images found in ${sourceDir}`);
}

const results = [];

for (const group of variants) {
  const inputPath = path.join(sourceDir, group.input);
  await stat(inputPath);

  for (const output of group.outputs) {
    const base = sharp(inputPath)
      .rotate()
      .resize({
        width: output.width,
        height: output.height,
        fit: output.fit,
        position: output.position,
        withoutEnlargement: true
      })
      .modulate({ saturation: 0.9 })
      .sharpen({ sigma: 0.3 });

    const avifPath = path.join(outputDir, `${output.name}.avif`);
    const webpPath = path.join(outputDir, `${output.name}.webp`);

    await base.clone().avif({ quality: 47, effort: 6 }).toFile(avifPath);
    await base.clone().webp({ quality: 72, effort: 5 }).toFile(webpPath);

    const avifStat = await stat(avifPath);
    const webpStat = await stat(webpPath);
    results.push(`${output.name}: avif ${toKb(avifStat.size)}kb, webp ${toKb(webpStat.size)}kb`);
  }
}

console.log(results.join('\n'));

function toKb(bytes) {
  return Math.round(bytes / 1024);
}
