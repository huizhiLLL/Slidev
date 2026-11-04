import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path) => readFile(resolve(root, path), 'utf8')
const main = await read('slides.md')
const appendix = await read('appendix.md')
const { parse } = await import('@slidev/parser')
const mainDeck = await parse(main, resolve(root, 'slides.md'))
const appendixDeck = await parse(appendix, resolve(root, 'appendix.md'))
assert.equal(mainDeck.slides.length, 7, '主体必须恰为七页')
assert.equal(appendixDeck.slides.length, 5, '备用资料应为五页独立入口')

let duration = 0
for (const [index, slide] of mainDeck.slides.entries()) {
  const seconds = slide.note?.match(/用时：(\d+) 秒/)
  assert.ok(seconds, `第 ${index + 1} 页缺少时间预算`)
  duration += Number(seconds[1])
  assert.ok(slide.content.includes(`<DeckFooter page="0${index + 1}"`), '主体页码不一致')
}
assert.equal(duration, 420, '讲述预算应为七分钟')
assert.ok(mainDeck.slides[4].content.includes('name="overview"'), '第 5 页必须展示原型主界面')
assert.ok(mainDeck.slides[5].content.includes('ResearchRoadmap'), '第 6 页必须展示后续工作路线')

for (const file of ['misans-regular.woff2', 'misans-semibold.woff2', 'noto-serif-sc-subset.woff2']) {
  const info = await stat(resolve(root, 'public/fonts', file))
  assert.ok(info.size > 1000, `字体文件不完整：${file}`)
}

const source = await read('assets.ts')
const images = [...source.matchAll(/src: '(images\/[^']+)'/g)].map(m => m[1])
assert.equal(images.length, 3, '应使用三张真实素材，原型合并为一张完整截图')
const present = await readdir(resolve(root, 'public/images'))
const missing = images.filter(path => !present.includes(path.slice('images/'.length)))
console.log(`结构检查通过：主体 ${mainDeck.slides.length} 页，备用 ${appendixDeck.slides.length} 页，讲稿预算 ${duration / 60} 分钟。`)
console.log(`本地字体通过：3 个 WOFF2 文件。真实素材已提供 ${images.length - missing.length}/${images.length}。`)
if (missing.length) console.log(`以下素材正常显示占位：\n${missing.map(p => `  ${p}`).join('\n')}`)
