# Slidev 幻灯片集合

每套幻灯片放在独立目录中，根目录统一管理 Git、集合首页和部署。首页仅显示标题、项目首页缩略图、名称与日期。

| 项目 | 说明 | 入口 |
| --- | --- | --- |
| [LLCV](./LLCV/) | 魔方视觉识别 SITP 申报汇报，7 页主体，5 页独立备用页 | `/llcv/` · [使用说明](./LLCV/README.md) · [设计规范](./LLCV/design.md) |

## 运行 LLCV

需要 Node.js 22.13+，建议使用 Node.js 24 LTS。子项目使用 npm 与自己的 package-lock.json。

```powershell
npm --prefix LLCV ci
npm run dev
```

主体默认端口 3030，备用页用 `npm run dev:appendix` 在端口 3031 单独打开。

```powershell
npm run build
npm run check
npm run check:site
npm run preview
```

根构建自动执行子项目的锁定依赖安装，然后分别以 `/llcv/` 和 `/llcv/appendix/` 为 base 构建，最后汇总到 `dist/`。不要在部署面板把输出目录填成 LLCV/dist/main。

`npm run preview` 使用 Wrangler 4 的本地 Pages 服务预览最终产物，首次运行自动下载预览工具。它会应用 `_redirects`，比普通文件服务器更贴近实际部署。Windows 下构建会重装锁定依赖，先停止正在运行的 Slidev 开发服务，避免原生模块文件被占用。幻灯片素材和 PDF 导出说明见项目 README。

## Cloudflare Pages 导入

使用 GitHub 连接导入 `huizhiLLL/Slidev`，选择 **Pages**，填写：

| 设置 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | 留空，使用仓库根目录 |
| Build command | `npm run build` |
| Build output directory | `dist` |

根目录 `.node-version` 选择 Node.js 24，根 package-lock.json 与 LLCV/package-lock.json 均纳入版本管理。构建不需要密钥、Python、浏览器、远程字体服务或额外环境变量。即使构建环境采用 production 依赖策略，子项目也会显式安装构建所需 devDependencies。

首次构建成功后，在该 Pages 项目的 **Custom domains** 中添加 `slidev.huizhi.ink`，按 Cloudflare 提示完成域名绑定与 DNS。仓库发布不会自动创建 Pages 项目或绑定域名。

部署后的路径：

- `/`：单 HTML 集合导航。
- `/llcv`：跳转到 `/llcv/`，进入七页主体。
- `/llcv/5`：直接打开第五页，刷新仍可访问。
- `/llcv/presenter/1`：演讲者入口。
- `/llcv/appendix/`：独立备用资料。

`_redirects` 仅代理幻灯片页面路径，真实 assets、fonts、images 请求正常返回静态文件。200 重写目标使用带斜杠的目录入口，避免 Pages 对 index.html 的规范化跳转丢失页码。根目录 404.html 负责未知集合路径，避免整个站点错误回退到集合首页。不要添加 `/* /index.html 200` 或 `/llcv/* /llcv/index.html 200` 这种覆盖静态资源的规则。

首页缩略图通过 embedded 模式嵌入第一张幻灯片，关闭内部交互，并通过 thumbnail 参数关闭该预览的跨窗口同步，保持在封面。正常演示窗口仍可同步翻页。缩略图会随实际封面与照片更新；不需要独立截图或新增截图构建依赖。

## 目录与 Git 编排

采用一个根仓库，不为 LLCV 或未来子项目创建嵌套 Git 仓库。整个集合共享版本历史与忽略规则，移动或维护单套汇报仍保持清晰。

每套项目保留独立的 package.json、锁文件、slides.md、design.md、组件和 public 资源。根项目不安装公共前端框架，构建汇总脚本位于 scripts/build.mjs。暂不引入 workspace 或共享主题，等多个项目确有稳定共用部分时再抽取。

新增项目时建立独立目录，并同步：index.html 的入口卡片、scripts/build.mjs 的安装／带 base 构建／输出复制步骤、_redirects 的项目页面规则，以及上面的项目索引。每个公开项目前缀使用小写路径，源代码目录可以保留原名。

不要提交 node_modules、dist、导出 PDF、临时截图或缓存。真实素材、必要字体、研究来源和锁文件进入版本管理。原始研究文档当前保留在根目录。GitHub Actions 在 Linux 上检查完整构建和路由资源，不自动部署；Pages 的 Git 集成负责正式部署。
