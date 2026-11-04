import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'dist')
const read = path => readFile(resolve(output, path), 'utf8')
const home = await read('index.html')
assert.ok(home.includes("<title>huizhi's Slidev</title>"))
assert.ok(home.includes('href="/llcv/"'))
assert.ok(home.includes('src="/llcv/1?embedded=true&amp;thumbnail=true"'))
assert.ok(home.includes('datetime="2026-11-04"'))
assert.equal(await read('404.html'), await readFile(resolve(root, '404.html'), 'utf8'))

for (const base of ['llcv', 'llcv/appendix']) {
  const html = await read(`${base}/index.html`)
  const scriptSources = [...html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)].map(match => match[1])
  assert.ok(scriptSources.some(path => path.startsWith(`/${base}/assets/`)), `${base} 缺少正确 base 的入口资源`)
  for (const path of scriptSources) {
    assert.ok(path.startsWith(`/${base}/`), `${base} 有资源落到错误路径：${path}`)
    await stat(resolve(output, path.slice(1)))
  }
  const assetDir = resolve(output, base, 'assets')
  const cssFiles = (await readdir(assetDir)).filter(file => file.endsWith('.css'))
  const styles = (await Promise.all(cssFiles.map(file => readFile(resolve(assetDir, file), 'utf8')))).join('\n')
  for (const file of ['misans-regular.woff2', 'misans-semibold.woff2', 'noto-serif-sc-subset.woff2']) {
    assert.ok(styles.includes(`/${base}/fonts/${file}`), `字体没有按 ${base} 构建：${file}`)
    await stat(resolve(output, base, 'fonts', file))
  }
}

// Check the published rules as ordered Cloudflare path patterns, including asset bypass.
const rules = (await read('_redirects')).split(/\r?\n/)
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => {
    const [source, destination, code] = line.trim().split(/\s+/)
    const pattern = source.split('/').map(segment => segment.startsWith(':') ? '[^/]+' : segment).join('/')
    return { pattern: new RegExp(`^${pattern}$`), destination, code: Number(code) }
  })
const match = path => rules.find(rule => rule.pattern.test(path))
for (const [path, destination, code] of [
  ['/llcv', '/llcv/', 301],
  ['/llcv/appendix', '/llcv/appendix/', 301],
  ['/llcv/1', '/llcv/', 200],
  ['/llcv/7', '/llcv/', 200],
  ['/llcv/8', '/llcv/', 200],
  ['/llcv/presenter/3', '/llcv/', 200],
  ['/llcv/overview', '/llcv/', 200],
  ['/llcv/appendix/2', '/llcv/appendix/', 200],
  ['/llcv/appendix/presenter/2', '/llcv/appendix/', 200],
]) {
  const rule = match(path)
  assert.equal(rule?.destination, destination, `路由目标错误：${path}`)
  assert.equal(rule.code, code)
}
for (const path of ['/', '/unknown', '/llcv/assets/index.js', '/llcv/fonts/misans-regular.woff2', '/llcv/images/input-oblique.png', '/llcv/appendix/assets/index.js']) {
  assert.equal(match(path), undefined, `真实资源或集合路由被错误重写：${path}`)
}
console.log('站点检查通过：首页、主／备用 base、入口资源、三套字体引用、深链规则与静态资源绕过。')
