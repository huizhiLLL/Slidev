import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const project = resolve(root, 'LLCV')
const output = resolve(root, 'dist')
const npm = process.env.npm_execpath
if (!npm) throw new Error('请使用 npm run build 构建集合站点。')

function run(args) {
  const result = spawnSync(process.execPath, [npm, ...args], {
    cwd: project,
    stdio: 'inherit',
    env: process.env,
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Install the deck's locked dependencies even if the host sets NODE_ENV=production.
run(['ci', '--include=dev', '--no-audit', '--no-fund'])
run(['run', 'build:main', '--', '--base', '/llcv/'])
run(['run', 'build:appendix', '--', '--base', '/llcv/appendix/'])

// Only this fixed, ignored collection output directory is replaced.
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await cp(resolve(project, 'dist/main'), resolve(output, 'llcv'), { recursive: true })
await cp(resolve(project, 'dist/appendix'), resolve(output, 'llcv/appendix'), { recursive: true })
for (const file of ['index.html', '404.html', '_redirects']) {
  await cp(resolve(root, file), resolve(output, file))
}
console.log('\n集合站点构建完成：dist/，主体 /llcv/，备用 /llcv/appendix/。')
