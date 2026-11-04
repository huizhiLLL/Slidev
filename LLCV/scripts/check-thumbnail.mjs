import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes, createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(resolve(root, 'package.json'))
const vueUrl = pathToFileURL(require.resolve('vue')).href
const syncPath = resolve(dirname(require.resolve('@slidev/client/package.json')), 'state/syncState.ts')
const syncSource = stripTypeScriptTypes(await readFile(syncPath, 'utf8'))
  .replace("from 'vue'", `from '${vueUrl}'`)
const setupSource = (await readFile(resolve(root, 'setup/root.ts'), 'utf8'))
  .replace(/^import .*\r?\n/gm, '')
  .replace('export default function setup()', 'return function setup()')

// Exercise the installed Slidev sync implementation without launching a browser.
globalThis.__SLIDEV_HAS_SERVER__ = false
class Channel {
  closed = false
  listener
  constructor() { channels.push(this) }
  addEventListener(_, listener) { this.listener = listener }
  postMessage() {}
  close() { this.closed = true }
  receive(data) { if (!this.closed) this.listener({ data }) }
}
let channels = []
globalThis.BroadcastChannel = Channel
const { nextTick } = await import(vueUrl)

for (const search of ['?embedded=true&thumbnail=true', '?embedded=true', '']) {
  channels = []
  const sync = await import(`data:text/javascript;base64,${Buffer.from(syncSource).toString('base64')}#${encodeURIComponent(search)}`)
  const mounted = []
  const setup = new Function('onMounted', 'disableBuiltinSync', 'window', setupSource)(
    callback => mounted.push(callback), sync.disableBuiltinSync, { location: { search } },
  )
  setup()
  const shared = sync.createSyncState({}, { page: 1 })
  shared.init('thumbnail-regression')
  assert.equal(channels.length, 1)
  for (const callback of mounted) callback()
  channels[0].receive({ page: 5 })
  await nextTick()
  const thumbnail = search.includes('thumbnail=true')
  assert.equal(channels[0].closed, thumbnail, `同步通道关闭状态错误：${search}`)
  assert.equal(shared.state.page, thumbnail ? 1 : 5, `预览隔离或正常同步失败：${search}`)
  sync.disableBuiltinSync()
}
console.log('封面同步检查通过：缩略图保持第一页，普通嵌入与演示保留同步。')
